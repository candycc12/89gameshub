const I18N = {
  zh: {
    hub: 'Arcade Hub', score: '积分', streak: '连续挑战', completed: '已完成', quick: '快速挑战',
    today: '今日精选', trending: '正在流行', daily: '每日题', play: '开始答题', points: '积分',
    q: '第', of: '题 / 共', result: '你的结果', share: '分享文案', again: '再玩一次', close: '关闭',
    follow: '关注专栏', followed: '已关注', startBrief: '开始情景',
    deepLabel: '深度阅读 + 测验', deepTitle: '冷战危机室',
    deepCopy: '先读一段中立情景简报，再选择你会如何处理升级、盟友信号和风险。',
    creatorLabel: '创作者提示', creatorTitle: '写一个你的版本',
    creatorCopy: '选一个话题，设计 3-5 个选择，并做出让人想分享的结果。',
    create: '创建你的测验',
    categories: {
      love: '爱情与人格', meme: '梗与社交身份', celebrity: '明星与 K-pop', ai: 'AI 与未来工作',
      war: '战争、历史与地缘', geography: '地理与文明', finance: '金融与风险', daily: '每日挑战', create: '创建你的测验'
    },
    formats: {
      personality: '人格测验', trivia: '知识问答', timed: '限时挑战', thisThat: '二选一',
      strategy: '策略模拟', map: '地图挑战', daily: '每日题', template: '创作模板'
    },
    results: {
      strategist: ['冷静策略家', '你擅长先看结构再做选择，喜欢把风险拆开处理。'],
      spark: ['高能传播体', '你对新鲜事反应很快，能把复杂情绪变成可分享的判断。'],
      analyst: ['清醒分析派', '你会追问证据、边界和代价，适合做高压力判断。'],
      connector: ['社交读心者', '你很会捕捉气氛变化，也愿意给别人留余地。']
    },
    questionTemplates: {
      personality: ['面对这类题，你第一反应是什么？', '朋友让你给建议，你会先看什么？', '如果结果要发给朋友，你更想突出哪一点？', '最后一题：你最像哪种玩家？'],
      trivia: ['哪个选项最符合题目里的关键信息？', '如果只能选一个事实点，你会选？', '这道题的陷阱更可能在哪里？', '最后判断：你的答案是？'],
      timed: ['倒计时开始，你先锁定什么？', '第二步你会排除哪类干扰？', '时间只剩一半，你怎么处理？', '冲刺题：选一个最稳的答案。'],
      thisThat: ['你会选哪一边？', '周末版本的你更像哪一个？', '朋友群里你通常负责什么？', '最终选择：更像你的是？'],
      strategy: ['情景开始，你的第一步是什么？', '出现不确定信号，你会如何分配资源？', '舆论和成本同时上升，你优先处理什么？', '最后决策：你选择哪条路径？'],
      map: ['看一张空白地图，你先找什么线索？', '如果边界很模糊，你会用什么判断？', '文明扩张通常受什么影响最大？', '最后定位：你更相信哪条线索？'],
      daily: ['今天的热题先看哪一层？', '你会把哪个选项发给朋友讨论？', '遇到争议项，你会怎么判断？', '今日收尾：选一个答案。'],
      template: ['你的测验标题应该先抓住什么？', '题目数量怎么安排？', '结果卡最重要的是什么？', '发布前最后检查什么？']
    },
    options: ['直觉和情绪信号', '数据、地图或时间线', '人际关系和传播效果', '风险、成本和后果']
  },
  en: {
    hub: 'Arcade Hub', score: 'Score', streak: 'Streak', completed: 'Completed', quick: 'Quick challenge',
    today: "Today's featured", trending: 'Trending now', daily: 'Daily Quiz', play: 'Play quiz', points: 'pts',
    q: 'Q', of: 'of', result: 'Your result', share: 'Share copy', again: 'Play again', close: 'Close',
    follow: 'Follow column', followed: 'Following', startBrief: 'Start scenario',
    deepLabel: 'Deep read + quiz', deepTitle: 'Cold War Crisis Room',
    deepCopy: 'Read a neutral scenario brief, then choose how you would manage escalation, alliance signals, and risk.',
    creatorLabel: 'Creator prompt', creatorTitle: 'Write your own version',
    creatorCopy: 'Pick a topic, define 3-5 choices, and make a result people want to share.',
    create: 'Create your quiz',
    categories: {
      love: 'Love & Personality', meme: 'Meme & Social Identity', celebrity: 'Celebrity & K-pop', ai: 'AI & Future Work',
      war: 'War, History & Geopolitics', geography: 'Geography & Civilization', finance: 'Finance & Risk', daily: 'Daily Challenge', create: 'Create Your Quiz'
    },
    formats: {
      personality: 'Personality quiz', trivia: 'Trivia quiz', timed: 'Timed challenge', thisThat: 'This-or-that',
      strategy: 'Strategy simulation', map: 'Map challenge', daily: 'Daily quiz', template: 'Quiz template'
    },
    results: {
      strategist: ['Calm Strategist', 'You read the structure before moving, then split risk into manageable choices.'],
      spark: ['Viral Spark', 'You react fast to fresh signals and turn messy vibes into shareable judgment.'],
      analyst: ['Clear Analyst', 'You ask for evidence, limits, and tradeoffs before making a high-pressure call.'],
      connector: ['Social Decoder', 'You catch changes in the room quickly and leave people space to be human.']
    },
    questionTemplates: {
      personality: ['What is your first reaction to this kind of quiz?', 'A friend asks for advice. What do you check first?', 'If you share the result, what should it highlight?', 'Final question: what kind of player are you?'],
      trivia: ['Which option best matches the key clue?', 'If you could keep one fact, which would it be?', 'Where is the trap in this question?', 'Final call: what is your answer?'],
      timed: ['Timer starts. What do you lock onto first?', 'What distraction do you eliminate next?', 'Half the time is gone. What now?', 'Sprint question: choose the safest answer.'],
      thisThat: ['Which side do you pick?', 'Weekend-you looks more like which one?', 'In a group chat, what role do you play?', 'Final choice: which sounds more like you?'],
      strategy: ['The scenario starts. What is your first move?', 'Signals are uncertain. How do you allocate resources?', 'Public pressure and cost both rise. What comes first?', 'Final decision: which path do you choose?'],
      map: ['On a blank map, what clue do you seek first?', 'If borders are fuzzy, how do you judge?', 'What most shapes civilizational expansion?', 'Final location call: which clue do you trust?'],
      daily: ['For today’s topic, what layer do you inspect first?', 'Which option would you send to a friend?', 'When an item is debatable, how do you judge?', 'Daily closer: pick one answer.'],
      template: ['What should your quiz title grab first?', 'How should the questions be paced?', 'What matters most on a result card?', 'Final pre-publish check?']
    },
    options: ['Instinct and emotional signal', 'Data, maps, or timelines', 'Social context and shareability', 'Risk, cost, and consequences']
  }
};

