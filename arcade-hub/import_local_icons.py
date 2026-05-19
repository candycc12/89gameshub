from urllib.request import urlopen
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = Path(__file__).resolve().parent / 'external-assets' / 'local-icons'
OUT_DIR.mkdir(parents=True, exist_ok=True)

def norm(s):
    return re.sub(r'[^a-z0-9]+', '', s.lower())

with urlopen('http://127.0.0.1:5503/gameinfos.js') as r:
    js = r.read().decode('utf-8', 'ignore')
info = json.loads(re.search(r'const games_infos =\s*(\{.*\})\s*$', js, re.S).group(1))
with open(Path(__file__).resolve().parent / 'games.json') as f:
    games = json.load(f)
with open(Path(__file__).resolve().parent / 'asset_overrides.json') as f:
    overrides = json.load(f)
our = {norm(g['title']): g for g in games}
matched = []
for item in info['gameList']:
    g = our.get(norm(item['gname']))
    if not g:
        continue
    icon_name = item['icon']
    target = OUT_DIR / icon_name
    if not target.exists():
        with urlopen(f'http://127.0.0.1:5503/assets/icons/game/{icon_name}') as r:
            target.write_bytes(r.read())
    overrides.setdefault(g['id'], {})['icon'] = target.relative_to(ROOT).as_posix()
    matched.append(g['id'])
(Path(__file__).resolve().parent / 'asset_overrides.json').write_text(json.dumps(overrides, ensure_ascii=False, indent=2), encoding='utf-8')
print('matched', len(matched))
print('sample', matched[:30])
