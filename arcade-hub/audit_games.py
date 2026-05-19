from __future__ import annotations
import json, math, os, struct, subprocess, zlib
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
HUB = Path(__file__).resolve().parent
GAMES = json.loads((HUB/'games.json').read_text())
OUTDIR = HUB/'audit-artifacts'
OUTDIR.mkdir(exist_ok=True)
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
BASE = 'http://127.0.0.1:4173/'

# Tiny PNG decoder for RGB/RGBA screenshots from Chrome.
def png_pixels(path: Path):
    data = path.read_bytes()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'
    pos = 8; raw=b''; w=h=ct=None
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos+4])[0]; pos += 4
        kind = data[pos:pos+4]; pos += 4
        payload = data[pos:pos+length]; pos += length + 4
        if kind == b'IHDR':
            w,h,depth,ct,_,_,_ = struct.unpack('>IIBBBBB', payload)
        elif kind == b'IDAT':
            raw += payload
        elif kind == b'IEND':
            break
    buf = zlib.decompress(raw)
    bpp = 4 if ct == 6 else 3
    stride = w*bpp
    rows=[]; i=0; prev=[0]*stride
    for _ in range(h):
        filt = buf[i]; i+=1
        row = list(buf[i:i+stride]); i += stride
        for x in range(stride):
            left = row[x-bpp] if x>=bpp else 0
            up = prev[x]
            ul = prev[x-bpp] if x>=bpp else 0
            if filt == 1: row[x] = (row[x] + left) & 255
            elif filt == 2: row[x] = (row[x] + up) & 255
            elif filt == 3: row[x] = (row[x] + ((left+up)//2)) & 255
            elif filt == 4:
                p = left + up - ul
                pa,pb,pc = abs(p-left),abs(p-up),abs(p-ul)
                pr = left if pa<=pb and pa<=pc else up if pb<=pc else ul
                row[x] = (row[x] + pr) & 255
        rows.append(row); prev=row
    # downsample
    vals=[]
    step_y=max(1,h//90); step_x=max(1,w//120)
    for y in range(0,h,step_y):
        row=rows[y]
        for x in range(0,w,step_x):
            off=x*bpp
            vals.append(tuple(row[off:off+3]))
    return w,h,vals

def metrics(path: Path):
    w,h,px=png_pixels(path)
    n=len(px)
    lum=[(r*299+g*587+b*114)//1000 for r,g,b in px]
    mean=sum(lum)/n
    dark=sum(v<18 for v in lum)/n
    bright=sum(v>235 for v in lum)/n
    colorful=sum(max(p)-min(p)>35 for p in px)/n
    uniq=len(set(px))
    return {'mean':round(mean,1),'dark':round(dark,3),'bright':round(bright,3),'colorful':round(colorful,3),'uniq':uniq}

def snap(url:str, path:Path, size:str):
    if path.exists():
        return metrics(path)
    cmd=[CHROME,'--headless=new','--disable-gpu',f'--window-size={size}','--virtual-time-budget=9000',f'--screenshot={path}',url]
    try:
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=30, check=True)
        return metrics(path)
    except Exception as e:
        return {'error':str(e)}

def is_blank(m):
    return 'error' in m or ((m.get('dark',0)>0.92 or m.get('bright',0)>0.92) and m.get('colorful',0)<0.03 and m.get('uniq',999999)<80)

def audit(game):
    gid=game['id']
    safe=quote(gid, safe='')
    direct_land=OUTDIR/f'{safe}__direct_land.png'
    direct_port=OUTDIR/f'{safe}__direct_port.png'
    play=OUTDIR/f'{safe}__frame.png'
    direct_url=BASE + game['entry'].replace('../','')
    play_url=BASE + f'arcade-hub/audit-frame.html?id={quote(gid)}'
    land=snap(direct_url, direct_land, '1280,720')
    port=snap(direct_url, direct_port, '430,900') if game.get('orientation')=='portrait' else None
    playm=snap(play_url, play, '1280,720')
    result={'id':gid,'orientation':game.get('orientation','auto'),'direct_land':land,'direct_port':port,'play':playm}
    direct_ok = not is_blank(port if game.get('orientation')=='portrait' and port else land)
    play_ok = not is_blank(playm)
    if not direct_ok and not play_ok:
        status='启动失败'
    elif game.get('orientation')=='portrait':
        status='需竖屏'
    elif direct_ok and not play_ok:
        status='需直开'
    else:
        status='正常'
    result['status']=status
    return result

if __name__=='__main__':
    results=[]
    with ThreadPoolExecutor(max_workers=4) as ex:
        futs=[ex.submit(audit,g) for g in GAMES]
        for i,f in enumerate(as_completed(futs),1):
            r=f.result(); results.append(r)
            print(f'[{i:03}/{len(GAMES)}] {r["id"]}: {r["status"]}')
    results=sorted(results,key=lambda x:x['id'].lower())
    (HUB/'audit-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
    from collections import Counter
    summary=Counter(r['status'] for r in results)
    print(summary)
