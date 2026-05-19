const params = new URLSearchParams(location.search);
const aliases = { word: 'word-link', words: 'word-link', wordlink: 'word-link', blocks: 'block', star: 'hello-stars', stars: 'hello-stars', hello: 'hello-stars' };
const rawTheme = (params.get('theme') || params.get('utm_content') || 'word-link').toLowerCase().replace(/\s+/g, '-');
const themeKey = aliases[rawTheme] || rawTheme;
const themes = {
  'word-link': {
    eyebrow: 'Word & link puzzle collection',
    title: 'Play word and link puzzle games online',
    subtitle: 'Swipe letters, connect matching tiles, and solve quick brain puzzles instantly in your browser.',
    matchTitle: 'Word video landing layout',
    matchCopy: 'Word Swipe is placed first, followed by connect-style puzzle games for the closest creative match.',
    banner: 'external-assets/collections/word-swipe-banner.svg',
    heroId: 'word-swipe',
    ids: ['word-swipe', 'One_Connect-main', 'Onet_Link', 'onet-fruit-classic', 'happy-connect', 'Christmas_Connect', 'two-tiles', 'mahjong-classic'],
    description: 'Play free word, link, and connect puzzle games online. Start with Word Swipe, then try matching, tile-linking, and classic puzzle games with no download.'
  },
  block: {
    eyebrow: 'Block puzzle collection',
    title: 'Play free block puzzle games online',
    subtitle: 'Drag blocks, clear boards, stack tiles, and enjoy simple puzzle challenges made for quick sessions.',
    matchTitle: 'Block video landing layout',
    matchCopy: 'Blocky is placed first so block-game creatives land on a matching playable experience.',
    banner: 'external-assets/collections/block-puzzle-banner.svg',
    heroId: 'Blocky',
    ids: ['Blocky', 'colored-bricks', '2048-cards', '2048-remastered', 'puzzle-color', 'Slices', 'SquArea', 'two-tiles'],
    description: 'Play free block puzzle games online. Start with Blocky, then explore colorful brick, 2048, tile, and casual puzzle games in your browser.'
  },
  'hello-stars': {
    eyebrow: 'Physics puzzle collection',
    title: 'Play star and physics puzzle games online',
    subtitle: 'Aim, tap, draw, bounce, and solve playful physics-style challenges with instant browser games.',
    matchTitle: 'Hello Stars-style landing layout',
    matchCopy: 'Star Boom leads the page, followed by physics and logic games that fit the same lightweight puzzle intent.',
    banner: 'external-assets/collections/star-boom-banner.svg',
    heroId: 'Star_Boom',
    ids: ['Star_Boom', 'HappyGlass', 'Node', 'SquArea', 'DunkLine', 'basket-slide', 'puzzle-color', 'Release'],
    description: 'Play free star and physics puzzle games online. Start with Star Boom, then try draw, bounce, node, and logic games instantly in your browser.'
  }
};
const theme = themes[themeKey] || themes['word-link'];
const grid = document.querySelector('#campaign-grid');
const template = document.querySelector('#campaign-card-template');

