(function () {
  const shared = window.ArcadequizShared;
  if (!shared) return;

  const params = new URLSearchParams(location.search);
  const quiz = shared.QUIZZES.find((item) => item.id === params.get('id')) || shared.QUIZZES[0];
  let questions = [];
  let questionIndex = 0;
  let answers = [];
  let isAnswering = false;
  let profile = {
    name: '',
    photo: ''
  };

  const $ = (selector) => document.querySelector(selector);
  const text = () => shared.text();
  const title = () => shared.localQuizTitle(quiz);

  function setDetailUrl() {
    const cleanUrl = `${location.pathname}?id=${encodeURIComponent(quiz.id)}`;
    if (!params.get('id')) history.replaceState(null, '', cleanUrl);
  }

  function updateScoreCard(state = shared.getState()) {
    $('#detail-score').textContent = state.score;
    $('#detail-streak').textContent = state.streak;
    $('#detail-completed').textContent = state.completed;
    $('#detail-score-label').textContent = text().score;
    $('#detail-streak-label').textContent = text().streak;
    $('#detail-completed-label').textContent = text().completed;
  }

  function profileName() {
    return profile.name.trim() || shared.profileFallbackName();
  }

  function renderProfileStep() {
    if (!shared.quizNeedsProfile(quiz)) return '';
    const lang = shared.getLang();
    return `
      <section class="quiz-crush-profile" id="quiz-crush-profile">
        <div class="quiz-crush-preview ${profile.photo ? 'has-photo' : ''}">
          ${profile.photo ? `<img src="${profile.photo}" alt="" />` : `<span>${lang === 'zh' ? 'TA' : '??'}</span>`}
        </div>
        <div class="quiz-crush-fields">
          <label>
            ${lang === 'zh' ? 'TA 的名字或昵称' : "Their name or nickname"}
            <input id="crush-name-input" type="text" maxlength="28" autocomplete="off" placeholder="${lang === 'zh' ? '比如 Alex / 小林 / 那个人' : 'Alex / Maya / that one person'}" value="${profile.name.replaceAll('"', '&quot;')}" />
          </label>
          <label class="quiz-photo-input">
            ${lang === 'zh' ? '可选：上传照片做结果卡' : 'Optional: add a photo for the result card'}
            <input id="crush-photo-input" type="file" accept="image/*" />
          </label>
          <p>${lang === 'zh' ? '照片只在你的浏览器本地预览，不会上传；结果是娱乐测试，不做人脸识别。' : 'The photo previews locally in your browser only. No upload, no face recognition, just a fun result card.'}</p>
          <button class="quiz-primary buttonlike" type="button" id="crush-start-button">${lang === 'zh' ? '开始扫描' : 'Start scan'}</button>
        </div>
      </section>
    `;
  }

  function renderHeader() {
    document.documentElement.lang = shared.getLang() === 'zh' ? 'zh-CN' : 'en';
    document.body.classList.toggle('quiz-love-detail', quiz.category === 'love');
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
    $('#quiz-detail-result').hidden = true;
    $('#quiz-detail-question').hidden = false;
    $('#quiz-detail-progress-label').hidden = shared.quizNeedsProfile(quiz) && !profile.name.trim();
    $('#quiz-detail-progress-bar').parentElement.hidden = shared.quizNeedsProfile(quiz) && !profile.name.trim();
    renderQuestion();
  }

  function renderQuestion() {
    if (shared.quizNeedsProfile(quiz) && !profile.name.trim()) {
      $('#quiz-detail-question').innerHTML = renderProfileStep();
      return;
    }
    const current = questions[questionIndex];
    $('#quiz-detail-progress-label').textContent = `${text().q}${shared.getLang() === 'zh' ? '' : ' '}${questionIndex + 1} ${text().of} ${questions.length}`;
    $('#quiz-detail-progress-label').hidden = false;
    $('#quiz-detail-progress-bar').parentElement.hidden = false;
    $('#quiz-detail-progress-bar').style.width = `${(questionIndex / questions.length) * 100}%`;
    const questionText = shared.personalizeText(current.text, profileName());
    $('#quiz-detail-question').innerHTML = `
      ${current.vibe ? `<div class="quiz-question-kicker">${current.vibe}</div>` : ''}
      <h3>${questionText}</h3>
      <div class="quiz-options">
        ${current.options.map((option, index) => `<button class="buttonlike" type="button" data-detail-answer="${index}">${option.label}</button>`).join('')}
      </div>
      <div class="quiz-answer-reaction" aria-live="polite"></div>
    `;
  }

  function chooseAnswer(index, button) {
    if (isAnswering) return;
    const selected = questions[questionIndex].options[index];
    const reactions = {
      en: {
        spark: 'Logged: high sparkle, mild chaos.',
        analyst: 'Logged: receipts saved, delusion reduced.',
        connector: 'Logged: soft signal detected.',
        strategist: 'Logged: boundary shield activated.'
      },
      zh: {
        spark: '已记录：闪光值很高，混乱值微妙上升。',
        analyst: '已记录：证据链保存，脑补值下降。',
        connector: '已记录：温柔信号已捕捉。',
        strategist: '已记录：边界护盾已开启。'
      }
    };
    isAnswering = true;
    answers.push(selected);
    document.querySelectorAll('.quiz-options button').forEach((node) => { node.disabled = true; });
    if (button) button.classList.add('selected');
    const reaction = document.querySelector('.quiz-answer-reaction');
    if (reaction) reaction.textContent = reactions[shared.getLang()][selected.trait] || '';
    window.setTimeout(() => {
      questionIndex += 1;
      isAnswering = false;
      if (questionIndex >= questions.length) showResult();
      else renderQuestion();
    }, quiz.category === 'love' ? 620 : 160);
  }

  function showResult() {
    const score = answers.filter((answer) => answer.correct).length;
    const traits = answers.reduce((memo, answer) => {
      memo[answer.trait] = (memo[answer.trait] || 0) + 1;
      return memo;
    }, {});
    const topTrait = Object.entries(traits).sort((a, b) => b[1] - a[1])[0]?.[0] || 'spark';
    const result = shared.quizResult(quiz, topTrait);
    const reward = quiz.points + score * 10;
    const state = shared.updateProgress(reward);
    const share = shared.quizShareCopy(quiz, result, reward, profileName());
    const profileCard = shared.quizNeedsProfile(quiz) ? `
      <div class="quiz-crush-result-card">
        <div class="quiz-crush-preview ${profile.photo ? 'has-photo' : ''}">
          ${profile.photo ? `<img src="${profile.photo}" alt="" />` : `<span>${profileName().slice(0, 2).toUpperCase()}</span>`}
        </div>
        <div>
          <span>${shared.getLang() === 'zh' ? 'Crush 扫描对象' : 'Crush scan target'}</span>
          <strong>${profileName()}</strong>
        </div>
      </div>
    ` : '';
    updateScoreCard(state);
    $('#quiz-detail-progress-bar').style.width = '100%';
    $('#quiz-detail-question').hidden = true;
    $('#quiz-detail-result').hidden = false;
    $('#quiz-detail-result').innerHTML = `
      <span>${text().result}</span>
      ${profileCard}
      <h3>${result[0]}</h3>
      <p>${result[1]}</p>
      <div class="quiz-share-badge">${quiz.category === 'love' ? (shared.getLang() === 'zh' ? '适合发给朋友复盘' : 'Group-chat ready') : title()}</div>
      <div class="quiz-reward">+${reward} ${text().points} · ${score}/${questions.length}</div>
      <label>${text().share}<textarea readonly>${share}</textarea></label>
      <div class="quiz-result-actions">
        <button class="quiz-primary buttonlike" type="button" id="quiz-detail-again">${text().again}</button>
        <button class="quiz-ghost buttonlike" type="button" data-detail-copy-share>${shared.getLang() === 'zh' ? '复制分享文案' : 'Copy share text'}</button>
        <a class="quiz-ghost buttonlike" href="arcadequiz.html">${shared.getLang() === 'zh' ? '返回题库' : 'Back to feed'}</a>
      </div>
    `;
  }

  document.addEventListener('click', (event) => {
    const answer = event.target.closest('[data-detail-answer]');
    if (answer) chooseAnswer(Number(answer.dataset.detailAnswer), answer);
    if (event.target.id === 'crush-start-button') {
      const input = document.querySelector('#crush-name-input');
      profile.name = input?.value.trim() || shared.profileFallbackName();
      resetQuiz();
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
    if (event.target.id === 'quiz-detail-again') resetQuiz();
  });
  document.addEventListener('input', (event) => {
    if (event.target.id === 'crush-name-input') {
      profile.name = event.target.value;
    }
  });
  document.addEventListener('change', (event) => {
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
  resetQuiz();
})();
