const params = new URLSearchParams(location.search);
const aliases = { word: 'word-link', words: 'word-link', wordlink: 'word-link', blocks: 'block', star: 'hello-stars', stars: 'hello-stars', hello: 'hello-stars' };
const rawTheme = (params.get('theme') || params.get('utm_content') || 'word-link').toLowerCase().replace(/\s+/g, '-');
const themeKey = aliases[rawTheme] || rawTheme;
const themes = {
  'word-link': {
    eyebrow: 'Word puzzle games',
    title: 'Play Word Games',
    subtitle: 'Swipe letters and solve quick puzzles. No download needed.',
    matchTitle: 'Word games',
    matchCopy: 'Word Swipe is placed first, followed by connect-style puzzle games.',
    banner: 'external-assets/collections/word-swipe-banner.svg',
    heroId: 'word-swipe',
    ids: ['word-swipe', 'One_Connect-main', 'Onet_Link', 'onet-fruit-classic', 'happy-connect', 'Christmas_Connect', 'two-tiles', 'mahjong-classic'],
    description: 'Play free word, link, and connect puzzle games online. Start with Word Swipe, then try matching, tile-linking, and classic puzzle games with no download.'
  },
  block: {
    eyebrow: 'Block puzzle games',
    title: 'Play Block Games',
    subtitle: 'Drag blocks, clear rows, and chase a better score. Start instantly.',
    matchTitle: 'Block games',
    matchCopy: 'Blocky is placed first so block-game creatives land on a matching playable game.',
    banner: 'external-assets/collections/block-puzzle-banner.svg?v=2',
    heroId: 'Blocky',
    ids: ['Blocky', 'colored-bricks', '2048-cards', '2048-remastered', 'puzzle-color', 'Slices', 'SquArea', 'two-tiles'],
    description: 'Play free block puzzle games online. Start with Blocky, then explore colorful brick, 2048, tile, and casual puzzle games in your browser.'
  },
  'hello-stars': {
    eyebrow: 'Star puzzle games',
    title: 'Play Star Games',
    subtitle: 'Aim, tap, draw, and solve playful physics puzzles instantly.',
    matchTitle: 'Star games',
    matchCopy: 'Star Boom leads the page, followed by light physics and logic games.',
    banner: 'external-assets/collections/star-boom-banner.svg',
    heroId: 'Star_Boom',
    ids: ['Star_Boom', 'HappyGlass', 'Node', 'SquArea', 'DunkLine', 'basket-slide', 'puzzle-color', 'Release'],
    description: 'Play free star and physics puzzle games online. Start with Star Boom, then try draw, bounce, node, and logic games instantly in your browser.'
  }
};

