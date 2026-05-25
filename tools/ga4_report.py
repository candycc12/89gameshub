#!/usr/bin/env python3
import argparse
import datetime as dt
import json
import os
import sys
import time
import base64
import hashlib
import secrets
import subprocess
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

CONFIG_DIR = Path(os.environ.get('GAMESHUB_CONFIG_DIR', '/Users/chen/.config/89gameshub'))
OAUTH_CLIENT = CONFIG_DIR / 'oauth-client.json'
TOKEN_FILE = CONFIG_DIR / 'ga4-token.json'
DEFAULT_PROPERTY_ID = os.environ.get('GA4_PROPERTY_ID', '538538584')
SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
TOKEN_URL = 'https://oauth2.googleapis.com/token'
DEVICE_CODE_URL = 'https://oauth2.googleapis.com/device/code'
API_ROOT = 'https://analyticsdata.googleapis.com/v1beta'

KEY_EVENTS = [
    'campaign_landing_view',
    'game_link_click',
    'game_play_page_view',
    'game_start',
    'ad_impression',
    'ad_click',
    'warinc_ad_impression',
    'warinc_ad_click',
    'page_time',
    'site_session_time',
]


def load_client():
    if not OAUTH_CLIENT.exists():
        raise SystemExit(f'Missing OAuth client file: {OAUTH_CLIENT}')
    data = json.loads(OAUTH_CLIENT.read_text())
    cfg = data.get('installed') or data.get('web') or data
    return cfg['client_id'], cfg['client_secret']


def load_token():
    if not TOKEN_FILE.exists():
        return None
    return json.loads(TOKEN_FILE.read_text())


def save_token(token):
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    TOKEN_FILE.write_text(json.dumps(token, indent=2, ensure_ascii=False))
    os.chmod(TOKEN_FILE, 0o600)


def post_form(url, form):
    body = urllib.parse.urlencode(form).encode()
    req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/x-www-form-urlencoded'})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except Exception as urllib_error:
        # Some macOS CommandLineTools Python builds fail TLS handshakes with Google endpoints.
        # Fall back to curl, which uses the system/network stack more reliably on this machine.
        cmd = ['curl', '-fsS', '-X', 'POST', url, '-H', 'Content-Type: application/x-www-form-urlencoded', '--data', urllib.parse.urlencode(form)]
        try:
            res = subprocess.run(cmd, check=True, capture_output=True, text=True, timeout=45)
            return json.loads(res.stdout)
        except Exception as curl_error:
            raise RuntimeError(f'Token request failed via urllib ({urllib_error}) and curl ({curl_error})')


def auth_flow(open_browser=False):
    client_id, client_secret = load_client()
    code_holder = {}

    class Handler(BaseHTTPRequestHandler):
        def log_message(self, fmt, *args):
            return
        def do_GET(self):
            parsed = urllib.parse.urlparse(self.path)
            qs = urllib.parse.parse_qs(parsed.query)
            if 'code' in qs:
                code_holder['code'] = qs['code'][0]
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.end_headers()
                self.wfile.write('授权完成，可以回到 Codex。Authorization complete. You can close this tab.'.encode('utf-8'))
            else:
                code_holder['error'] = qs
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'Authorization failed.')

    server = HTTPServer(('localhost', 0), Handler)
    redirect_uri = f'http://localhost:{server.server_port}/'
    code_verifier = base64.urlsafe_b64encode(secrets.token_bytes(48)).decode().rstrip('=')
    code_challenge = base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode()).digest()).decode().rstrip('=')
    params = {
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'response_type': 'code',
        'scope': ' '.join(SCOPES),
        'access_type': 'offline',
        'prompt': 'consent',
        'code_challenge': code_challenge,
        'code_challenge_method': 'S256',
    }
    url = AUTH_URL + '?' + urllib.parse.urlencode(params)
    print('\n请在浏览器打开这个授权链接 / Open this authorization URL:\n')
    print(url)
    print('\n等待授权回调中...')
    sys.stdout.flush()
    if open_browser:
        import webbrowser
        webbrowser.open(url)
    deadline = time.time() + 300
    while time.time() < deadline and 'code' not in code_holder and 'error' not in code_holder:
        server.handle_request()
    if 'code' not in code_holder:
        raise SystemExit(f'OAuth authorization failed or timed out: {code_holder.get("error")}')
    token = post_form(TOKEN_URL, {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code_holder['code'],
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code_verifier': code_verifier,
    })
    token['created_at'] = int(time.time())
    save_token(token)
    print(f'\n授权成功，token 已保存：{TOKEN_FILE}')


