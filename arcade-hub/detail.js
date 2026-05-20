const params = new URLSearchParams(location.search);
const id = params.get('id');
let lang = params.get('lang') || localStorage.getItem('arcadeLang') || 'zh';
const template = document.querySelector('#mini-card-template');
let games = [];
const categoryText = {
  zh: {
    Action: {
      about:g=>`${g.title} 是一款节奏明快的动作类网页游戏，适合喜欢即时反应、连续操作和短局爽感的玩家。你需要在不断变化的局面中快速判断、抓住机会，并通过一次次尝试熟悉关卡与敌人的节奏。`,
      how:g=>`点击“开始游戏”进入后，先观察目标、障碍和敌人的行为模式，再逐步掌握推进节奏。多数动作游戏都鼓励你在移动、攻击和规避之间做出快速切换，失败后重新开始也往往是学习的一部分。`,
      controls:`通常使用鼠标、触控或键盘完成移动、瞄准、攻击与互动。进入游戏后，请优先查看屏幕上的提示或教程按钮。`
    },
    Puzzle: {
      about:g=>`${g.title} 是一款益智类网页游戏，核心乐趣在于观察、推理和逐步找到最优解。它通常不依赖复杂操作，而是通过颜色、数字、连接、排序或空间关系来考验你的判断力。`,
      how:g=>`点击“开始游戏”后，先理解当前关卡的目标，再尝试从最容易判断的步骤入手。遇到卡关时，可以先整理局面、寻找重复规律，或回退一步重新规划，往往比盲目尝试更有效。`,
      controls:`大多数益智游戏支持鼠标点击、拖拽或触控操作；部分游戏还会提供撤销、提示、重置等辅助按钮。`
    },
    Racing: {
      about:g=>`${g.title} 是一款竞速或驾驶类网页游戏，重点在于路线选择、节奏控制和对速度的把握。无论是停车、漂移还是关卡驾驶，玩家都需要在精准与效率之间找到平衡。`,
      how:g=>`进入游戏后，先熟悉车辆反馈和赛道布局，再逐渐提高速度。遇到弯道、障碍或停车位时，提前预判通常比临时修正更重要。`,
      controls:`通常使用方向键、WASD、鼠标或触控按钮进行转向、加速、刹车与倒车。`
    },
    Sports: {
      about:g=>`${g.title} 是一款体育类网页游戏，强调时机、角度和手感。它把现实运动中的关键瞬间压缩成更轻快的浏览器体验，适合随时来上一局。`,
      how:g=>`点击“开始游戏”后，先观察节奏与出手窗口，再根据目标位置调整力度、角度或时机。多练几次后，手感通常会比一开始稳定很多。`,
      controls:`常见操作包括点击、拖拽、滑动或键盘控制；具体动作会根据足球、篮球、高尔夫等项目略有不同。`
    },
    Arcade: {
      about:g=>`${g.title} 是一款街机风格网页游戏，通常上手很快、反馈直接、节奏紧凑。它适合想要快速进入状态、追求分数或不断刷新纪录的玩家。`,
      how:g=>`进入游戏后，先完成一两轮来熟悉节奏和判定，再逐步挑战更高分数或更长连击。街机游戏往往越玩越顺，掌握节奏后乐趣会明显提升。`,
      controls:`通常支持点击、触控、拖拽或少量键盘按键，规则简单，反馈即时。`
    },
    Casual: {
      about:g=>`${g.title} 是一款休闲类网页游戏，适合轻松体验、碎片时间游玩或随手放松。它通常拥有容易理解的规则、直观的目标和比较低的上手门槛。`,
      how:g=>`点击“开始游戏”后，先跟随界面提示完成第一轮操作，再慢慢熟悉升级、收集、关卡或连击机制。多数休闲游戏都适合边玩边学，不需要提前研究太多。`,
      controls:`通常支持鼠标点击、拖拽或触控操作，部分游戏会辅以简单键盘输入。`
    }
  },
  en: {
    Action: {
      about:g=>`${g.title} is a fast-paced action browser game built around quick reactions, constant movement, and satisfying short sessions. You will need to read changing situations quickly, seize openings, and learn the rhythm of each challenge through repeated attempts.`,
      how:g=>`Press “Play now,” then watch the objectives, hazards, and enemy patterns before pushing forward. Most action games reward smooth switching between movement, attacks, and evasive decisions, and failure is often part of learning the level.`,
      controls:`Action games commonly use mouse, touch, or keyboard controls for movement, aiming, attacks, and interactions. Check the on-screen prompts when the game begins.`
    },
    Puzzle: {
      about:g=>`${g.title} is a puzzle browser game focused on observation, logic, and finding the cleanest solution step by step. Instead of demanding complex controls, it challenges you through colors, numbers, connections, sorting, or spatial relationships.`,
      how:g=>`After pressing “Play now,” identify the goal of the level first and begin with the moves that are easiest to reason about. If you get stuck, organizing the board, spotting repeated patterns, or stepping back to plan again is often more effective than random guessing.`,
      controls:`Most puzzle games use clicks, drag-and-drop, or touch controls. Some also include helpful tools such as undo, hints, or reset buttons.`
    },
    Racing: {
      about:g=>`${g.title} is a racing or driving browser game about route choice, timing, and control. Whether the challenge is parking, drifting, or level-based driving, success comes from balancing precision with speed.`,
      how:g=>`Start by learning how the vehicle responds and reading the layout of the course. As you improve, increase your pace while anticipating turns, obstacles, and stopping points before they arrive.`,
      controls:`Driving games commonly use arrow keys, WASD, mouse input, or touch buttons for steering, acceleration, braking, and reversing.`
    },
    Sports: {
      about:g=>`${g.title} is a sports browser game built around timing, angle, and feel. It condenses the best moments of real-world sports into a lighter browser-friendly format that works well for quick sessions.`,
      how:g=>`Press “Play now,” then study the rhythm of the action before choosing your release timing, angle, or power. After a few attempts, your sense of timing will usually become much more consistent.`,
      controls:`Common interactions include clicks, drags, swipes, or keyboard input, depending on whether the game is based on football, basketball, golf, or another sport.`
    },
    Arcade: {
      about:g=>`${g.title} is an arcade-style browser game with quick onboarding, immediate feedback, and compact sessions. It is a good fit for players who enjoy chasing scores, improving runs, or jumping straight into the action.`,
      how:g=>`Use the first few rounds to learn the timing and rules, then start pushing for better scores, longer streaks, or cleaner runs. Arcade games often become much more rewarding once their rhythm clicks.`,
      controls:`Arcade games usually rely on clicks, touch, drags, or a small number of keyboard inputs, keeping the rules simple and the feedback immediate.`
    },
    Casual: {
      about:g=>`${g.title} is a casual browser game designed for relaxed play, short breaks, and easy pick-up sessions. It usually offers approachable rules, clear goals, and a low barrier to entry.`,
      how:g=>`Press “Play now,” follow the first in-game prompts, and learn by doing. Most casual games reveal their progression, collection, level, or combo systems naturally as you continue playing.`,
      controls:`Casual games usually support mouse clicks, drag-and-drop, or touch controls, with occasional simple keyboard input.`
    }
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

const detailFallbackGames = fallbackGames.map(game => ({
  entry: `../${game.id}/index.html`,
  playMode: 'iframe',
  ...game
}));

const i18n = {
  zh: {home:'首页',play:'开始游戏',direct:'直接打开',category:'分类',platform:'平台',technology:'技术',about:'关于这个游戏',how:'怎么玩',controls:'操作方式',related:'相关游戏',browser:'浏览器（电脑 / 手机 / 平板）',intro:g=>`进入 ${g.title}，开始一局 ${label(g.category)} 游戏。`,categories:{Action:'动作',Puzzle:'益智',Racing:'竞速',Sports:'体育',Arcade:'街机',Casual:'休闲'}},
  en: {home:'Home',play:'Play now',direct:'Open directly',category:'Category',platform:'Platform',technology:'Technology',about:'About this game',how:'How to play',controls:'Controls',related:'Related games',browser:'Browser (desktop, mobile, tablet)',intro:g=>`Jump into ${g.title}, a ${label(g.category)} browser game.`,categories:{Action:'Action',Puzzle:'Puzzle',Racing:'Racing',Sports:'Sports',Arcade:'Arcade',Casual:'Casual'}}
};
function t(k){return i18n[lang][k]}
function label(cat){return i18n[lang].categories[cat]}
function placeholder(game){return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#312e81"/><stop offset="1" stop-color="#0891b2"/></linearGradient></defs><rect width="640" height="400" fill="url(#g)"/><text x="50%" y="52%" fill="white" font-size="42" font-family="Arial" font-weight="700" text-anchor="middle">${game.title}</text></svg>`)} `}
function iconPlaceholder(game){const initials=game.title.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#7c5cff"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><rect width="128" height="128" rx="28" fill="url(#g)"/><text x="50%" y="56%" fill="white" font-size="44" font-family="Arial" font-weight="700" text-anchor="middle">${initials}</text></svg>`)} `}
function detailHref(g){return `detail.html?id=${encodeURIComponent(g.id)}&lang=${lang}`}
function miniCard(g){const n=template.content.cloneNode(true),a=n.querySelector('a'),img=n.querySelector('img');a.href=detailHref(g);img.src=g.icon||iconPlaceholder(g);img.onerror=()=>img.src=iconPlaceholder(g);n.querySelector('h3').textContent=g.title;n.querySelector('p').textContent=label(g.category);return n}
function render(game){
 const copy=categoryText[lang][game.category]||categoryText[lang].Casual;
 const aboutText = copy.about(game);
 const seoDescription = lang === 'zh'
   ? `${game.title} 是一款可在浏览器中直接游玩的${label(game.category)}游戏。查看玩法、操作方式和相关游戏。`
   : `Play ${game.title}, a ${label(game.category)} browser game on Arcade Hub. Read how to play, controls, and related games.`;
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';
 if (window.ArcadeHubSEO) window.ArcadeHubSEO.update({ title: lang === 'zh' ? `${game.title} - ${label(game.category)}游戏` : `${game.title} - ${label(game.category)} Game`, description: seoDescription, image: game.banner || game.icon, type: 'article', canonical: location.href });
 else document.title=`${game.title} · Arcade Hub`;
 if (window.ArcadeHubAnalytics) window.ArcadeHubAnalytics.track('game_detail_view', { game_id: game.id, game_title: game.title, category: game.category });
 document.querySelector('#detail-title').textContent=game.title; document.querySelector('#detail-category').textContent=label(game.category); document.querySelector('#detail-intro').textContent=t('intro')(game);
 const banner=document.querySelector('#detail-banner'); banner.src=game.banner||game.icon||placeholder(game); banner.onerror=()=>banner.src=placeholder(game);
 document.querySelector('#detail-play').href=game.playMode === 'direct' ? game.entry : `play.html?id=${encodeURIComponent(game.id)}&lang=${lang}`; document.querySelector('#detail-open-direct').href=game.entry; document.querySelector('#detail-play').textContent=t('play'); document.querySelector('#detail-open-direct').textContent=t('direct');
 document.querySelector('#breadcrumbs').innerHTML=`<a href="index.html">${t('home')}</a><span>›</span><span>${label(game.category)}</span><span>›</span><strong>${game.title}</strong>`;
 document.querySelector('#label-category').textContent=t('category'); document.querySelector('#label-platform').textContent=t('platform'); document.querySelector('#label-technology').textContent=t('technology'); document.querySelector('#meta-category').textContent=label(game.category); document.querySelector('#meta-platform').textContent=t('browser');
 document.querySelector('#about-heading').textContent=t('about'); document.querySelector('#how-heading').textContent=t('how'); document.querySelector('#controls-heading').textContent=t('controls'); document.querySelector('#related-heading').textContent=t('related');
 document.querySelector('#about-copy').textContent=aboutText; document.querySelector('#how-copy').textContent=copy.how(game); document.querySelector('#controls-copy').textContent=copy.controls;
 document.querySelector('#detail-home-link').textContent=t('home'); document.querySelector('#detail-lang-toggle').textContent=lang==='zh'?'EN':'中文';
 const related=games.filter(g=>g.category===game.category&&g.id!==game.id).slice(0,6); document.querySelector('#detail-related').replaceChildren(...related.map(miniCard));
}
function loadGames() {
  if (location.protocol === 'file:') return Promise.resolve(detailFallbackGames);
  return fetch('games.json').then(r => {
    if (!r.ok) throw new Error(`games.json ${r.status}`);
    return r.json();
  }).catch(() => detailFallbackGames);
}
loadGames().then(data=>{games=data;render(games.find(g=>g.id===id)||games[0]);}).catch(()=>{games=detailFallbackGames;render(games.find(g=>g.id===id)||games[0]);});
document.querySelector('#detail-lang-toggle').addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';localStorage.setItem('arcadeLang',lang);render(games.find(g=>g.id===id)||games[0]);});