function placeholder(game) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#312e81"/><stop offset="1" stop-color="#0891b2"/></linearGradient></defs><rect width="640" height="400" fill="url(#g)"/><text x="50%" y="52%" fill="white" font-size="42" font-family="Arial" font-weight="700" text-anchor="middle">${game.title}</text></svg>`)} `;
}
function iconPlaceholder(game) {
  const initials = game.title.split(/\s+/).map(x => x[0]).join('').slice(0, 2).toUpperCase();
  return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#7c5cff"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><rect width="128" height="128" rx="28" fill="url(#g)"/><text x="50%" y="56%" fill="white" font-size="44" font-family="Arial" font-weight="700" text-anchor="middle">${initials}</text></svg>`)} `;
}
function gameHref(game) {
  const campaign = encodeURIComponent(themeKey);
  return `detail.html?id=${encodeURIComponent(game.id)}&lang=en&utm_source=google&utm_medium=demand_gen&utm_campaign=${campaign}`;
}
function gameDesc(game, first = false) {
  if (first) return `Start with ${game.title}. It opens directly in your browser and matches this collection's theme.`;
  const byCategory = {
    Puzzle: 'A quick puzzle pick for players who enjoy simple rules, satisfying progress, and short browser sessions.',
    Casual: 'A relaxed casual game that is easy to start and works well when you want something light and fast.',
    Arcade: 'An instant arcade-style game with quick action, simple controls, and replay-friendly rounds.',
    Action: 'A fast browser game for players who want more movement and challenge.',
    Sports: 'A quick sports-style browser game with simple timing and satisfying attempts.',
    Racing: 'A lightweight racing or driving game for instant browser play.'
  };
  return byCategory[game.category] || 'A free instant-play browser game from Arcade Hub.';
}
function card(game, index) {
  const node = template.content.cloneNode(true);
  const link = node.querySelector('.campaign-card-link');
  const img = node.querySelector('.campaign-card-art img');
  const icon = node.querySelector('.game-icon');
  link.href = gameHref(game);
  img.src = game.banner || game.icon || placeholder(game);
  img.onerror = () => img.src = placeholder(game);
  img.alt = `${game.title} screenshot`;
  icon.src = game.icon || iconPlaceholder(game);
  icon.onerror = () => icon.src = iconPlaceholder(game);
  icon.alt = `${game.title} icon`;
  node.querySelector('h3').textContent = game.title;
  node.querySelector('p').textContent = gameDesc(game, index === 0);
  if (index === 0) node.querySelector('.campaign-card').classList.add('lead-card');
  return node;
}
function orderedGames(all) {
  const byId = new Map(all.filter(g => g.auditStatus !== '启动失败').map(g => [g.id, g]));
  const selected = theme.ids.map(id => byId.get(id)).filter(Boolean);
  const seen = new Set(selected.map(g => g.id));
  const fill = all.filter(g => g.auditStatus !== '启动失败' && !seen.has(g.id) && ['Puzzle', 'Casual', 'Arcade'].includes(g.category)).slice(0, 8 - selected.length);
  return [...selected, ...fill].slice(0, 12);
}
function render(all) {
  const games = orderedGames(all);
  const heroGame = games.find(g => g.id === theme.heroId) || games[0];
  document.documentElement.lang = 'en';
  document.querySelector('#campaign-eyebrow').textContent = theme.eyebrow;
  document.querySelector('#campaign-title').textContent = theme.title;
  document.querySelector('#campaign-subtitle').textContent = theme.subtitle;
  document.querySelector('#campaign-match-title').textContent = theme.matchTitle;
  document.querySelector('#campaign-match-copy').textContent = theme.matchCopy;
  document.querySelector('#collection-heading').textContent = 'Recommended games';
  document.querySelector('#collection-count').textContent = `${games.length} instant games`;
  document.querySelector('#campaign-banner').src = theme.banner || heroGame.banner || heroGame.icon || placeholder(heroGame);
  document.querySelector('#campaign-banner').alt = theme.title;
  document.querySelector('#campaign-feature').href = gameHref(heroGame);
  document.querySelector('#campaign-primary').href = gameHref(heroGame);
  document.querySelector('#campaign-feature-title').textContent = heroGame.title;
  document.querySelector('#campaign-feature-desc').textContent = `Featured first for this ${theme.eyebrow.toLowerCase()}.`;
  document.querySelectorAll('[data-theme-link]').forEach(link => link.classList.toggle('active', link.dataset.themeLink === themeKey));
  grid.replaceChildren(...games.map(card));
  if (window.ArcadeHubSEO) window.ArcadeHubSEO.update({
    title: theme.title,
    description: theme.description,
    image: theme.banner,
    canonical: location.href
  });
  if (window.ArcadeHubAnalytics) window.ArcadeHubAnalytics.track('campaign_landing_view', { campaign_theme: themeKey, hero_game: heroGame.id });
}
fetch('games.json').then(r => r.json()).then(render);