const QUIZZES = [
  ['ai-chat-analyzer', 'AI Chat Crush Test', 'AI 聊天心动测试', 'love', 'personality', 120, true],
  ['red-flag-scanner', 'Red Flag Scanner', '红旗扫描', 'love', 'personality', 110, true],
  ['villain-mbti', 'Villain MBTI', '反派 MBTI', 'meme', 'personality', 100, true],
  ['kpop-stan-exam', 'K-pop Detail Exam', 'K-pop 细节考试', 'celebrity', 'trivia', 130, true],
  ['2026-internet-slang-exam', '2026 Internet Slang Exam', '2026 网络黑话考试', 'meme', 'trivia', 90, true],
  ['wwii-commander-1944', 'WWII Commander 1944', '二战指挥官 1944', 'war', 'strategy', 150, false],
  ['three-kingdoms-strategist', 'Three Kingdoms Advisor', '三国谋士测试', 'war', 'strategy', 130, false],
  ['world-map-blind-test', 'World Map Blind Test', '世界地图盲测', 'geography', 'map', 120, false],
  ['trader-personality-quiz', 'Trader Personality Quiz', '交易员人格测验', 'finance', 'personality', 120, false],
  ['cold-war-crisis-simulator', 'Cold War Crisis Simulator', '冷战危机决策模拟', 'war', 'strategy', 150, false],
  ['ai-replacement-risk', 'AI Replacement Risk', 'AI 替代风险测验', 'ai', 'strategy', 120, true],
  ['chaos-mode-quiz', 'Chaos Mode Quiz', '混乱模式测验', 'meme', 'timed', 100, true],
  ['date-vibe-decoder', 'Date Vibe Decoder', '约会气氛解码', 'love', 'thisThat', 90, true],
  ['friend-group-role', 'Group Chat Role', '群聊角色测试', 'meme', 'personality', 80, true],
  ['soft-launch-test', 'Soft Launch Test', '偷偷拍照测试', 'love', 'personality', 100, true],
  ['situationship-meter', 'Situationship Meter', '暧昧关系温度计', 'love', 'thisThat', 90, true],
  ['main-character-day', 'Main Character Day', '主角日测试', 'meme', 'personality', 80, true],
  ['group-chat-lawyer', 'Group Chat Lawyer Exam', '群聊律师资格考试', 'meme', 'trivia', 90, true],
  ['celebrity-blind-items', 'Celebrity Clue Sprint', '明星线索冲刺', 'celebrity', 'timed', 100, true],
  ['kpop-choreo-clues', 'K-pop Choreo Clues', 'K-pop 编舞线索题', 'celebrity', 'trivia', 100, true],
  ['idol-survival-producer', 'Idol Survival Producer Simulator', '偶像生存节目制作人模拟', 'celebrity', 'strategy', 120, true],
  ['movie-villain-roommate', 'Villain Roommate', '反派室友测试', 'meme', 'personality', 90, true],
  ['ai-boss-simulator', 'AI Boss Simulator', 'AI 老板模拟器', 'ai', 'strategy', 120, true],
  ['future-job-vibe', 'Future Work Vibe', '未来工作人格', 'ai', 'personality', 100, true],
  ['prompt-engineer-oracle', 'Prompt Engineer Oracle', '提示词工程师预言机', 'ai', 'trivia', 110, true],
  ['robot-coworker-test', 'Robot Coworker Test', '机器人同事测试', 'ai', 'thisThat', 90, true],
  ['roman-empire-speedrun', 'Roman Empire Speedrun', '罗马帝国速通题', 'war', 'timed', 130, false],
  ['napoleon-campaign-choices', 'Napoleon Campaign Choices', '拿破仑战役选择题', 'war', 'strategy', 130, false],
  ['policy-tradeoff-room', 'Policy Tradeoff Room', '政策取舍模拟室', 'war', 'strategy', 120, false],
  ['geopolitical-risk-desk', 'Geopolitical Risk Desk', '地缘风险分析台', 'war', 'strategy', 140, false],
  ['ancient-civilization-match', 'Ancient Civilization Match', '古文明匹配题', 'geography', 'trivia', 100, false],
  ['capital-city-sprint', 'Capital City Sprint', '首都城市冲刺', 'geography', 'timed', 110, false],
  ['trade-route-map', 'Trade Route Map Challenge', '贸易路线地图挑战', 'geography', 'map', 120, false],
  ['river-civilization-test', 'River Civilization Test', '大河文明测试', 'geography', 'map', 110, false],
  ['portfolio-risk-style', 'Portfolio Risk Style', '投资组合风险风格', 'finance', 'personality', 110, false],
  ['market-panic-simulator', 'Market Panic Simulator', '市场恐慌模拟器', 'finance', 'strategy', 130, false],
  ['budget-boss-challenge', 'Budget Boss Challenge', '预算管理挑战', 'finance', 'trivia', 100, false],
  ['risk-or-reward', 'Risk or Reward?', '风险还是回报？', 'finance', 'thisThat', 100, false],
  ['daily-brain-spark', 'Daily Brain Spark', '每日脑洞题', 'daily', 'daily', 100, true],
  ['daily-map-minute', 'Daily Map Minute', '每日地图一分钟', 'daily', 'map', 100, false],
  ['create-your-viral-quiz', 'Create Your Viral Quiz', '创建你的爆款测验', 'create', 'template', 80, true]
].map(([id, titleEn, titleZh, category, format, points, viral]) => ({ id, title: { en: titleEn, zh: titleZh }, category, format, points, viral }));