const fallbackGames = [
  { id: 'word-swipe', title: 'Word Swipe', category: 'Puzzle', banner: '../arcade-hub/external-assets/collections/word-swipe-banner.svg', icon: '../word-swipe/icons/icon-256.png', auditStatus: '正常' },
  { id: 'One_Connect-main', title: 'One Connect', category: 'Puzzle', banner: '../One_Connect-main/html5games/images/logo.png', icon: '../One_Connect-main/icon.jpg', auditStatus: '正常' },
  { id: 'Onet_Link', title: 'Onet Link', category: 'Puzzle', banner: '../arcade-hub/external-assets/onet-link-banner.webp', icon: '../arcade-hub/external-assets/local-icons/Onet_Link.jpg', auditStatus: '需竖屏' },
  { id: 'onet-fruit-classic', title: 'Onet Fruit Classic', category: 'Puzzle', banner: '../arcade-hub/external-assets/onet-fruit-classic.png', icon: '../arcade-hub/external-assets/local-icons/onet-fruit-classic.jpg', auditStatus: '正常' },
  { id: 'happy-connect', title: 'Happy Connect', category: 'Puzzle', icon: '../arcade-hub/external-assets/local-icons/happy-connect.jpg', auditStatus: '正常' },
  { id: 'Christmas_Connect', title: 'Christmas Connect', category: 'Puzzle', icon: '../arcade-hub/external-assets/local-icons/Christmas_Connect.jpg', auditStatus: '正常' },
  { id: 'two-tiles', title: 'Two Tiles', category: 'Puzzle', banner: '../two-tiles/images/block-sheet0.png', icon: '../two-tiles/icons/icon-512.png', auditStatus: '正常' },
  { id: 'mahjong-classic', title: 'Mahjong Classic', category: 'Puzzle', icon: '../mahjong-classic/icons/icon-512.png', auditStatus: '正常' },
  { id: 'Blocky', title: 'Blocky', category: 'Casual', icon: '../Blocky/icon-256.png', auditStatus: '正常' },
  { id: 'colored-bricks', title: 'Colored Bricks', category: 'Casual', banner: '../colored-bricks/images/tiledbackground-sheet0.png', icon: '../colored-bricks/icons/icon-512.png', auditStatus: '正常' },
  { id: '2048-cards', title: '2048 Cards', category: 'Puzzle', icon: '../2048-cards/icons/icon-512.png', auditStatus: '正常' },
  { id: '2048-remastered', title: '2048 Remastered', category: 'Puzzle', icon: '../arcade-hub/external-assets/local-icons/2048-remastered.jpg', auditStatus: '正常' },
  { id: 'puzzle-color', title: 'Puzzle Color', category: 'Puzzle', banner: '../puzzle-color/images/tiledbackground-sheet0.png', icon: '../puzzle-color/icons/icon-256.png', auditStatus: '正常' },
  { id: 'Slices', title: 'Slices', category: 'Casual', icon: '../Slices/icon-256.png', auditStatus: '正常' },
  { id: 'SquArea', title: 'Squ Area', category: 'Casual', banner: '../SquArea/images/lfbackground-sheet0.png', icon: '../SquArea/icon-256.png', auditStatus: '正常' },
  { id: 'Star_Boom', title: 'Star Boom', category: 'Puzzle', banner: '../arcade-hub/external-assets/collections/star-boom-banner.svg', icon: '../arcade-hub/external-assets/collections/star-boom-icon.svg', auditStatus: '需竖屏' },
  { id: 'HappyGlass', title: 'Happy Glass', category: 'Casual', icon: '../HappyGlass/icon-256.png', auditStatus: '正常' },
  { id: 'Node', title: 'Node', category: 'Casual', banner: '../Node/images/homebackground-sheet0.png', icon: '../Node/icon-256.png', auditStatus: '正常' },
  { id: 'DunkLine', title: 'Dunk Line', category: 'Sports', icon: '../DunkLine/icons/icon-512.png', auditStatus: '正常' },
  { id: 'basket-slide', title: 'Basket Slide', category: 'Sports', banner: '../basket-slide/images/tiledbackground-sheet0.png', icon: '../basket-slide/icons/icon-512.png', auditStatus: '正常' },
  { id: 'Release', title: 'Release', category: 'Casual', banner: '../Release/images/target.png', icon: '../Release/icon-256.png', auditStatus: '正常' }
];

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
  if (first) return `Best match for this collection. Tap Play now to start.`;
  const byCategory = {
    Puzzle: 'Quick puzzle play in your browser.',
    Casual: 'Easy to start, light to play.',
    Arcade: 'Fast browser rounds with simple controls.',
    Action: 'More movement and challenge.',
    Sports: 'Simple timing and quick attempts.',
    Racing: 'Instant driving-style play.'
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
  if (document.querySelector('#campaign-match-title')) document.querySelector('#campaign-match-title').textContent = theme.matchTitle;
  if (document.querySelector('#campaign-match-copy')) document.querySelector('#campaign-match-copy').textContent = theme.matchCopy;
  document.querySelector('#collection-heading').textContent = 'Pick a game and play';
  document.querySelector('#collection-count').textContent = `${games.length} games`;
  document.querySelector('#campaign-banner').src = theme.banner || heroGame.banner || heroGame.icon || placeholder(heroGame);
  document.querySelector('#campaign-banner').alt = theme.title;
  document.querySelector('#campaign-feature').href = gameHref(heroGame);
  document.querySelector('#campaign-primary').href = gameHref(heroGame);
  document.querySelector('#campaign-primary').textContent = `Play ${heroGame.title}`;
  document.querySelector('#campaign-feature-title').textContent = heroGame.title;
  document.querySelector('#campaign-feature-desc').textContent = `Click to open the featured game.`;
  document.querySelectorAll('[data-theme-link]').forEach(link => link.classList.toggle('active', link.dataset.themeLink === themeKey));
  grid.replaceChildren(...games.map(card));
  if (window.ArcadeHubSEO) window.ArcadeHubSEO.update({
    title: theme.title,
    description: theme.description,
    image: theme.banner,
    canonical: location.href
  });
  if (window.ArcadeHubAnalytics) {
    window.ArcadeHubAnalytics.setContext({
      experiment_id: params.get('experiment_id') || params.get('exp') || params.get('utm_campaign') || `${themeKey}_collection`,
      landing_type: 'game_collection',
      landing_name: `${themeKey}_collection`,
      campaign_theme: themeKey,
      content_type: 'game_collection',
      content_id: heroGame.id,
      content_title: heroGame.title
    });
    window.ArcadeHubAnalytics.track('campaign_landing_view', { campaign_theme: themeKey, hero_game: heroGame.id });
    window.ArcadeHubAnalytics.track('content_view', { content_type: 'game_collection', content_id: heroGame.id, content_title: heroGame.title, campaign_theme: themeKey });
  }
}
function loadGames() {
  if (location.protocol === 'file:') return Promise.resolve(fallbackGames);
  return fetch('games.json').then(r => {
    if (!r.ok) throw new Error(`games.json ${r.status}`);
    return r.json();
  }).catch(() => fallbackGames);
}

loadGames().then(render).catch(() => render(fallbackGames));
