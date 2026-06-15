(function () {
  const shared = window.ArcadequizShared;
  if (!shared) return;

  const params = new URLSearchParams(location.search);
  const quiz = shared.QUIZZES.find((item) => item.id === params.get('id')) || shared.QUIZZES[0];
  const isWorldCupQuiz = quiz.id === 'world-cup-match-predictor';
  let questions = [];
  let questionIndex = 0;
  let answers = [];
  let isAnswering = false;
  let questionAdPushed = false;
  let resultAdPushed = false;
  let profile = {
    name: '',
    photo: '',
    context: 'Situationship'
  };
  let worldCupFan = {
    photo: '',
    team: 'usa',
    pick: 'win'
  };

  const $ = (selector) => document.querySelector(selector);
  const text = () => shared.text();
  const title = () => shared.localQuizTitle(quiz);
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
  const escapeAttr = (value) => escapeHTML(value).replaceAll('`', '&#96;');
  const runKey = `arcadequiz-run-${quiz.id}`;
  const wcFanKey = `arcadequiz-world-cup-fan-${quiz.id}`;
  const wcPoolKey = `arcadequiz-world-cup-pool-${quiz.id}`;
  const WC_TEAMS = [
    { id: 'usa', name: 'USA', flag: '🇺🇸', colors: ['#1d4ed8', '#ef4444'] },
    { id: 'mexico', name: 'Mexico', flag: '🇲🇽', colors: ['#15803d', '#dc2626'] },
    { id: 'canada', name: 'Canada', flag: '🇨🇦', colors: ['#dc2626', '#ffffff'] },
    { id: 'brazil', name: 'Brazil', flag: '🇧🇷', colors: ['#16a34a', '#facc15'] },
    { id: 'argentina', name: 'Argentina', flag: '🇦🇷', colors: ['#38bdf8', '#ffffff'] },
    { id: 'france', name: 'France', flag: '🇫🇷', colors: ['#1d4ed8', '#ef4444'] },
    { id: 'england', name: 'England', flag: '🏴', colors: ['#f8fafc', '#dc2626'] },
    { id: 'spain', name: 'Spain', flag: '🇪🇸', colors: ['#dc2626', '#facc15'] }
  ];

  try {
    worldCupFan = { ...worldCupFan, ...(JSON.parse(sessionStorage.getItem(wcFanKey) || 'null') || {}) };
  } catch (_) {}

  function todayKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function readWorldCupPool() {
    try {
      const stored = JSON.parse(localStorage.getItem(wcPoolKey) || 'null');
      if (stored && typeof stored === 'object') return { days: {}, ...stored };
    } catch (_) {}
    return { days: {} };
  }

  function saveWorldCupPool(pool) {
    try {
      localStorage.setItem(wcPoolKey, JSON.stringify(pool));
    } catch (_) {}
  }

  function poolStats(pool = readWorldCupPool()) {
    const entries = Object.entries(pool.days || {}).sort(([a], [b]) => a.localeCompare(b));
    const total = entries.length;
    const settled = entries.filter(([, item]) => item.result).length;
    const correct = entries.filter(([, item]) => item.correct).length;
    const accuracy = settled ? Math.round((correct / settled) * 100) : 0;
    let streak = 0;
    const seen = new Set(entries.map(([date]) => date));
    const cursor = new Date(`${todayKey()}T00:00:00`);
    while (seen.has(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    const shareUnits = Math.max(0, streak * 10 + correct * 20 + Math.max(0, accuracy - 50));
    const eligible = streak >= 3 && settled >= 3 && accuracy >= 50;
    return { total, settled, correct, accuracy, streak, shareUnits, eligible };
  }

  function crushContexts() {
    return shared.getLang() === 'zh'
      ? ['朋友', '同学 / 同事', '网友', '暧昧中', '前任阴影', '不该想的人']
      : ['Friend', 'Classmate / coworker', 'Online person', 'Situationship', 'Ex-adjacent', 'Someone I should not be thinking about'];
  }

  function setDetailUrl() {
    const cleanUrl = `${location.pathname}?id=${encodeURIComponent(quiz.id)}`;
    if (!params.get('id')) history.replaceState(null, '', cleanUrl);
  }

  function questionUrl(step) {
    return `${location.pathname}?id=${encodeURIComponent(quiz.id)}&step=${encodeURIComponent(step)}`;
  }

  function readRun() {
    try {
      return JSON.parse(sessionStorage.getItem(runKey) || 'null');
    } catch (_) {
      return null;
    }
  }

  function saveRun(nextIndex = questionIndex) {
    try {
      sessionStorage.setItem(runKey, JSON.stringify({
        profile,
        answers,
        questionIndex: nextIndex
      }));
    } catch (_) {
      // Very large local photo previews can exceed browser storage limits.
    }
  }

  function clearRun() {
    try {
      sessionStorage.removeItem(runKey);
    } catch (_) {}
  }

  function updateScoreCard(state = shared.getState()) {
    $('#detail-score').textContent = state.score;
    $('#detail-streak').textContent = state.streak;
    $('#detail-completed').textContent = state.completed;
    $('#detail-score-label').textContent = text().score;
    $('#detail-streak-label').textContent = text().streak;
    $('#detail-completed-label').textContent = text().completed;
  }

  function ensureAdUnit(slot) {
    const existingAd = slot.querySelector('.adsbygoogle');
    if (existingAd) return existingAd;
    const placeholder = slot.querySelector('.ad-slot-label, span');
    if (placeholder) placeholder.remove();
    const ad = document.createElement('ins');
    ad.className = 'adsbygoogle';
    ad.style.display = 'block';
    ad.dataset.adClient = 'ca-pub-5502975373459743';
    ad.dataset.adSlot = '4151766489';
    ad.dataset.adFormat = 'rectangle';
    ad.dataset.fullWidthResponsive = 'false';
    slot.appendChild(ad);
    return ad;
  }

  function updateAdDebug(slot, ad) {
    if (!new URLSearchParams(location.search).has('addebug')) return;
    let debug = slot.querySelector('.ad-debug-status');
    if (!debug) {
      debug = document.createElement('small');
      debug.className = 'ad-debug-status';
      slot.appendChild(debug);
    }
    const status = ad.getAttribute('data-ad-status') || 'requested';
    debug.textContent = `AdSense: ${status}`;
  }

  function pushAdUnit(slot) {
    const ad = ensureAdUnit(slot);
    slot.classList.remove('ad-slot-empty', 'ad-slot-filled');
    const syncSlotState = (collapsePending = false) => {
      const status = ad.getAttribute('data-ad-status') || '';
      if (status === 'filled') {
        slot.classList.add('ad-slot-filled');
        slot.classList.remove('ad-slot-empty');
      } else if (status === 'unfilled' || collapsePending) {
        slot.classList.add('ad-slot-empty');
        slot.classList.remove('ad-slot-filled');
      }
      updateAdDebug(slot, ad);
    };
    const observer = new MutationObserver(() => syncSlotState(false));
    observer.observe(ad, { attributes: true, attributeFilter: ['data-ad-status'] });
    window.setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        updateAdDebug(slot, ad);
        window.setTimeout(() => syncSlotState(false), 1800);
        window.setTimeout(() => {
          syncSlotState(ad.getAttribute('data-ad-status') !== 'filled');
          observer.disconnect();
        }, 5200);
      } catch (_) {}
    }, 80);
  }

  function setQuestionAdVisible(isVisible) {
    const slot = $('#quiz-question-ad-slot');
    if (!slot) return;
    slot.hidden = !isVisible;
    if (isVisible && !questionAdPushed) {
      questionAdPushed = true;
      pushAdUnit(slot);
    }
  }

  function setResultAdVisible(isVisible) {
    const slot = $('#quiz-result-ad-slot');
    if (!slot) return;
    slot.hidden = !isVisible;
    if (isVisible && !resultAdPushed) {
      resultAdPushed = true;
      pushAdUnit(slot);
    }
  }

  function profileName() {
    return profile.name.trim() || shared.profileFallbackName();
  }

  function quizLink() {
    const path = `${location.pathname}?id=${encodeURIComponent(quiz.id)}`;
    return `${location.origin}${path}`;
  }

  function qrCodeUrl(value) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=8&data=${encodeURIComponent(value)}`;
  }

  function saveWorldCupFan() {
    try {
      sessionStorage.setItem(wcFanKey, JSON.stringify(worldCupFan));
    } catch (_) {}
  }

  function worldCupTeam() {
    return WC_TEAMS.find((team) => team.id === worldCupFan.team) || WC_TEAMS[0];
  }

  function worldCupPickText() {
    const team = worldCupTeam();
    const map = {
      win: `I back ${team.name} to win today.`,
      upset: `${team.name} upset agenda is officially open.`,
      chaos: `${team.name} match prediction: chaos, VAR, and group chat receipts.`
    };
    return map[worldCupFan.pick] || map.win;
  }

  function worldCupPostText() {
    return `${worldCupPickText()} I made my 2026 World Cup supporter avatar on Arcadequiz. Make yours: ${quizLink()}`;
  }

  function worldCupStreakText() {
    const stats = poolStats();
    return `I have a ${stats.streak}-day World Cup prediction streak with ${stats.accuracy}% settled accuracy on Arcadequiz. Join my prediction pool: ${quizLink()}`;
  }

  function lockWorldCupPrediction() {
    const pool = readWorldCupPool();
    const today = todayKey();
    if (!pool.days) pool.days = {};
    if (pool.days[today]) return;
    pool.days[today] = {
      team: worldCupFan.team,
      teamName: worldCupTeam().name,
      pick: worldCupFan.pick,
      pickLabel: worldCupPickText(),
      createdAt: new Date().toISOString()
    };
    saveWorldCupPool(pool);
    updateWorldCupFanLab();
  }

  function demoSettleWorldCupPrediction() {
    const pool = readWorldCupPool();
    const today = todayKey();
    if (!pool.days?.[today] || pool.days[today].result) return;
    const score = Array.from(`${today}:${pool.days[today].team}:${pool.days[today].pick}`).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const correct = score % 3 !== 0;
    pool.days[today] = {
      ...pool.days[today],
      result: correct ? 'correct' : 'miss',
      correct,
      settledAt: new Date().toISOString()
    };
    saveWorldCupPool(pool);
    updateWorldCupFanLab();
  }

  function renderWorldCupPool() {
    const pool = readWorldCupPool();
    const stats = poolStats(pool);
    const today = todayKey();
    const todayEntry = pool.days?.[today];
    const team = worldCupTeam();
    const lockedText = todayEntry
      ? `Locked today: ${todayEntry.teamName} · ${todayEntry.pickLabel}`
      : `Today's pick: ${team.name} · ${worldCupPickText()}`;
    return `
      <section class="wc-pool-card" aria-label="Daily prediction pool">
        <div class="wc-pool-head">
          <span>DAILY PREDICTION POOL</span>
          <strong>${stats.eligible ? 'Qualified' : 'Build your streak'}</strong>
        </div>
        <p>${lockedText}</p>
        <div class="wc-pool-stats">
          <div><span>Streak</span><strong>${stats.streak}</strong><em>days</em></div>
          <div><span>Accuracy</span><strong>${stats.accuracy}%</strong><em>${stats.correct}/${Math.max(stats.settled, 1)}</em></div>
          <div><span>Pool share</span><strong>${stats.shareUnits}</strong><em>test pts</em></div>
        </div>
        <div class="wc-pool-meter"><i style="width:${Math.min(100, stats.streak / 7 * 100)}%"></i></div>
        <div class="wc-pool-actions">
          <button class="quiz-primary buttonlike" type="button" data-wc-lock-prediction ${todayEntry ? 'disabled' : ''}>${todayEntry ? 'Prediction locked' : "Lock today's prediction"}</button>
          <button class="quiz-ghost buttonlike" type="button" data-wc-demo-settle ${todayEntry?.result ? 'disabled' : ''}>Demo settle</button>
          <button class="quiz-ghost buttonlike" type="button" data-wc-share-streak>Share streak</button>
        </div>
        <small>Test rules: 3+ prediction days and 50%+ settled accuracy unlock prize-pool eligibility. No purchase, betting, or real prize is active in this prototype.</small>
      </section>
    `;
  }

  function renderWorldCupFanLab() {
    if (!isWorldCupQuiz) return '';
    const team = worldCupTeam();
    return `
      <section class="wc-fan-lab" aria-label="World Cup supporter avatar lab">
        <div class="wc-fan-preview">
          <canvas id="wc-avatar-canvas" width="720" height="720" aria-label="Generated supporter avatar"></canvas>
        </div>
        <div class="wc-fan-controls">
          <span>SUPPORTER AVATAR LAB</span>
          <h3>Make today’s fan avatar.</h3>
          <p>Pick a team, lock a prediction, then share the avatar and streak.</p>
          <label class="wc-upload buttonlike">
            Choose avatar
            <input id="wc-avatar-input" type="file" accept="image/*" />
          </label>
          <div class="wc-team-picker" role="group" aria-label="Pick your team">
            ${WC_TEAMS.map((item) => `<button class="buttonlike ${item.id === team.id ? 'selected' : ''}" type="button" data-wc-team="${item.id}"><b>${item.flag}</b><span>${item.name}</span></button>`).join('')}
          </div>
          <div class="wc-pick-picker" role="group" aria-label="Pick your prediction">
            ${[
              ['win', 'Win today'],
              ['upset', 'Upset agenda'],
              ['chaos', 'Chaos match']
            ].map(([id, label]) => `<button class="buttonlike ${worldCupFan.pick === id ? 'selected' : ''}" type="button" data-wc-pick="${id}">${label}</button>`).join('')}
          </div>
          <textarea id="wc-post-copy" readonly aria-label="Prediction post copy">${escapeHTML(worldCupPostText())}</textarea>
          <div class="wc-fan-actions">
            <button class="quiz-primary buttonlike" type="button" data-wc-share>Share my pick</button>
            <button class="quiz-ghost buttonlike" type="button" data-wc-download>Save profile pic</button>
            <button class="quiz-ghost buttonlike" type="button" data-wc-copy>Copy post</button>
          </div>
          ${renderWorldCupPool()}
        </div>
      </section>
    `;
  }

  function drawWorldCupAvatar() {
    if (!isWorldCupQuiz) return;
    const canvas = document.querySelector('#wc-avatar-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const team = worldCupTeam();
    const [primary, secondary] = team.colors;
    const drawBase = () => {
      const gradient = ctx.createLinearGradient(0, 0, 720, 720);
      gradient.addColorStop(0, primary);
      gradient.addColorStop(.56, '#07111f');
      gradient.addColorStop(1, secondary);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 720, 720);
      ctx.fillStyle = 'rgba(255,255,255,.08)';
      for (let x = -160; x < 820; x += 90) {
        ctx.fillRect(x, 0, 34, 720);
      }
      ctx.strokeStyle = 'rgba(255,255,255,.36)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(360, 360, 135, 0, Math.PI * 2);
      ctx.moveTo(360, 0);
      ctx.lineTo(360, 720);
      ctx.stroke();
      ctx.fillStyle = 'rgba(2,6,23,.72)';
      ctx.roundRect(50, 50, 620, 620, 42);
      ctx.fill();
      ctx.strokeStyle = 'rgba(250,204,21,.68)';
      ctx.lineWidth = 5;
      ctx.stroke();
    };
    const drawFrame = () => {
      ctx.fillStyle = '#facc15';
      ctx.roundRect(80, 80, 255, 58, 29);
      ctx.fill();
      ctx.fillStyle = '#07111f';
      ctx.font = '900 27px Arial, sans-serif';
      ctx.fillText('BACKING', 112, 119);
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 78px Arial, sans-serif';
      ctx.fillText(team.name.toUpperCase(), 82, 575);
      ctx.font = '900 32px Arial, sans-serif';
      ctx.fillStyle = '#dbeafe';
      ctx.fillText(worldCupPickText(), 82, 624);
      ctx.font = '900 82px Arial, sans-serif';
      ctx.fillText(team.flag, 550, 140);
      ctx.fillStyle = 'rgba(34,211,238,.9)';
      ctx.font = '900 26px Arial, sans-serif';
      ctx.fillText('89GAMESHUB', 82, 666);
    };
    const drawAvatarFallback = () => {
      ctx.fillStyle = 'rgba(255,255,255,.12)';
      ctx.beginPath();
      ctx.arc(360, 330, 145, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 78px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FAN', 360, 355);
      ctx.textAlign = 'left';
    };
    drawBase();
    if (!worldCupFan.photo) {
      drawAvatarFallback();
      drawFrame();
      return;
    }
    const image = new Image();
    image.onload = () => {
      drawBase();
      ctx.save();
      ctx.beginPath();
      ctx.arc(360, 330, 150, 0, Math.PI * 2);
      ctx.clip();
      const scale = Math.max(300 / image.width, 300 / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      ctx.drawImage(image, 360 - width / 2, 330 - height / 2, width, height);
      ctx.restore();
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(360, 330, 155, 0, Math.PI * 2);
      ctx.stroke();
      drawFrame();
    };
    image.src = worldCupFan.photo;
  }

  function updateWorldCupFanLab() {
    if (!isWorldCupQuiz) return;
    const post = document.querySelector('#wc-post-copy');
    if (post) post.value = worldCupPostText();
    document.querySelectorAll('[data-wc-team]').forEach((node) => node.classList.toggle('selected', node.dataset.wcTeam === worldCupFan.team));
    document.querySelectorAll('[data-wc-pick]').forEach((node) => node.classList.toggle('selected', node.dataset.wcPick === worldCupFan.pick));
    const poolCard = document.querySelector('.wc-pool-card');
    if (poolCard) poolCard.outerHTML = renderWorldCupPool();
    drawWorldCupAvatar();
  }

  function downloadWorldCupAvatar(trigger) {
    const canvas = document.querySelector('#wc-avatar-canvas');
    if (!canvas) return;
    const filename = `world-cup-${worldCupTeam().name.toLowerCase()}-supporter-avatar.png`;
    const fallbackOpen = () => {
      const dataUrl = canvas.toDataURL('image/png');
      const opened = window.open(dataUrl, '_blank', 'noopener');
      if (!opened) {
        const anchor = document.createElement('a');
        anchor.href = dataUrl;
        anchor.target = '_blank';
        anchor.rel = 'noopener';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }
    };
    if (!canvas.toBlob) {
      fallbackOpen();
      return;
    }
    canvas.toBlob((blob) => {
      if (!blob) {
        fallbackOpen();
        return;
      }
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1200);
      if (trigger) trigger.textContent = 'Saved profile pic';
    }, 'image/png');
  }

  function renderProfileStep() {
    if (!shared.quizNeedsProfile(quiz)) return '';
    const lang = shared.getLang();
    const contexts = crushContexts();
    if (!contexts.includes(profile.context)) profile.context = contexts[3] || contexts[0];
    return `
      <section class="quiz-crush-profile" id="quiz-crush-profile">
        <div class="quiz-crush-preview ${profile.photo ? 'has-photo' : ''}">
          ${profile.photo ? `<img src="${profile.photo}" alt="" />` : `<span>${lang === 'zh' ? 'TA' : '??'}</span>`}
        </div>
        <div class="quiz-crush-fields">
          <div class="quiz-crush-scan-label">${lang === 'zh' ? 'Crush Scanner' : 'Crush Scanner'}</div>
          <h2>${lang === 'zh' ? '输入名字，开始检测' : 'Drop the name. Let the group chat energy begin.'}</h2>
          <label>
            ${lang === 'zh' ? 'TA 的名字或昵称' : "Their name or nickname"}
            <input id="crush-name-input" type="text" maxlength="28" autocomplete="off" placeholder="${lang === 'zh' ? '比如 Alex / 小林 / 那个人' : 'Alex / Maya / that one person'}" value="${escapeHTML(profile.name)}" />
          </label>
          <label class="quiz-photo-input">
            <span>${lang === 'zh' ? '可选：上传照片做结果卡' : 'Optional: add a photo for the result card'}</span>
            <b>${lang === 'zh' ? 'Choose photo' : 'Choose photo'}</b>
            <em id="crush-photo-name">${profile.photo ? 'Photo selected' : 'No photo selected'}</em>
            <input id="crush-photo-input" type="file" accept="image/*" />
          </label>
          <div class="quiz-crush-context" role="group" aria-label="${lang === 'zh' ? '关系状态' : 'Relationship context'}">
            <span>${lang === 'zh' ? '你们现在像什么？' : 'What are they to you?'}</span>
            <div>
              ${contexts.map((context) => `<button class="buttonlike ${context === profile.context ? 'selected' : ''}" type="button" data-crush-context="${escapeHTML(context)}">${escapeHTML(context)}</button>`).join('')}
            </div>
          </div>
          <p>${lang === 'zh' ? '照片只在你的浏览器本地预览，不会上传；结果是娱乐测试，不做人脸识别。' : 'The photo previews locally in your browser only. No upload, no face recognition, just a fun result card.'}</p>
          <button class="quiz-primary buttonlike" type="button" id="crush-start-button">${lang === 'zh' ? '开始扫描' : 'Start scan'}</button>
        </div>
      </section>
    `;
  }

  function renderHeader() {
    document.documentElement.lang = shared.getLang() === 'zh' ? 'zh-CN' : 'en';
    document.body.classList.toggle('quiz-love-detail', quiz.category === 'love');
    document.body.classList.toggle('quiz-crush-detail', quiz.id === 'crush-name-scanner');
    document.body.classList.toggle('quiz-world-cup-detail', quiz.id === 'world-cup-match-predictor');
    $('#quiz-detail-lang').textContent = shared.getLang() === 'zh' ? 'EN' : '中文';
    $('#quiz-detail-format').textContent = shared.quizMeta(quiz);
    $('#quiz-detail-title').textContent = title();
    $('#quiz-detail-copy').textContent = shared.quizDetailCopy(quiz);
    $('#related-title').textContent = shared.getLang() === 'zh' ? '相关测验' : 'Related quizzes';
    updateScoreCard();
    renderRelated();
    if (window.ArcadeHubSEO) {
      window.ArcadeHubSEO.update({
        title: `${title()} - Arcadequiz`,
        description: $('#quiz-detail-copy').textContent,
        image: 'external-assets/brand/og-arcade-hub.svg',
        canonical: location.href
      });
    }
  }

  function renderRelated() {
    const related = shared.QUIZZES
      .filter((item) => item.id !== quiz.id && item.category === quiz.category)
      .slice(0, 4);
    $('#quiz-related-list').innerHTML = related.map((item) => `
      <a href="${shared.quizUrl(item)}">
        <strong>${shared.localQuizTitle(item)}</strong>
        <span>${shared.quizMeta(item)}</span>
      </a>
    `).join('');
  }

  function resetQuiz() {
    questions = shared.buildQuestions(quiz);
    questionIndex = 0;
    answers = [];
    isAnswering = false;
    clearRun();
    $('#quiz-detail-result').hidden = true;
    $('#quiz-detail-question').hidden = false;
    $('#quiz-detail-progress-label').hidden = shared.quizNeedsProfile(quiz) && !profile.name.trim();
    $('#quiz-detail-progress-bar').parentElement.hidden = shared.quizNeedsProfile(quiz) && !profile.name.trim();
    renderQuestion();
  }

  function restoreQuiz() {
    questions = shared.buildQuestions(quiz);
    const run = readRun();
    const step = Number(params.get('step'));
    if (run && (!shared.quizNeedsProfile(quiz) || run.profile?.name)) {
      profile = { ...profile, ...(run.profile || {}) };
      answers = Array.isArray(run.answers) ? run.answers : [];
      questionIndex = Number.isFinite(step)
        ? Math.min(Math.max(step, 0), questions.length)
        : Math.min(Math.max(Number(run.questionIndex) || answers.length, 0), questions.length);
      $('#quiz-detail-result').hidden = true;
      $('#quiz-detail-question').hidden = false;
      $('#quiz-detail-progress-label').hidden = false;
      $('#quiz-detail-progress-bar').parentElement.hidden = false;
      if (questionIndex >= questions.length) {
        questionIndex = questions.length - 1;
      }
      renderQuestion();
      return;
    }
    resetQuiz();
  }

  function renderQuestion() {
    if (shared.quizNeedsProfile(quiz) && !profile.name.trim()) {
      $('#quiz-detail-question').innerHTML = renderProfileStep();
      setQuestionAdVisible(true);
      setResultAdVisible(false);
      return;
    }
    const current = questions[questionIndex];
    const percent = Math.round(((questionIndex + 1) / questions.length) * 100);
    $('#quiz-detail-progress-label').textContent = shared.quizNeedsProfile(quiz)
      ? `${current.vibe || 'Signal scan'} · ${percent}%`
      : `${text().q}${shared.getLang() === 'zh' ? '' : ' '}${questionIndex + 1} ${text().of} ${questions.length}`;
    $('#quiz-detail-progress-label').hidden = false;
    $('#quiz-detail-progress-bar').parentElement.hidden = false;
    $('#quiz-detail-progress-bar').style.width = `${(questionIndex / questions.length) * 100}%`;
    const questionText = escapeHTML(shared.personalizeText(current.text, profileName()));
    const optionIcon = (trait) => ({ spark: '🚨', analyst: '📊', connector: '🙌', strategist: '🧠', goal: '⚽' }[trait] || '🏆');
    const optionTag = (trait) => ({
      spark: shared.getLang() === 'zh' ? '爆冷' : 'upset',
      analyst: shared.getLang() === 'zh' ? '证据' : 'receipt',
      connector: shared.getLang() === 'zh' ? '气氛' : 'vibes',
      strategist: shared.getLang() === 'zh' ? '战术' : 'tactics',
      goal: shared.getLang() === 'zh' ? '进球' : 'goals'
    }[trait] || '');
    const worldCupBoard = isWorldCupQuiz ? `
      <div class="wc-quiz-board" aria-label="World Cup prediction board">
        <div><span>FAN XI</span><strong>${answers.length}</strong></div>
        <b>${shared.getLang() === 'zh' ? '第' : 'Q'} ${questionIndex + 1}/${questions.length}</b>
        <div><span>CHAOS</span><strong>${questions.length - questionIndex}</strong></div>
      </div>
      <div class="wc-quiz-ticker">
        <span>LIVE</span>
        <p>${shared.getLang() === 'zh' ? '群聊预测室已开启：选一个能截图、能吵架、能传播的答案。' : 'Group-chat prediction room is live: pick the answer worth screenshotting.'}</p>
      </div>
    ` : '';
    $('#quiz-detail-question').innerHTML = `
      ${renderWorldCupFanLab()}
      ${worldCupBoard}
      ${current.vibe ? `<div class="quiz-question-kicker">${current.vibe}</div>` : ''}
      <h3>${questionText}</h3>
      <div class="quiz-options">
        ${current.options.map((option, index) => `<button class="buttonlike ${isWorldCupQuiz ? 'wc-option' : ''}" type="button" data-detail-answer="${index}">${isWorldCupQuiz ? `<span class="wc-option-icon">${optionIcon(option.trait)}</span><span>${escapeHTML(option.label)}</span><em>${escapeHTML(optionTag(option.trait))}</em>` : escapeHTML(option.label)}</button>`).join('')}
      </div>
      <div class="quiz-answer-reaction" aria-live="polite"></div>
    `;
    updateWorldCupFanLab();
    setQuestionAdVisible(true);
    setResultAdVisible(false);
  }

  function chooseAnswer(index, button) {
    if (isAnswering) return;
    const selected = questions[questionIndex].options[index];
    isAnswering = true;
    answers.push(selected);
    document.querySelectorAll('.quiz-options button').forEach((node) => { node.disabled = true; });
    if (button) button.classList.add('selected');
    const reaction = document.querySelector('.quiz-answer-reaction');
    if (reaction) reaction.textContent = shared.answerReaction?.(quiz, selected.trait) || '';
    window.setTimeout(() => {
      questionIndex += 1;
      isAnswering = false;
      saveRun(questionIndex);
      if (questionIndex >= questions.length) showResult();
      else location.href = questionUrl(questionIndex);
    }, quiz.category === 'sports' ? 720 : (quiz.category === 'love' ? 620 : 160));
  }

  function resultMetrics(traits, score) {
    const total = Math.max(answers.length, 1);
    const spark = traits.spark || 0;
    const analyst = traits.analyst || 0;
    const connector = traits.connector || 0;
    const strategist = traits.strategist || 0;
    return {
      crush: Math.min(99, 42 + spark * 11 + connector * 8 + score * 3),
      delusion: Math.min(99, 28 + spark * 12 + analyst * 7 + Math.max(0, total - score) * 4),
      bestie: Math.min(99, 35 + connector * 10 + analyst * 7 + spark * 5),
      clarity: Math.min(99, 30 + strategist * 12 + analyst * 8 + score * 2)
    };
  }

  function showScanningState() {
    const lang = shared.getLang();
    $('#quiz-detail-progress-bar').style.width = '100%';
    $('#quiz-detail-question').hidden = true;
    $('#quiz-detail-result').hidden = false;
    setQuestionAdVisible(false);
    setResultAdVisible(false);
    if (isWorldCupQuiz) {
      $('#quiz-detail-result').innerHTML = `
        <div class="quiz-scan-card wc-scan-card" aria-live="polite">
          <span>${lang === 'zh' ? '预测生成中' : 'Prediction loading'}</span>
          <h3>${lang === 'zh' ? '正在检查 VAR、群聊火药味和爆冷概率...' : 'Checking VAR drama, group chat heat, and upset probability...'}</h3>
          <div class="quiz-scan-lines">
            <i>${lang === 'zh' ? '读取球迷直觉' : 'Reading fan instinct'}</i>
            <i>${lang === 'zh' ? '模拟 90+ 分钟反转' : 'Simulating 90+ minute chaos'}</i>
            <i>${lang === 'zh' ? '生成可截图预测人设' : 'Building screenshot-ready prediction persona'}</i>
          </div>
        </div>
      `;
      return;
    }
    $('#quiz-detail-result').innerHTML = `
      <div class="quiz-scan-card" aria-live="polite">
        <span>${lang === 'zh' ? '扫描中' : 'Scanning'}</span>
        <h3>${lang === 'zh' ? '正在咨询群聊能量...' : 'Consulting the group chat energy...'}</h3>
        <div class="quiz-scan-lines">
          <i>${lang === 'zh' ? '读取通知反应' : 'Reading notification behavior'}</i>
          <i>${lang === 'zh' ? '检查脑补风险' : 'Checking delusion risk'}</i>
          <i>${lang === 'zh' ? '生成可截图结果卡' : 'Building screenshot-worthy result'}</i>
        </div>
      </div>
    `;
  }

  function showResult() {
    showScanningState();
    window.setTimeout(renderResult, shared.quizNeedsProfile(quiz) ? 760 : 120);
  }

  function renderResult() {
    const score = answers.filter((answer) => answer.correct).length;
    const traits = answers.reduce((memo, answer) => {
      memo[answer.trait] = (memo[answer.trait] || 0) + 1;
      return memo;
    }, {});
    const topTrait = Object.entries(traits).sort((a, b) => b[1] - a[1])[0]?.[0] || 'spark';
    const result = shared.quizResult(quiz, topTrait);
    const resultTitle = escapeHTML(shared.personalizeText(result[0], profileName()));
    const resultCopy = escapeHTML(shared.personalizeText(result[1], profileName()));
    const reward = quiz.points + score * 10;
    const state = shared.updateProgress(reward);
    const link = quizLink();
    const share = `${shared.quizShareCopy(quiz, result, reward, profileName())} Take the scan: ${link}`;
    const metrics = resultMetrics(traits, score);
    const qr = qrCodeUrl(link);
    const profileCard = shared.quizNeedsProfile(quiz) ? `
      <div class="quiz-crush-result-card">
        <div class="quiz-crush-preview ${profile.photo ? 'has-photo' : ''}">
          ${profile.photo ? `<img src="${profile.photo}" alt="" />` : `<span>${escapeHTML(profileName().slice(0, 2).toUpperCase())}</span>`}
        </div>
        <div>
          <span>${shared.getLang() === 'zh' ? 'Crush 扫描对象' : 'Crush scan target'}</span>
          <strong>${escapeHTML(profileName())}</strong>
          <em>${escapeHTML(profile.context)}</em>
        </div>
      </div>
    ` : '';
    const metricCard = shared.quizNeedsProfile(quiz) ? `
      <div class="quiz-crush-metrics">
        <div><span>Crush Level</span><strong>${metrics.crush}%</strong></div>
        <div><span>Delusion Risk</span><strong>${metrics.delusion}%</strong></div>
        <div><span>Bestie Alarm</span><strong>${metrics.bestie}%</strong></div>
        <div><span>Clarity Shield</span><strong>${metrics.clarity}%</strong></div>
      </div>
    ` : '';
    const worldCupStats = isWorldCupQuiz ? {
      upset: Math.min(99, 30 + (traits.spark || 0) * 13 + (traits.goal || 0) * 6),
      receipt: Math.min(99, 34 + (traits.analyst || 0) * 14 + (traits.strategist || 0) * 9),
      chaos: Math.min(99, 40 + (traits.goal || 0) * 12 + (traits.connector || 0) * 7),
      varDrama: Math.min(99, 25 + (traits.strategist || 0) * 13 + (traits.spark || 0) * 7)
    } : null;
    const worldCupShareCard = isWorldCupQuiz ? `
      <section class="quiz-share-card wc-share-card" id="quiz-share-card" aria-label="Shareable World Cup prediction card">
        <div class="quiz-share-card-top">
          <span>ARCADEQUIZ WORLD CUP LAB</span>
          <b>Screenshot this</b>
        </div>
        <div class="wc-result-scoreline">
          <div><span>FAN XI</span><strong>${worldCupStats.receipt}</strong></div>
          <b>VS</b>
          <div><span>CHAOS</span><strong>${worldCupStats.chaos}</strong></div>
        </div>
        <h2>${resultTitle}</h2>
        <p>${resultCopy}</p>
        <div class="quiz-share-card-stats">
          <div><span>Upset</span><strong>${worldCupStats.upset}%</strong></div>
          <div><span>Receipts</span><strong>${worldCupStats.receipt}%</strong></div>
          <div><span>VAR Drama</span><strong>${worldCupStats.varDrama}%</strong></div>
        </div>
        <div class="quiz-share-card-footer">
          <div>
            <span>Predict yours</span>
            <strong>89gameshub.com</strong>
          </div>
          <img src="${qr}" alt="QR code for this quiz" crossorigin="anonymous" />
        </div>
      </section>
    ` : '';
    const shareCard = shared.quizNeedsProfile(quiz) ? `
      <section class="quiz-share-card" id="quiz-share-card" aria-label="Shareable result card">
        <div class="quiz-share-card-top">
          <span>ARCADEQUIZ CRUSH SCAN</span>
          <b>Screenshot this</b>
        </div>
        <div class="quiz-share-card-person">
          <div class="quiz-crush-preview ${profile.photo ? 'has-photo' : ''}">
            ${profile.photo ? `<img src="${profile.photo}" alt="" />` : `<span>${escapeHTML(profileName().slice(0, 2).toUpperCase())}</span>`}
          </div>
          <div>
            <small>${escapeHTML(profile.context)}</small>
            <strong>${escapeHTML(profileName())}</strong>
          </div>
        </div>
        <h2>${resultTitle}</h2>
        <p>${resultCopy}</p>
        <div class="quiz-share-card-stats">
          <div><span>Crush</span><strong>${metrics.crush}%</strong></div>
          <div><span>Delusion</span><strong>${metrics.delusion}%</strong></div>
          <div><span>Bestie</span><strong>${metrics.bestie}%</strong></div>
        </div>
        <div class="quiz-share-card-footer">
          <div>
            <span>Scan yours</span>
            <strong>89gameshub.com</strong>
          </div>
          <img src="${qr}" alt="QR code for this quiz" crossorigin="anonymous" />
        </div>
      </section>
    ` : '';
    updateScoreCard(state);
    $('#quiz-detail-progress-bar').style.width = '100%';
    $('#quiz-detail-question').hidden = true;
    $('#quiz-detail-result').hidden = false;
    setQuestionAdVisible(false);
    setResultAdVisible(shared.quizNeedsProfile(quiz));
    $('#quiz-detail-result').innerHTML = `
      ${worldCupShareCard || shareCard || `<span>${text().result}</span>`}
      <div class="quiz-result-analysis">
        <span>${shared.quizNeedsProfile(quiz) ? 'Why you got this' : text().result}</span>
        ${profileCard}
        <h3>${resultTitle}</h3>
        <p>${resultCopy}</p>
        ${metricCard}
        ${isWorldCupQuiz ? `<div class="wc-result-memes"><span>🚨 ${shared.getLang() === 'zh' ? '爆冷警报' : 'upset alarm'}</span><span>📺 VAR court</span><span>💬 group chat receipts</span></div>` : ''}
      </div>
      <div class="quiz-share-badge">${quiz.category === 'love' ? (shared.getLang() === 'zh' ? '适合发给朋友复盘' : 'Send this to your bestie') : title()}</div>
      <div class="quiz-reward">+${reward} ${text().points} · ${score}/${questions.length}</div>
      <label>${text().share}<textarea readonly>${escapeHTML(share)}</textarea></label>
      <div class="quiz-result-actions">
        ${(shared.quizNeedsProfile(quiz) || isWorldCupQuiz) ? '<button class="quiz-primary buttonlike" type="button" data-share-result>Share result</button><button class="quiz-ghost buttonlike" type="button" data-copy-link>Copy quiz link</button>' : ''}
        ${shared.quizNeedsProfile(quiz) ? '<button class="quiz-ghost buttonlike" type="button" data-download-card>Download card</button>' : ''}
        <button class="quiz-primary buttonlike" type="button" id="quiz-detail-again">${shared.quizNeedsProfile(quiz) ? 'Scan another person' : text().again}</button>
        <button class="quiz-ghost buttonlike" type="button" data-detail-copy-share>${shared.getLang() === 'zh' ? '复制分享文案' : 'Copy share text'}</button>
        <a class="quiz-ghost buttonlike" href="arcadequiz.html">${shared.getLang() === 'zh' ? '返回题库' : 'Back to feed'}</a>
      </div>
    `;
  }

  function downloadShareCard() {
    const card = document.querySelector('#quiz-share-card');
    if (!card) return;
    const titleText = card.querySelector('h2')?.textContent || title();
    const bodyText = card.querySelector('p')?.textContent || '';
    const target = profileName();
    const link = quizLink();
    const qr = qrCodeUrl(link);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#fb7185"/>
          <stop offset=".52" stop-color="#7c5cff"/>
          <stop offset="1" stop-color="#22d3ee"/>
        </linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="28" stdDeviation="30" flood-opacity=".32"/></filter>
      </defs>
      <rect width="1080" height="1350" rx="70" fill="#070b18"/>
      <rect x="54" y="54" width="972" height="1242" rx="56" fill="url(#bg)" filter="url(#shadow)"/>
      <rect x="92" y="92" width="896" height="1166" rx="42" fill="rgba(7,11,24,.68)" stroke="rgba(255,255,255,.28)"/>
      <text x="132" y="170" fill="#67e8f9" font-family="Arial, sans-serif" font-size="34" font-weight="900">ARCADEQUIZ CRUSH SCAN</text>
      <text x="132" y="286" fill="#ffffff" font-family="Arial, sans-serif" font-size="56" font-weight="900">${escapeHTML(target)}</text>
      <text x="132" y="344" fill="#dbeafe" font-family="Arial, sans-serif" font-size="34" font-weight="700">${escapeHTML(profile.context)}</text>
      <text x="132" y="505" fill="#ffffff" font-family="Arial, sans-serif" font-size="84" font-weight="900">${escapeHTML(titleText)}</text>
      <foreignObject x="132" y="555" width="816" height="190">
        <div xmlns="http://www.w3.org/1999/xhtml" style="color:#eef2ff;font:700 34px Arial,sans-serif;line-height:1.28;">${escapeHTML(bodyText)}</div>
      </foreignObject>
      <rect x="132" y="802" width="244" height="150" rx="28" fill="rgba(255,255,255,.13)" stroke="rgba(255,255,255,.22)"/>
      <text x="162" y="860" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="28" font-weight="900">CRUSH</text>
      <text x="162" y="925" fill="#ffffff" font-family="Arial, sans-serif" font-size="58" font-weight="900">${card.querySelector('.quiz-share-card-stats div:nth-child(1) strong')?.textContent || ''}</text>
      <rect x="418" y="802" width="244" height="150" rx="28" fill="rgba(255,255,255,.13)" stroke="rgba(255,255,255,.22)"/>
      <text x="448" y="860" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="28" font-weight="900">DELUSION</text>
      <text x="448" y="925" fill="#ffffff" font-family="Arial, sans-serif" font-size="58" font-weight="900">${card.querySelector('.quiz-share-card-stats div:nth-child(2) strong')?.textContent || ''}</text>
      <rect x="704" y="802" width="244" height="150" rx="28" fill="rgba(255,255,255,.13)" stroke="rgba(255,255,255,.22)"/>
      <text x="734" y="860" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="28" font-weight="900">BESTIE</text>
      <text x="734" y="925" fill="#ffffff" font-family="Arial, sans-serif" font-size="58" font-weight="900">${card.querySelector('.quiz-share-card-stats div:nth-child(3) strong')?.textContent || ''}</text>
      <text x="132" y="1112" fill="#ffffff" font-family="Arial, sans-serif" font-size="38" font-weight="900">Scan yours at 89gameshub.com</text>
      <text x="132" y="1164" fill="#dbeafe" font-family="Arial, sans-serif" font-size="26">${escapeHTML(link)}</text>
      <image href="${escapeAttr(qr)}" x="800" y="1058" width="148" height="148"/>
    </svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `crush-scan-${profileName().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'result'}.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  document.addEventListener('click', (event) => {
    const answer = event.target.closest('[data-detail-answer]');
    if (answer) chooseAnswer(Number(answer.dataset.detailAnswer), answer);
    const contextButton = event.target.closest('[data-crush-context]');
    if (contextButton) {
      profile.context = contextButton.dataset.crushContext;
      document.querySelectorAll('[data-crush-context]').forEach((node) => node.classList.toggle('selected', node === contextButton));
      saveRun(questionIndex);
    }
    if (event.target.id === 'crush-start-button') {
      const input = document.querySelector('#crush-name-input');
      profile.name = input?.value.trim() || shared.profileFallbackName();
      questions = shared.buildQuestions(quiz);
      questionIndex = 0;
      answers = [];
      saveRun(0);
      location.href = questionUrl(0);
    }
    const photoInput = event.target.closest('#crush-photo-input');
    if (photoInput) photoInput.value = '';
    const copyShare = event.target.closest('[data-detail-copy-share]');
    if (copyShare) {
      const textarea = document.querySelector('#quiz-detail-result textarea');
      if (textarea) {
        navigator.clipboard?.writeText(textarea.value);
        textarea.select();
        copyShare.textContent = shared.getLang() === 'zh' ? '已复制' : 'Copied';
      }
    }
    const copyLink = event.target.closest('[data-copy-link]');
    if (copyLink) {
      navigator.clipboard?.writeText(quizLink());
      copyLink.textContent = 'Link copied';
    }
    const shareResult = event.target.closest('[data-share-result]');
    if (shareResult) {
      const textarea = document.querySelector('#quiz-detail-result textarea');
      const shareText = textarea?.value || title();
      if (navigator.share) {
        navigator.share({ title: title(), text: shareText, url: quizLink() }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(shareText);
        shareResult.textContent = 'Copied share text';
      }
    }
    if (event.target.closest('[data-download-card]')) downloadShareCard();
    const wcTeamButton = event.target.closest('[data-wc-team]');
    if (wcTeamButton) {
      worldCupFan.team = wcTeamButton.dataset.wcTeam;
      saveWorldCupFan();
      updateWorldCupFanLab();
    }
    const wcPickButton = event.target.closest('[data-wc-pick]');
    if (wcPickButton) {
      worldCupFan.pick = wcPickButton.dataset.wcPick;
      saveWorldCupFan();
      updateWorldCupFanLab();
    }
    const wcDownloadButton = event.target.closest('[data-wc-download]');
    if (wcDownloadButton) downloadWorldCupAvatar(wcDownloadButton);
    if (event.target.closest('[data-wc-copy]')) {
      navigator.clipboard?.writeText(worldCupPostText());
      event.target.closest('[data-wc-copy]').textContent = 'Copied post';
    }
    if (event.target.closest('[data-wc-share]')) {
      const postText = worldCupPostText();
      if (navigator.share) {
        navigator.share({ title: 'World Cup prediction', text: postText, url: quizLink() }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(postText);
        event.target.closest('[data-wc-share]').textContent = 'Copied post';
      }
    }
    if (event.target.closest('[data-wc-lock-prediction]')) lockWorldCupPrediction();
    if (event.target.closest('[data-wc-demo-settle]')) demoSettleWorldCupPrediction();
    if (event.target.closest('[data-wc-share-streak]')) {
      const streakText = worldCupStreakText();
      if (navigator.share) {
        navigator.share({ title: 'World Cup prediction streak', text: streakText, url: quizLink() }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(streakText);
        event.target.closest('[data-wc-share-streak]').textContent = 'Copied streak';
      }
    }
    if (event.target.id === 'quiz-detail-again') {
      if (shared.quizNeedsProfile(quiz)) {
        profile.name = '';
        profile.photo = '';
      }
      resetQuiz();
      history.replaceState(null, '', `${location.pathname}?id=${encodeURIComponent(quiz.id)}`);
    }
  });
  document.addEventListener('input', (event) => {
    if (event.target.id === 'crush-name-input') {
      profile.name = event.target.value;
      saveRun(questionIndex);
    }
  });
  document.addEventListener('change', (event) => {
    if (event.target.id === 'wc-avatar-input') {
      const file = event.target.files?.[0];
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        worldCupFan.photo = reader.result;
        saveWorldCupFan();
        updateWorldCupFanLab();
      });
      reader.readAsDataURL(file);
    }
    if (event.target.id === 'crush-photo-input') {
      const file = event.target.files?.[0];
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        profile.photo = reader.result;
        const preview = document.querySelector('.quiz-crush-preview');
        if (preview) {
          preview.classList.add('has-photo');
          preview.innerHTML = `<img src="${profile.photo}" alt="" />`;
        }
        const fileName = document.querySelector('#crush-photo-name');
        if (fileName) fileName.textContent = file.name || 'Photo selected';
        saveRun(questionIndex);
      });
      reader.readAsDataURL(file);
    }
  });
  $('#quiz-detail-lang').addEventListener('click', () => {
    shared.setLang(shared.getLang() === 'zh' ? 'en' : 'zh');
    renderHeader();
    resetQuiz();
  });

  setDetailUrl();
  renderHeader();
  restoreQuiz();
})();
