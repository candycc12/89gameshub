from __future__ import annotations
import json
import re
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(__file__).resolve().parent / 'games.json'
OVERRIDES = Path(__file__).resolve().parent / 'asset_overrides.json'
AUDIT_RESULTS = Path(__file__).resolve().parent / 'audit-results.json'
EXCLUDE = {'arcade-hub'}
ENTRY_NAMES = {'index.html': 0, 'game.html': 1, 'glgame.html': 2}
IMAGE_EXTS = {'.png', '.jpg', '.jpeg', '.webp'}

CATEGORY_RULES = [
    ('Action', ['attack', 'shooter', 'shoot', 'gun', 'war', 'battle', 'defense', 'defender', 'galaxy', 'frontline', 'monster', 'meteorite', 'alien', 'fire-up']),
    ('Sports', ['basket', 'football', 'soccer', 'golf', 'dunk', 'pool', 'sport', 'cup']),
    ('Racing', ['parking', 'car', 'drift', 'taxi', 'motox', 'subway', 'traffic', 'bus']),
    ('Puzzle', ['sort', 'puzzle', 'onet', 'connect', 'difference', 'mahjong', 'sudoku', 'word', 'tiles', 'block', 'merge', '2048', 'shapes', 'fill', 'slide', 'maze', 'match', 'jigsaw']),
    ('Arcade', ['flappy', 'knife', 'jump', 'swing', 'tunnel', 'vortex', 'tower', 'line', 'tap', 'fruit', 'bubble']),
]
BAD_BANNER_HINTS = ['atlas', 'sheet', 'sprite', 'shared-', '/ui', 'button', 'btn', 'font', 'particle', 'linepix', 'mask']


def prettify(name: str) -> str:
    name = re.sub(r'[-_]+', ' ', name)
    name = re.sub(r'\bmain\b$', '', name, flags=re.I).strip()
    words = []
    for part in name.split():
        part = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', part)
        words.extend(part.split())
    return ' '.join(part.capitalize() if not part.isupper() else part for part in words)


def category_for(name: str) -> str:
    split_camel = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', name)
    lowered = split_camel.lower()
    normalized = re.sub(r'[-_]+', ' ', lowered)
    tokens = set(re.findall(r'[a-z0-9]+', normalized))
    for category, words in CATEGORY_RULES:
        if any((' ' in word and word in normalized) or (word in tokens) for word in words):
            return category
    return 'Casual'


def entry_for(folder: Path):
    candidates = []
    for path in folder.rglob('*'):
        if path.is_file() and path.name.lower() in ENTRY_NAMES:
            rel = path.relative_to(ROOT)
            depth = len(rel.parts)
            candidates.append((depth, ENTRY_NAMES[path.name.lower()], len(str(rel)), rel))
    return min(candidates)[-1] if candidates else None


def image_size(path: Path):
    try:
        data = path.read_bytes()
        if data.startswith(b'\x89PNG\r\n\x1a\n'):
            return struct.unpack('>II', data[16:24])
        if data.startswith(b'\xff\xd8'):
            i = 2
            while i < len(data):
                while i < len(data) and data[i] != 0xFF:
                    i += 1
                while i < len(data) and data[i] == 0xFF:
                    i += 1
                if i >= len(data):
                    break
                marker = data[i]
                i += 1
                if marker in [0xD8, 0xD9]:
                    continue
                length = struct.unpack('>H', data[i:i+2])[0]
                if 0xC0 <= marker <= 0xC3:
                    h, w = struct.unpack('>HH', data[i+3:i+7])
                    return w, h
                i += length
    except Exception:
        return None
    return None


def banner_score(path: Path):
    low = path.as_posix().lower()
    dims = image_size(path)
    w, h = dims or (0, 0)
    ratio = (w / h) if w and h else 0
    priority = 50
    hints = [
        ('screenshots/', 0), ('screenshot', 0), ('banner', 1), ('cover', 2), ('poster', 3),
        ('thumbnail', 4), ('thumb', 5), ('preloadbg', 6), ('background', 7), ('splash', 8), ('bg_', 9)
    ]
    for hint, score in hints:
        if hint in low:
            priority = score
            break
    penalty = sum(15 for hint in BAD_BANNER_HINTS if hint in low)
    shape_penalty = 0 if 1.15 <= ratio <= 2.4 else 12
    area_bonus = -(w * h)
    return (priority + penalty + shape_penalty, area_bonus, len(low), low)