const storage = {
  get(key, fallback = null) {
    try {
      return window.localStorage.getItem(key) || fallback;
    } catch (_) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_) {
      // file:// previews can block storage; the quiz still works for the session.
    }
  }
};

const LANG_VERSION = 'en-default-2026-05-26';
const storedLangVersion = storage.get('arcadequiz-lang-version', '');
let lang = storedLangVersion === LANG_VERSION ? storage.get('arcadequiz-lang', 'en') : 'en';
storage.set('arcadequiz-lang-version', LANG_VERSION);
storage.set('arcadequiz-lang', lang);
let state = JSON.parse(storage.get('arcadequiz-state', '{"score":0,"streak":0,"completed":0}'));
let activeQuiz = null;
let activeQuestions = [];
let questionIndex = 0;
let answers = [];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const t = () => I18N[lang];
const localQuizTitle = (quiz) => quiz.title[lang];
const quizUrl = (quiz) => `arcadequiz-play.html?id=${encodeURIComponent(quiz.id)}`;
const QUIZ_EMOJIS = {
  love: ['💬', '💘', '🚩', '🧠'],
  meme: ['😂', '🌀', '😈', '📱'],
  celebrity: ['🎤', '✨', '👀', '💃'],
  ai: ['🤖', '⚡', '💼', '🔮'],
  war: ['🗺️', '♟️', '🏛️', '⚔️'],
  geography: ['🌍', '🧭', '🏞️', '🏺'],
  finance: ['📈', '💰', '🎲', '🧮'],
  daily: ['🔥', '⏱️', '🧩', '🌟'],
  create: ['✍️', '🧪', '🚀', '🎯']
};

