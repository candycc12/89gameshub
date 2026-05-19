#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
errors = []
warnings = []

def exists(path):
    return (ROOT / path).exists()

required = [
    "index.html",
    "robots.txt",
    "sitemap.xml",
    "arcade-hub/index.html",
    "arcade-hub/app.js",
    "arcade-hub/styles.css",
    "arcade-hub/detail.html",
    "arcade-hub/detail.js",
    "arcade-hub/play.html",
    "arcade-hub/play.js",
    "arcade-hub/games.json",
    "arcade-hub/about.html",
    "arcade-hub/contact.html",
    "arcade-hub/privacy.html",
    "arcade-hub/terms.html",
    "arcade-hub/dmca.html",
    "arcade-hub/advertising.html",
]
for p in required:
    if not exists(p):
        errors.append(f"Missing required deploy file: {p}")

catalog_path = ROOT / "arcade-hub" / "games.json"
if catalog_path.exists():
    games = json.loads(catalog_path.read_text(encoding="utf-8"))
    playable = 0
    failed = []
    missing_assets = []
    missing_entries = []
    for g in games:
        if g.get("auditStatus") == "启动失败":
            failed.append(g["id"])
            continue
        playable += 1
        entry = g.get("entry")
        if entry and not urlparse(entry).scheme:
            p = (ROOT / "arcade-hub" / entry).resolve()
            if not p.exists():
                missing_entries.append((g["id"], entry))
        for key in ("banner", "icon"):
            asset = g.get(key)
            if asset and not urlparse(asset).scheme:
                p = (ROOT / "arcade-hub" / asset).resolve()
                if not p.exists():
                    missing_assets.append((g["id"], key, asset))
    if playable < 20:
        errors.append(f"Playable game count seems too low: {playable}")
    if failed:
        warnings.append(f"Games excluded by auditStatus=启动失败: {', '.join(failed[:10])}{'…' if len(failed)>10 else ''}")
    if missing_entries:
        errors.append(f"Missing game entry files: {len(missing_entries)} example={missing_entries[:3]}")
    if missing_assets:
        warnings.append(f"Missing image assets: {len(missing_assets)} example={missing_assets[:5]}")

robots = ROOT / "robots.txt"
if robots.exists() and "YOUR_DOMAIN_HERE" in robots.read_text(encoding="utf-8"):
    warnings.append("robots.txt still contains YOUR_DOMAIN_HERE. Set SITE_URL and regenerate sitemap before final launch.")

sitemap = ROOT / "sitemap.xml"
if sitemap.exists() and "YOUR_DOMAIN_HERE" in sitemap.read_text(encoding="utf-8"):
    warnings.append("sitemap.xml still contains YOUR_DOMAIN_HERE. Run: SITE_URL=https://your-domain.com npm run sitemap")

for page in ("contact.html", "privacy.html", "dmca.html", "advertising.html"):
    path = ROOT / "arcade-hub" / page
    if path.exists() and "contact@YOUR_DOMAIN_HERE" in path.read_text(encoding="utf-8"):
        warnings.append(f"{page} still contains contact@YOUR_DOMAIN_HERE. Replace it with a real business email before final launch.")

print("Arcade Hub deploy check")
print("=======================")
for w in warnings:
    print(f"WARN  {w}")
for e in errors:
    print(f"ERROR {e}")
if not errors:
    print("OK    Required deploy files and game entries look deployable.")
    sys.exit(0)
sys.exit(1)