def icon_score(path: Path):
    low = path.as_posix().lower()
    dims = image_size(path)
    w, h = dims or (0, 0)
    ratio = (w / h) if w and h else 0
    priority = 60
    hints = [
        ('icon-512', 0), ('icon-256', 1), ('app-icon', 2), ('favicon', 3), ('icon-144', 4),
        ('icon-128', 5), ('icon-64', 6), ('loading-logo', 8), ('logo', 10), ('icon', 12)
    ]
    for hint, score in hints:
        if hint in low:
            priority = score
            break
    square_penalty = 0 if 0.8 <= ratio <= 1.25 else 20
    area_pref = abs((w * h) - (256 * 256)) if w and h else 999999999
    return (priority + square_penalty, area_pref, len(low), low)


def select_asset(folder: Path, kind: str):
    images = [p for p in folder.rglob('*') if p.is_file() and p.suffix.lower() in IMAGE_EXTS]
    if not images:
        return None
    scorer = banner_score if kind == 'banner' else icon_score
    best = min(images, key=scorer)
    score = scorer(best)
    if kind == 'icon' and score[0] >= 20:
        squareish = []
        for path in images:
            dims = image_size(path)
            if not dims:
                continue
            w, h = dims
            ratio = w / h if h else 0
            low = path.as_posix().lower()
            if 0.8 <= ratio <= 1.25 and not any(hint in low for hint in BAD_BANNER_HINTS):
                squareish.append((abs((w * h) - (256 * 256)), -w * h, path))
        if squareish:
            best = min(squareish)[-1]
        else:
            return None
    if kind == 'banner' and score[0] >= 35:
        scenic = []
        for path in images:
            dims = image_size(path)
            if not dims:
                continue
            w, h = dims
            ratio = w / h if h else 0
            low = path.as_posix().lower()
            if 1.15 <= ratio <= 2.6 and not any(hint in low for hint in BAD_BANNER_HINTS):
                scenic.append((-w * h, path))
        if scenic:
            best = min(scenic)[-1]
        else:
            return None
    return best.relative_to(ROOT)


def load_audit_statuses():
    if not AUDIT_RESULTS.exists():
        return {}
    return {item['id']: item.get('status') for item in json.loads(AUDIT_RESULTS.read_text(encoding='utf-8'))}


def load_overrides():
    if not OVERRIDES.exists():
        return {}
    return json.loads(OVERRIDES.read_text(encoding='utf-8'))


def detect_orientation(entry: Path) -> str:
    entry_path = ROOT / entry
    try:
        entry_text = entry_path.read_text(encoding='utf-8', errors='ignore')
    except Exception:
        entry_text = ''
    match = re.search(r'orientation\s*[:=]\s*[\"\'](portrait|landscape)[\"\']', entry_text, re.I)
    if match:
        return match.group(1).lower()
    values = set()
    root = entry_path.parent
    for pattern in ('*.html', '*.js', '*.json'):
        for path in root.rglob(pattern):
            try:
                text = path.read_text(encoding='utf-8', errors='ignore')
            except Exception:
                continue
            values.update(m.lower() for m in re.findall(r'orientation\s*[:=]\s*[\"\'](portrait|landscape)[\"\']', text, re.I))
    return next(iter(values)) if len(values) == 1 else 'auto'


def prefixed(path):
    return '../' + path.as_posix() if path else None


def main():
    overrides = load_overrides()
    audit_statuses = load_audit_statuses()
    games = []
    for folder in sorted(p for p in ROOT.iterdir() if p.is_dir() and p.name not in EXCLUDE):
        entry = entry_for(folder)
        if not entry:
            continue
        slug = folder.name
        banner = select_asset(folder, 'banner')
        icon = select_asset(folder, 'icon')
        override = overrides.get(slug, {})
        if override.get('banner'):
            banner = Path(override['banner'])
        if override.get('icon'):
            icon = Path(override['icon'])
        games.append({
            'id': slug,
            'title': prettify(slug),
            'category': category_for(slug),
            'entry': prefixed(entry),
            'banner': prefixed(banner),
            'icon': prefixed(icon),
            'orientation': override.get('orientation', detect_orientation(entry)),
            'playMode': override.get('playMode', 'iframe'),
            'auditStatus': audit_statuses.get(slug),
        })
    OUT.write_text(json.dumps(games, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Wrote {len(games)} games to {OUT}')


if __name__ == '__main__':
    main()
