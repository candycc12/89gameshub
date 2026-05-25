const params = new URLSearchParams(location.search);
const id = params.get('id');
let lang = params.get('lang') || localStorage.getItem('arcadeLang') || 'zh';
const player = document.querySelector('#player');
const relatedGames = document.querySelector('#related-games');
const recommendedGames = document.querySelector('#recommended-games');
const miniCardTemplate = document.querySelector('#mini-card-template');
const prerollAd = document.querySelector('#preroll-ad');
const prerollCountdown = document.querySelector('#preroll-countdown');
let activeGame;
let allGames = [];
const i18n = {
  zh: { back:'返回首页', reload:'重载', fullscreen:'全屏', newWindow:'新窗口', nowPlaying:'正在游玩', related:'同类游戏', like:'你可能还喜欢', info: cat => `这是一个 ${cat} 类型的网页游戏。点击上方按钮可以全屏、重载，或者继续探索同类游戏。`, categories:{Action:'动作',Puzzle:'益智',Racing:'竞速',Sports:'体育',Arcade:'街机',Casual:'休闲'} },
  en: { back:'Back home', reload:'Reload', fullscreen:'Fullscreen', newWindow:'New window', nowPlaying:'Now playing', related:'Related games', like:'You may also like', info: cat => `This is a ${cat} browser game. Use the controls above to go fullscreen, reload, or keep exploring related games.`, categories:{Action:'Action',Puzzle:'Puzzle',Racing:'Racing',Sports:'Sports',Arcade:'Arcade',Casual:'Casual'} }
};
function t(key){ return i18n[lang][key]; }
function catLabel(cat){ return i18n[lang].categories[cat]; }
function placeholder(game) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#7c5cff"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><rect width="128" height="128" rx="28" fill="url(#g)"/><text x="50%" y="56%" fill="white" font-size="44" font-family="Arial" font-weight="700" text-anchor="middle">${game.title.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase()}</text></svg>`)} `;
}
function gameHref(game) { return `play.html?id=${encodeURIComponent(game.id)}&lang=${lang}`; }
function miniCard(game) {
  const node = miniCardTemplate.content.cloneNode(true);
  const link = node.querySelector('.mini-card-link');
  const img = node.querySelector('img');
  link.href = gameHref(game);
  img.src = game.icon || placeholder(game);
  img.onerror = () => img.src = placeholder(game);
  img.alt = game.title;
  node.querySelector('h3').textContent = game.title;
  node.querySelector('p').textContent = catLabel(game.category);
  return node;
}
function fillPage(game) {
  activeGame = game;
  if (game.playMode === 'direct') {
    location.replace(game.entry);
    return;
  }
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  const seoDescription = lang === 'zh'
    ? `在线游玩 ${game.title}，这是一款可直接在浏览器中启动的${catLabel(game.category)}游戏。`
    : `Play ${game.title} online, a ${catLabel(game.category)} browser game that starts directly in Arcade Hub.`;
  if (window.ArcadeHubSEO) window.ArcadeHubSEO.update({ title: lang === 'zh' ? `在线玩 ${game.title}` : `Play ${game.title} Online`, description: seoDescription, image: game.banner || game.icon, canonical: location.href });
  else document.title = `${game.title} · Arcade Hub`;
  if (window.ArcadeHubAnalytics) {
    window.ArcadeHubAnalytics.setContext({
      landing_type: 'game_play',
      landing_name: game.id,
      content_type: 'game',
      content_id: game.id,
      content_title: game.title,
      content_category: game.category
    });
    window.ArcadeHubAnalytics.track('game_play_page_view', { game_id: game.id, game_title: game.title, category: game.category });
    window.ArcadeHubAnalytics.track('content_view', { content_type: 'game', content_id: game.id, content_title: game.title, content_category: game.category });
  }
  document.querySelector('#game-title').textContent = game.title;
  document.querySelector('#game-category').textContent = catLabel(game.category);
  document.querySelector('#info-title').textContent = game.title;
  document.querySelector('#info-copy').textContent = t('info')(catLabel(game.category));
  document.querySelector('#related-label').textContent = catLabel(game.category);
  document.querySelector('.game-info-card .eyebrow').textContent = t('nowPlaying');
  document.querySelector('.related-block h2').textContent = t('related');
  document.querySelector('.aside-card h2').textContent = t('like');
  document.querySelector('.play-actions a[href="index.html"]').textContent = t('back');
  document.querySelector('#reload-game').textContent = t('reload');
  document.querySelector('#fullscreen-game').textContent = t('fullscreen');
  document.querySelector('#open-original').textContent = t('newWindow');
  const frameWrap = document.querySelector('.player-frame-wrap');
  frameWrap.classList.toggle('portrait-game', game.orientation === 'portrait');
  frameWrap.classList.toggle('landscape-game', game.orientation === 'landscape');
  document.querySelector('#open-original').href = game.entry;
  startPreroll(game);
}
function renderSuggestions(game) {
  const sameCategory = allGames.filter(g => g.category === game.category && g.id !== game.id);
  const related = sameCategory.slice(0, 8);
  const fallback = allGames.filter(g => g.id !== game.id && g.category !== game.category);
  const recommended = [...sameCategory.slice(8, 12), ...fallback].slice(0, 6);
  relatedGames.replaceChildren(...related.map(miniCard));
  recommendedGames.replaceChildren(...recommended.map(miniCard));
}
function startPreroll(game) {
  let seconds = 5;
  prerollAd.classList.remove('hidden');
  if (window.ArcadeHubAnalytics) window.ArcadeHubAnalytics.track('ad_impression', { ad_slot: 'pre_game', ad_format: 'preroll', ad_type: 'house', ad_campaign: 'game_preroll', ad_destination: 'game_start', game_id: game.id, content_type: 'game', content_id: game.id });
  player.removeAttribute('src');
  const renderCountdown = () => prerollCountdown.textContent = `00:${String(seconds).padStart(2, '0')}`;
  renderCountdown();
  const timer = setInterval(() => {
    seconds -= 1;
    renderCountdown();
    if (seconds <= 0) {
      clearInterval(timer);
      prerollAd.classList.add('hidden');
      player.src = game.entry;
      if (window.ArcadeHubAnalytics) {
        const startParams = { game_id: game.id, game_title: game.title, category: game.category, entry: game.entry, content_type: 'game', content_id: game.id, content_title: game.title, content_category: game.category };
        window.ArcadeHubAnalytics.track('game_start', startParams);
        window.ArcadeHubAnalytics.track('content_start', startParams);
      }
    }
  }, 1000);
}
function reloadGame() { startPreroll(activeGame); }
async function fullscreenGame() {
  const shell = document.querySelector('.player-frame-wrap');
  if (document.fullscreenElement) await document.exitFullscreen();
  else if (shell.requestFullscreen) await shell.requestFullscreen();
}
fetch('games.json').then(r => r.json()).then(games => {
  allGames = games;
  const game = games.find(g => g.id === id) || games[0];
  fillPage(game);
  renderSuggestions(game);
});
document.querySelector('#reload-game').addEventListener('click', reloadGame);
document.querySelector('#fullscreen-game').addEventListener('click', fullscreenGame);
