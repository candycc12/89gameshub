const grid = document.querySelector('#grid');
const trending = document.querySelector('#trending');
const quickPlay = document.querySelector('#quick-play');
const heroStage = document.querySelector('#hero-stage');
const categoryPanels = document.querySelector('#category-panels');
const filters = document.querySelector('#filters');
const sideNav = document.querySelector('#side-nav');
const search = document.querySelector('#search');
const count = document.querySelector('#count');
const cardTemplate = document.querySelector('#card-template');
const heroTemplate = document.querySelector('#hero-template');
const langToggle = document.querySelector('#lang-toggle');
const sidebarToggle = document.querySelector('#sidebar-toggle');
const sidebarScrim = document.querySelector('#sidebar-scrim');
let games = [];
let activeCategory = 'All';
let lang = localStorage.getItem('arcadeLang') || 'zh';
let searchTrackTimer;

const heroSeeds = ['ballsortpuzzle', '2048', 'onet'];
const trendingSeeds = ['subway', 'basket', 'sort', 'parking', 'merge', 'tower', 'bubble', 'word'];
const quickSeeds = ['onet', 'fruit', 'knife', 'dunk', 'bubble', 'tiles', 'puzzle'];
const categoryOrder = ['Action', 'Puzzle', 'Racing', 'Sports', 'Arcade', 'Casual'];
const i18n = {
  zh: {
    all: '首页', browseAll: '浏览全部', search: '搜索游戏、类型或关键词…', readyGames: '首页游戏', games: '款', searchResults: '搜索结果',
    trending: '热门推荐', playableNow: '现在就能玩', quickPlay: '快速开玩', easyStart: '轻松上手', allGames: '首页精选',
    featured: '精选游戏', clickToPlay: '点击即可开始游戏', playNow: '立即开始', startGame: '开始游戏', play: '玩',
    sidebarNote: '点击任意游戏即可开始', categoryNote: '完整目录在分类中', categories: { Action:'动作', Puzzle:'益智', Racing:'竞速', Sports:'体育', Arcade:'街机', Casual:'休闲' }
  },
  en: {
    all: 'Home', browseAll: 'Browse all', search: 'Search games, genres, or keywords…', readyGames: 'Homepage games', games: 'games', searchResults: 'Search results',
    trending: 'Trending', playableNow: 'Play now', quickPlay: 'Quick play', easyStart: 'Easy to start', allGames: 'Homepage picks',
    featured: 'Featured', clickToPlay: 'Click to start', playNow: 'Play now', startGame: 'Play', play: 'Play',
    sidebarNote: 'Click any game to start', categoryNote: 'Full catalog lives in categories', categories: { Action:'Action', Puzzle:'Puzzle', Racing:'Racing', Sports:'Sports', Arcade:'Arcade', Casual:'Casual' }
  }
};
function t(key) { return i18n[lang][key]; }
function categoryLabel(cat) { return cat === 'All' ? t('all') : i18n[lang].categories[cat]; }
function homepageReady(game) { return game.auditStatus !== '启动失败' && Boolean(game.banner || game.icon); }
function placeholder(game) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400">
      <defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#312e81"/><stop offset="1" stop-color="#0891b2"/></linearGradient></defs>
      <rect width="640" height="400" fill="url(#g)"/>
      <text x="50%" y="52%" fill="white" font-size="42" font-family="Arial" font-weight="700" text-anchor="middle">${game.title}</text>
    </svg>`)} `;
}
function iconPlaceholder(game) {
  const initials = game.title.split(/\s+/).map(x => x[0]).join('').slice(0, 2).toUpperCase();
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#7c5cff"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs>
      <rect width="128" height="128" rx="28" fill="url(#g)"/>
      <text x="50%" y="56%" fill="white" font-size="44" font-family="Arial" font-weight="700" text-anchor="middle">${initials}</text>
    </svg>`)} `;
}
function gameHref(game) { return `detail.html?id=${encodeURIComponent(game.id)}&lang=${lang}`; }
function uniqueById(list) { return [...new Map(list.filter(Boolean).map(item => [item.id, item])).values()]; }
function findReadyBySeed(seed) { return readyGames().find(g => g.id.toLowerCase().includes(seed)); }
function readyGames() { return games.filter(homepageReady); }
function playableGames() { return games.filter(g => g.auditStatus !== '启动失败'); }
function currentPool() { return activeCategory === 'All' ? readyGames() : playableGames().filter(g => g.category === activeCategory); }
function card(game) {
  const node = cardTemplate.content.cloneNode(true);
  const link = node.querySelector('.card-link');
  const img = node.querySelector('.art img');
  link.href = gameHref(game);
  if (game.banner) {
    img.src = game.banner;
  } else if (game.icon) {
    img.src = game.icon;
    node.querySelector('.art').classList.add('icon-expanded');
  } else {
    img.src = placeholder(game);
  }
  img.onerror = () => img.src = placeholder(game);
  img.alt = game.title;
  node.querySelector('.play-pill').textContent = `▶ ${t('startGame')}`;
  node.querySelector('h3').textContent = game.title;
  node.querySelector('p').textContent = categoryLabel(game.category);
  const icon = node.querySelector('.game-icon');
  icon.src = game.icon || iconPlaceholder(game);
  icon.onerror = () => icon.src = iconPlaceholder(game);
  icon.alt = `${game.title} icon`;
  return node;
}
function hero(game, secondary = false) {
  const node = heroTemplate.content.cloneNode(true);
  const root = node.querySelector('.hero-card');
  const link = node.querySelector('.hero-link');
  const img = node.querySelector('img');
  root.classList.toggle('secondary', secondary);
  link.href = gameHref(game);
  if (game.banner) {
    img.src = game.banner;
  } else if (game.icon) {
    img.src = game.icon;
    root.classList.add('icon-expanded-hero');
  } else {
    img.src = placeholder(game);
  }
  img.alt = game.title;
  node.querySelector('.eyebrow').textContent = t('featured');
  node.querySelector('h1').textContent = game.title;
  node.querySelector('p').textContent = secondary ? categoryLabel(game.category) : `${categoryLabel(game.category)} · ${t('clickToPlay')}`;
  node.querySelector('strong').textContent = t('playNow');
  return node;
}
function searchQuery() { return search.value.trim().toLowerCase(); }
function matches(game) {
  const q = searchQuery();
  const haystack = `${game.title} ${game.id} ${game.category} ${categoryLabel(game.category)}`.toLowerCase();
  return !q || haystack.includes(q);
}
function renderGrid() {
  const searching = Boolean(searchQuery());
  document.body.classList.toggle('searching', searching);
  const pool = searching ? playableGames() : currentPool();
  const visible = pool.filter(matches);
  grid.replaceChildren(...visible.map(card));
  count.textContent = `${visible.length} ${t('games')}`;
  document.querySelector('#all-games h2').textContent = searching ? t('searchResults') : activeCategory === 'All' ? t('allGames') : categoryLabel(activeCategory);
}
function renderNav() {
  const categories = ['All', ...categoryOrder];
  sideNav.replaceChildren(...categories.map(cat => {
    const button = document.createElement('button');
    const total = cat === 'All' ? readyGames().length : playableGames().filter(g => g.category === cat).length;
    button.className = `side-link${cat === activeCategory ? ' active' : ''}`;
    button.innerHTML = `<span>${categoryLabel(cat)}</span><small>${total}</small>`;
    button.onclick = () => setCategory(cat);
    return button;
  }));
}
function renderFilters() {
  const categories = ['All', ...categoryOrder];
  filters.replaceChildren(...categories.map(cat => {
    const button = document.createElement('button');
    button.className = `filter${cat === activeCategory ? ' active' : ''}`;
    button.textContent = categoryLabel(cat);
    button.onclick = () => setCategory(cat);
    return button;
  }));
}
function setCategory(cat) {
  activeCategory = cat;
  document.body.classList.remove('sidebar-open');
  renderNav(); renderFilters(); renderGrid();
  document.querySelector('#all-games').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function renderHero() {
  const picks = uniqueById(heroSeeds.map(findReadyBySeed));
  heroStage.replaceChildren(...picks.map((game, i) => hero(game, i > 0)));
}
function renderRails() {
  trending.replaceChildren(...uniqueById(trendingSeeds.map(findReadyBySeed)).map(card));
  quickPlay.replaceChildren(...uniqueById(quickSeeds.map(findReadyBySeed)).map(card));
}
function renderCategoryPanels() {
  const panels = categoryOrder.map(cat => {
    const box = document.createElement('article');
    box.className = 'category-panel';
    const picks = playableGames().filter(g => g.category === cat).slice(0, 4);
    box.innerHTML = `<h3>${categoryLabel(cat)}</h3><div class="mini-list"></div>`;
    const list = box.querySelector('.mini-list');
    list.replaceChildren(...picks.map(game => {
      const a = document.createElement('a');
      a.className = 'mini-link'; a.href = gameHref(game);
      a.innerHTML = `<span>${game.title}</span><strong>${t('play')}</strong>`;
      return a;
    }));
    box.onclick = e => { if (e.target === box || e.target.tagName === 'H3') setCategory(cat); };
    return box;
  });
  categoryPanels.replaceChildren(...panels);
}
function applyStaticText() {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelector('.top-actions a.ghost').textContent = t('browseAll');
  search.placeholder = window.matchMedia('(max-width: 700px)').matches ? (lang === 'zh' ? '搜索游戏…' : 'Search games…') : t('search');
  document.querySelector('.sidebar-note strong').textContent = `${readyGames().length}+ ${t('readyGames')}`;
  document.querySelector('.sidebar-note span').textContent = t('categoryNote');
  document.querySelectorAll('.rail-block .section-head h2')[0].textContent = t('trending');
  document.querySelectorAll('.rail-block .section-head span')[0].textContent = t('playableNow');
  document.querySelectorAll('.rail-block .section-head h2')[1].textContent = t('quickPlay');
  document.querySelectorAll('.rail-block .section-head span')[1].textContent = t('easyStart');
  langToggle.textContent = lang === 'zh' ? 'EN' : '中文';
}
function rerenderAll() {
  if (window.ArcadeHubSEO) window.ArcadeHubSEO.update({
    title: lang === 'zh' ? 'Arcade Hub - 在线小游戏合集' : 'Arcade Hub - Instant Browser Games',
    description: lang === 'zh' ? 'Arcade Hub 提供可直接在浏览器中游玩的 HTML5 小游戏，涵盖益智、动作、竞速、体育、街机和休闲分类。' : 'Play instant HTML5 browser games on Arcade Hub across puzzle, action, racing, sports, arcade, and casual categories.',
    image: 'external-assets/brand/og-arcade-hub.svg',
    canonical: location.href
  });
  applyStaticText(); renderHero(); renderRails(); renderCategoryPanels(); renderNav(); renderFilters(); renderGrid();
}
fetch('games.json').then(r => r.json()).then(data => { games = data; rerenderAll(); });
search.addEventListener('input', () => {
  renderGrid();
  clearTimeout(searchTrackTimer);
  searchTrackTimer = setTimeout(() => {
    const q = searchQuery();
    if (q && window.ArcadeHubAnalytics) window.ArcadeHubAnalytics.track('search', { search_term: q, active_category: activeCategory });
  }, 450);
});
langToggle.addEventListener('click', () => { lang = lang === 'zh' ? 'en' : 'zh'; localStorage.setItem('arcadeLang', lang); rerenderAll(); });

sidebarToggle.addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
sidebarScrim.addEventListener('click', () => document.body.classList.remove('sidebar-open'));

window.addEventListener('resize', () => { search.placeholder = window.matchMedia('(max-width: 700px)').matches ? (lang === 'zh' ? '搜索游戏…' : 'Search games…') : t('search'); });