def get_access_token():
    client_id, client_secret = load_client()
    token = load_token()
    if not token:
        raise SystemExit('No token found. Run: python3 tools/ga4_report.py auth')
    expires_at = token.get('created_at', 0) + token.get('expires_in', 0) - 120
    if token.get('access_token') and time.time() < expires_at:
        return token['access_token']
    if not token.get('refresh_token'):
        raise SystemExit('Token has no refresh_token. Run auth again.')
    refreshed = post_form(TOKEN_URL, {
        'client_id': client_id,
        'client_secret': client_secret,
        'refresh_token': token['refresh_token'],
        'grant_type': 'refresh_token',
    })
    token.update(refreshed)
    token['created_at'] = int(time.time())
    save_token(token)
    return token['access_token']


def api_post(path, payload):
    access_token = get_access_token()
    req = urllib.request.Request(
        API_ROOT + path,
        data=json.dumps(payload).encode(),
        headers={'Authorization': f'Bearer {access_token}', 'Content-Type': 'application/json'},
    )
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors='replace')
        raise RuntimeError(f'GA4 API error {e.code}: {body}')


def property_tz_now():
    # GA4 property is configured as China time. Keep script explicit.
    return dt.datetime.now(dt.timezone(dt.timedelta(hours=8)))


def recent_window(hours):
    now = property_tz_now()
    start = now - dt.timedelta(hours=hours)
    return start, now


def parse_date_hour_minute(value):
    # GA4 dateHourMinute format: YYYYMMDDHHMM
    try:
        return dt.datetime.strptime(value, '%Y%m%d%H%M').replace(tzinfo=dt.timezone(dt.timedelta(hours=8)))
    except Exception:
        return None


def rows_from_response(resp):
    dims = [h['name'] for h in resp.get('dimensionHeaders', [])]
    mets = [h['name'] for h in resp.get('metricHeaders', [])]
    out = []
    for row in resp.get('rows', []):
        d = {name: row['dimensionValues'][i].get('value', '') for i, name in enumerate(dims)}
        m = {name: float(row['metricValues'][i].get('value', '0') or 0) for i, name in enumerate(mets)}
        out.append({**d, **m})
    return out


def run_report(property_id, dimensions, metrics, start_date, end_date, limit=100000, dimension_filter=None):
    payload = {
        'dateRanges': [{'startDate': start_date, 'endDate': end_date}],
        'dimensions': [{'name': x} for x in dimensions],
        'metrics': [{'name': x} for x in metrics],
        'limit': str(limit),
    }
    if dimension_filter:
        payload['dimensionFilter'] = dimension_filter
    return rows_from_response(api_post(f'/properties/{property_id}:runReport', payload))


def safe_report(*args, **kwargs):
    try:
        return run_report(*args, **kwargs), None
    except Exception as e:
        return [], str(e)


def ratio(num, den):
    return 0 if den <= 0 else num / den


def fmt_pct(x):
    return f'{x * 100:.1f}%'


def fmt_int(x):
    return str(int(round(x)))


def fmt_sec(x):
    if x is None:
        return 'N/A'
    return f'{x:.1f}s'