function quizEmoji(quiz) {
  const list = QUIZ_EMOJIS[quiz.category] || ['❓', '✨'];
  const index = Math.abs(quiz.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % list.length;
  return list[index];
}

function buildQuestions(quiz) {
  const base = t().questionTemplates[quiz.format] || t().questionTemplates.personality;
  const traits = ['spark', 'analyst', 'connector', 'strategist'];
  return base.map((text, index) => ({
    text: `${text} ${localQuizTitle(quiz)}`,
    options: t().options.map((label, optionIndex) => ({
      label,
      trait: traits[(optionIndex + index) % traits.length],
      correct: optionIndex === ((quiz.id.length + index) % 4)
    }))
  }));
}

function quizMeta(quiz) {
  return `${t().formats[quiz.format]} · ${t().categories[quiz.category]} · +${quiz.points} ${t().points}`;
}

function cardTemplate(quiz, size = '') {
  return `<article class="quiz-card ${size}" data-category="${quiz.category}">
    <a class="quiz-card-button buttonlike" href="${quizUrl(quiz)}" data-quiz-id="${quiz.id}">
      <span class="quiz-art ${quiz.category}"><i>${quizEmoji(quiz)}</i></span>
      <span class="quiz-card-body">
        <small>${quizMeta(quiz)}</small>
        <strong>${localQuizTitle(quiz)}</strong>
        <em>${quiz.viral ? 'Viral' : 'Deep'} · ${quiz.format === 'strategy' ? 'Neutral scenario' : 'Interactive'}</em>
      </span>
    </a>
  </article>`;
}

function renderStaticText() {
  $$('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (t()[key]) node.textContent = t()[key];
  });
  $('#quiz-lang-toggle').textContent = lang === 'zh' ? 'EN' : '中文';
}

function renderNav() {
  $('#quiz-nav').innerHTML = Object.entries(t().categories)
    .filter(([key]) => key !== 'create')
    .map(([key, label]) => `<a href="#section-${key}">${label}</a>`)
    .join('');
}

function renderDashboard() {
  const featured = QUIZZES[0];
  $('#featured-quiz').innerHTML = `<img class="quiz-feature-img" src="external-assets/local-icons/quiz-star.jpg" alt="" /><span>${t().today}</span><h1>${localQuizTitle(featured)}</h1><p>${quizMeta(featured)}</p><a class="quiz-primary buttonlike" href="${quizUrl(featured)}" data-quiz-id="${featured.id}">${t().play}</a>`;
  $('#trending-quizzes').innerHTML = `<h2>${t().trending}</h2>` + QUIZZES.slice(1, 5).map((quiz) => cardTemplate(quiz, 'compact')).join('');
  const daily = QUIZZES.find((quiz) => quiz.category === 'daily');
  $('#daily-module').innerHTML = `<span>${t().daily}</span><h2>${localQuizTitle(daily)}</h2><p>${quizMeta(daily)}</p><a class="quiz-ghost buttonlike" href="${quizUrl(daily)}" data-quiz-id="${daily.id}">${t().play}</a>`;
  updateStats();
}

function renderFormats() {
  const formats = [...new Set(QUIZZES.map((quiz) => quiz.format))];
  $('#format-strip').innerHTML = formats.map((format) => `<button class="buttonlike" type="button" data-format="${format}">${t().formats[format]}</button>`).join('');
}

function renderSections() {
  $('#quiz-sections').innerHTML = Object.entries(t().categories).map(([category, label]) => {
    const quizzes = QUIZZES.filter((quiz) => quiz.category === category);
    if (!quizzes.length) return '';
    return `<section class="quiz-category" id="section-${category}">
      <div class="quiz-section-head"><h2>${label}</h2><span>${quizzes.length} quizzes</span></div>
      <div class="quiz-feed">${quizzes.map((quiz) => cardTemplate(quiz)).join('')}</div>
    </section>`;
  }).join('');
}

function updateStats() {
  $('#user-score').textContent = state.score;
  $('#user-streak').textContent = state.streak;
  $('#user-completed').textContent = state.completed;
  storage.set('arcadequiz-state', JSON.stringify(state));
}

function openQuiz(id) {
  activeQuiz = QUIZZES.find((quiz) => quiz.id === id) || QUIZZES[0];
  activeQuestions = buildQuestions(activeQuiz);
  questionIndex = 0;
  answers = [];
  $('#quiz-modal').classList.add('open');
  $('#quiz-modal').setAttribute('aria-hidden', 'false');
  $('#quiz-result').hidden = true;
  $('#quiz-question').hidden = false;
  $('#quiz-modal-title').textContent = localQuizTitle(activeQuiz);
  $('#quiz-modal-format').textContent = quizMeta(activeQuiz);
  $('#quiz-modal-copy').textContent = activeQuiz.format === 'strategy'
    ? (lang === 'zh' ? '中立决策模拟：权衡信号、成本和不确定性。' : 'Neutral decision simulation: weigh signals, cost, and uncertainty.')
    : (lang === 'zh' ? '回答 3-5 道选择题，获得结果卡和分享文案。' : 'Answer 3-5 multiple-choice questions to get a result card and share copy.');
  renderQuestion();
}

function renderQuestion() {
  const question = activeQuestions[questionIndex];
  $('#quiz-progress-label').textContent = `${t().q}${lang === 'zh' ? '' : ' '}${questionIndex + 1} ${t().of} ${activeQuestions.length}`;
  $('#quiz-progress-bar').style.width = `${(questionIndex / activeQuestions.length) * 100}%`;
  $('#quiz-question').innerHTML = `<h3>${question.text}</h3><div class="quiz-options">${question.options.map((option, index) => `<button class="buttonlike" type="button" data-answer="${index}">${option.label}</button>`).join('')}</div>`;
}

function chooseAnswer(index) {
  answers.push(activeQuestions[questionIndex].options[index]);
  questionIndex += 1;
  if (questionIndex >= activeQuestions.length) showResult();
  else renderQuestion();
}