def report(property_id=DEFAULT_PROPERTY_ID, hours=2, output_json=False, date=None):
    if date:
        day = dt.datetime.strptime(date, '%Y-%m-%d').replace(tzinfo=dt.timezone(dt.timedelta(hours=8)))
        start = day
        now = day + dt.timedelta(days=1) - dt.timedelta(minutes=1)
    else:
        start, now = recent_window(hours)
    start_date = start.strftime('%Y-%m-%d')
    end_date = now.strftime('%Y-%m-%d')
    start_key = start.strftime('%Y%m%d%H%M')

    # Event counts in the last N hours using dateHourMinute and local filtering.
    rows, err = safe_report(property_id, ['eventName', 'dateHourMinute'], ['eventCount', 'activeUsers'], start_date, end_date)
    recent = []
    for r in rows:
        t = parse_date_hour_minute(r.get('dateHourMinute', ''))
        if t and start <= t <= now:
            recent.append(r)

    event_counts = {}
    event_users = {}
    for r in recent:
        name = r.get('eventName', '')
        event_counts[name] = event_counts.get(name, 0) + r.get('eventCount', 0)
        event_users[name] = event_users.get(name, 0) + r.get('activeUsers', 0)

    # Traffic sources: query campaign/source/medium for sessions where possible.
    traffic_rows, traffic_err = safe_report(
        property_id,
        ['sessionSource', 'sessionMedium', 'sessionCampaignName', 'dateHourMinute'],
        ['activeUsers', 'sessions', 'eventCount'],
        start_date,
        end_date,
        limit=10000,
    )
    traffic = []
    for r in traffic_rows:
        t = parse_date_hour_minute(r.get('dateHourMinute', ''))
        if t and start <= t <= now:
            key = (r.get('sessionSource', ''), r.get('sessionMedium', ''), r.get('sessionCampaignName', ''))
            traffic.append((key, r))
    traffic_totals = {}
    for key, r in traffic:
        cur = traffic_totals.setdefault(key, {'activeUsers': 0, 'sessions': 0, 'eventCount': 0})
        cur['activeUsers'] += r.get('activeUsers', 0)
        cur['sessions'] += r.get('sessions', 0)
        cur['eventCount'] += r.get('eventCount', 0)
    top_traffic = sorted(traffic_totals.items(), key=lambda kv: (kv[1].get('sessions', 0), kv[1].get('activeUsers', 0)), reverse=True)[:5]

    # Time custom metrics. They only work after registering custom metrics in GA4.
    page_time_avg = None
    site_time_avg = None
    time_errors = []
    page_rows, page_err = safe_report(
        property_id,
        ['eventName', 'dateHourMinute'],
        ['eventCount', 'customEvent:page_time_sec'],
        start_date,
        end_date,
        dimension_filter={'filter': {'fieldName': 'eventName', 'stringFilter': {'matchType': 'EXACT', 'value': 'page_time'}}},
    )
    if page_err:
        time_errors.append('page_time_sec unavailable: ' + page_err[:180])
    else:
        total, cnt = 0, 0
        for r in page_rows:
            t = parse_date_hour_minute(r.get('dateHourMinute', ''))
            if t and start <= t <= now:
                cnt += r.get('eventCount', 0)
                total += r.get('customEvent:page_time_sec', 0)
        if cnt:
            page_time_avg = total / cnt

    site_rows, site_err = safe_report(
        property_id,
        ['eventName', 'dateHourMinute'],
        ['eventCount', 'customEvent:site_session_time_sec'],
        start_date,
        end_date,
        dimension_filter={'filter': {'fieldName': 'eventName', 'stringFilter': {'matchType': 'EXACT', 'value': 'site_session_time'}}},
    )
    if site_err:
        time_errors.append('site_session_time_sec unavailable: ' + site_err[:180])
    else:
        total, cnt = 0, 0
        for r in site_rows:
            t = parse_date_hour_minute(r.get('dateHourMinute', ''))
            if t and start <= t <= now:
                cnt += r.get('eventCount', 0)
                total += r.get('customEvent:site_session_time_sec', 0)
        if cnt:
            site_time_avg = total / cnt

    landing = event_counts.get('campaign_landing_view', 0)
    game_link = event_counts.get('game_link_click', 0)
    play_view = event_counts.get('game_play_page_view', 0)
    game_start = event_counts.get('game_start', 0)
    # New unified ad events use ad_impression/ad_click + params such as ad_type/ad_campaign/ad_slot.
    # Keep legacy fallbacks for dates before the event-name migration.
    ad_imp = event_counts.get('ad_impression', 0) or event_counts.get('warinc_ad_impression', 0)
    ad_click = event_counts.get('ad_click', 0) or event_counts.get('warinc_ad_click', 0)

    result = {
        'property_id': property_id,
        'range': {'hours': hours, 'date': date, 'start': start.isoformat(), 'end': now.isoformat(), 'note': 'GA4 standard reports may have processing delay.'},
        'events': {k: int(event_counts.get(k, 0)) for k in KEY_EVENTS},
        'traffic_top': [
            {'source': k[0], 'medium': k[1], 'campaign': k[2], **{m: int(v[m]) for m in v}}
            for k, v in top_traffic
        ],
        'rates': {
            'game_link_click_per_landing': ratio(game_link, landing),
            'game_start_per_landing': ratio(game_start, landing),
            'ad_click_per_landing': ratio(ad_click, landing),
            'ad_ctr': ratio(ad_click, ad_imp),
        },
        'time': {'avg_page_time_sec': page_time_avg, 'avg_site_session_time_sec': site_time_avg, 'errors': time_errors},
        'errors': {'events': err, 'traffic': traffic_err},
    }

    if output_json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return

    lines = []
    lines.append('89GamesHub 投放数据报告')
    
    if date:
        lines.append(f'时间范围：{date} 全天（中国时间）')
    else:
        lines.append(f'时间范围：最近 {hours} 小时（{start.strftime("%Y-%m-%d %H:%M")} – {now.strftime("%Y-%m-%d %H:%M")}，中国时间）')
    lines.append('')
    lines.append('1. 流量概况')
    if top_traffic:
        for item in result['traffic_top']:
            lines.append(f"- {item['source']} / {item['medium']} / {item['campaign']}：sessions {item['sessions']}，active users {item['activeUsers']}")
    else:
        lines.append('- 暂无可用来源数据，或 GA4 数据仍在延迟处理中。')
    lines.append('')
    lines.append('2. 转化漏斗')
    lines.append(f'- campaign_landing_view：{fmt_int(landing)}')
    lines.append(f'- game_link_click：{fmt_int(game_link)}（{fmt_pct(ratio(game_link, landing))} / landing）')
    lines.append(f'- game_play_page_view：{fmt_int(play_view)}')
    lines.append(f'- game_start：{fmt_int(game_start)}（{fmt_pct(ratio(game_start, landing))} / landing）')
    lines.append(f'- ad_click：{fmt_int(ad_click)}（{fmt_pct(ratio(ad_click, landing))} / landing）')
    lines.append('')
    lines.append('3. 广告表现')
    lines.append(f'- ad_impression：{fmt_int(ad_imp)}')
    lines.append(f'- ad_click：{fmt_int(ad_click)}')
    lines.append(f'- Ad CTR：{fmt_pct(ratio(ad_click, ad_imp))}')
    lines.append('')
    lines.append('4. 停留时间')
    lines.append(f'- 平均单页停留：{fmt_sec(page_time_avg)}')
    lines.append(f'- 平均整站停留：{fmt_sec(site_time_avg)}')
    if time_errors:
        lines.append('- 注意：停留时间自定义指标暂不可用；需要在 GA4 注册 page_time_sec / site_session_time_sec 为自定义指标后才能稳定计算平均值。')
    lines.append('')
    lines.append('5. 判断')
    if landing == 0 and sum(event_counts.values()) == 0:
        lines.append('- 最近窗口内暂无可判断数据，可能是无流量或 GA4 报表延迟。')
    elif game_start == 0 and landing > 0:
        lines.append('- 有落地页访问但没有游戏开始，优先检查 CTA、首屏、游戏入口。')
    elif ad_click == 0 and game_start > 0:
        lines.append('- 用户能开始游戏，但广告跳转为 0，优先优化广告位位置、文案或触发时机。')
    elif ad_imp > 0:
        lines.append(f'- 链路可观测。广告 CTR 当前为 {fmt_pct(ratio(ad_click, ad_imp))}，继续观察投放质量和广告位点击。')
    else:
        lines.append('- 数据部分可观测，继续积累样本后再判断。')
    if result['errors']['events'] or result['errors']['traffic']:
        lines.append('')
        lines.append('调试信息：')
        if result['errors']['events']:
            lines.append('- events query error: ' + result['errors']['events'][:200])
        if result['errors']['traffic']:
            lines.append('- traffic query error: ' + result['errors']['traffic'][:200])
    print('\n'.join(lines))



def auth_manual_flow():
    client_id, client_secret = load_client()
    redirect_uri = 'http://localhost'
    code_verifier = base64.urlsafe_b64encode(secrets.token_bytes(48)).decode().rstrip('=')
    code_challenge = base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode()).digest()).decode().rstrip('=')
    params = {
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'response_type': 'code',
        'scope': ' '.join(SCOPES),
        'access_type': 'offline',
        'prompt': 'consent',
        'code_challenge': code_challenge,
        'code_challenge_method': 'S256',
    }
    url = AUTH_URL + '?' + urllib.parse.urlencode(params)
    print('\n请完整复制下面这个链接到 Chrome 地址栏打开：\n')
    print(url)
    print('\n授权后可能会跳到 localhost 并显示无法访问，这是正常的。')
    print('请复制浏览器地址栏里 code= 后面的内容，或直接复制整个 localhost URL 粘贴回来。\n')
    pasted = input('Paste code or full redirected URL here: ').strip()
    code = pasted
    if 'code=' in pasted:
        parsed = urllib.parse.urlparse(pasted)
        qs = urllib.parse.parse_qs(parsed.query)
        code = qs.get('code', [''])[0]
    if not code:
        raise SystemExit('No authorization code provided.')
    token = post_form(TOKEN_URL, {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code_verifier': code_verifier,
    })
    token['created_at'] = int(time.time())
    save_token(token)
    print(f'\n授权成功，token 已保存：{TOKEN_FILE}')