function showResult() {
  const score = answers.filter((answer) => answer.correct).length;
  const traits = answers.reduce((memo, answer) => {
    memo[answer.trait] = (memo[answer.trait] || 0) + 1;
    return memo;
  }, {});
  const topTrait = Object.entries(traits).sort((a, b) => b[1] - a[1])[0]?.[0] || 'spark';
  const result = t().results[topTrait];
  const reward = activeQuiz.points + score * 10;
  state.score += reward;
  state.streak += 1;
  state.completed += 1;
  updateStats();
  $('#quiz-progress-bar').style.width = '100%';
  $('#quiz-question').hidden = true;
  $('#quiz-result').hidden = false;
  const share = lang === 'zh'
    ? `我在 Arcadequiz 玩了「${localQuizTitle(activeQuiz)}」，结果是「${result[0]}」，拿到 ${reward} 分。`
    : `I played "${localQuizTitle(activeQuiz)}" on Arcadequiz, got "${result[0]}", and earned ${reward} points.`;
  $('#quiz-result').innerHTML = `<span>${t().result}</span><h3>${result[0]}</h3><p>${result[1]}</p><div class="quiz-reward">+${reward} ${t().points} · ${score}/${activeQuestions.length}</div><label>${t().share}<textarea readonly>${share}</textarea></label><div class="quiz-result-actions"><button class="quiz-primary buttonlike" type="button" data-quiz-id="${activeQuiz.id}">${t().again}</button><button class="quiz-ghost buttonlike" type="button" id="result-close">${t().close}</button></div>`;
}

function closeQuiz() {
  $('#quiz-modal').classList.remove('open');
  $('#quiz-modal').setAttribute('aria-hidden', 'true');
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const answerButton = event.target.closest('[data-answer]');
    if (answerButton) chooseAnswer(Number(answerButton.dataset.answer));
    if (event.target.id === 'result-close') closeQuiz();
    const follow = event.target.closest('.follow-column');
    if (follow) follow.textContent = t().followed;
  });
  $('#quiz-close').addEventListener('click', closeQuiz);
  $('#quiz-modal').addEventListener('click', (event) => {
    if (event.target.id === 'quiz-modal') closeQuiz();
  });
  $('#quiz-lang-toggle').addEventListener('click', () => {
    lang = lang === 'zh' ? 'en' : 'zh';
    storage.set('arcadequiz-lang-version', LANG_VERSION);
    storage.set('arcadequiz-lang', lang);
    render();
  });
  $('#quick-challenge').addEventListener('click', () => {
    const quiz = QUIZZES[Math.floor(Math.random() * QUIZZES.length)];
    location.href = quizUrl(quiz);
  });
}

function render() {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  renderStaticText();
  renderNav();
  renderDashboard();
  renderFormats();
  renderSections();
}

window.ArcadequizShared = {
  I18N,
  QUIZZES,
  buildQuestions,
  getLang: () => lang,
  getState: () => ({ ...state }),
  localQuizTitle,
  quizMeta,
  quizUrl,
  quizEmoji,
  setLang(nextLang) {
    lang = nextLang;
    storage.set('arcadequiz-lang-version', LANG_VERSION);
    storage.set('arcadequiz-lang', lang);
  },
  updateProgress(points) {
    state.score += points;
    state.streak += 1;
    state.completed += 1;
    storage.set('arcadequiz-state', JSON.stringify(state));
    return { ...state };
  },
  text: t
};

if (document.body.classList.contains('quiz-page')) {
  render();
  bindEvents();
}

if (document.body.classList.contains('quiz-page') && window.ArcadeHubSEO) {
  window.ArcadeHubSEO.update({
    title: 'Arcadequiz - Viral Quizzes & Strategy Challenges',
    description: 'Play bilingual viral quizzes and strategy challenges across personality, trivia, maps, finance, history, and daily formats.',
    image: 'external-assets/brand/og-arcade-hub.svg',
    canonical: location.href
  });
}