def auth_device_flow():
    client_id, client_secret = load_client()
    device = post_form(DEVICE_CODE_URL, {
        'client_id': client_id,
        'scope': ' '.join(SCOPES),
    })
    print('\n请打开这个页面 / Open this page:')
    print(device.get('verification_url') or device.get('verification_uri'))
    print('\n输入这个授权码 / Enter this code:')
    print(device['user_code'])
    print('\n授权后请回到这里等待，脚本会自动完成 token 获取。')
    interval = int(device.get('interval', 5))
    deadline = time.time() + int(device.get('expires_in', 900))
    while time.time() < deadline:
        time.sleep(interval)
        try:
            token = post_form(TOKEN_URL, {
                'client_id': client_id,
                'client_secret': client_secret,
                'device_code': device['device_code'],
                'grant_type': 'urn:ietf:params:oauth:grant-type:device_code',
            })
            token['created_at'] = int(time.time())
            save_token(token)
            print(f'\n授权成功，token 已保存：{TOKEN_FILE}')
            return
        except RuntimeError as e:
            text = str(e)
            if 'authorization_pending' in text or 'HTTP Error 428' in text or 'HTTP Error 400' in text:
                print('.', end='', flush=True)
                continue
            if 'slow_down' in text:
                interval += 5
                continue
            raise
    raise SystemExit('Device authorization timed out. Please run auth-device again.')


def auth_plain_flow():
    client_id, client_secret = load_client()
    redirect_uri = 'http://localhost'
    params = {
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'response_type': 'code',
        'scope': ' '.join(SCOPES),
        'access_type': 'offline',
        'prompt': 'consent',
    }
    url = AUTH_URL + '?' + urllib.parse.urlencode(params)
    print('\n请完整复制下面这个链接到 Chrome 地址栏打开：\n')
    print(url)
    print('\n授权后跳到 localhost 无法访问是正常的。复制完整 localhost URL 粘贴回来。\n')
    pasted = input('Paste code or full redirected URL here: ').strip()
    code = pasted
    if 'code=' in pasted:
        parsed = urllib.parse.urlparse(pasted)
        qs = urllib.parse.parse_qs(parsed.query)
        code = qs.get('code', [''])[0]
    if not code:
        raise SystemExit('No authorization code provided.')
    token = post_form(TOKEN_URL, {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
    })
    token['created_at'] = int(time.time())
    save_token(token)
    print(f'\n授权成功，token 已保存：{TOKEN_FILE}')

def main():
    ap = argparse.ArgumentParser(description='89GamesHub GA4 report helper')
    sub = ap.add_subparsers(dest='cmd')
    auth = sub.add_parser('auth')
    auth.add_argument('--open-browser', action='store_true')
    sub.add_parser('auth-manual')
    sub.add_parser('auth-device')
    sub.add_parser('auth-plain')
    rep = sub.add_parser('report')
    rep.add_argument('--property-id', default=DEFAULT_PROPERTY_ID)
    rep.add_argument('--hours', type=float, default=2)
    rep.add_argument('--date', help='Report a full day in YYYY-MM-DD, China time')
    rep.add_argument('--json', action='store_true')
    args = ap.parse_args()
    if args.cmd == 'auth':
        auth_flow(open_browser=args.open_browser)
    elif args.cmd == 'auth-manual':
        auth_manual_flow()
    elif args.cmd == 'auth-device':
        auth_device_flow()
    elif args.cmd == 'auth-plain':
        auth_plain_flow()
    elif args.cmd == 'report':
        report(args.property_id, args.hours, args.json, args.date)
    else:
        ap.print_help()
        raise SystemExit(2)

if __name__ == '__main__':
    main()
