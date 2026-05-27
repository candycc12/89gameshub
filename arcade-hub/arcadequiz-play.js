(function () {
  const shared = window.ArcadequizShared;
  if (!shared) return;

  const params = new URLSearchParams(location.search);
  const quiz = shared.QUIZZES.find((item) => item.id === params.get('id')) || shared.QUIZZES[0];
  let questions = [];
  let questionIndex = 0;
  let answers = [];
  let isAnswering = false;

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
    renderQuestion();
  }

  function renderQuestion() {
    const current = questions[questionIndex];
    $('#quiz-detail-progress-label').textContent = `${text().q}${shared.getLang() === 'zh' ? '' : ' '}${questionIndex + 1} ${text().of} ${questions.length}`;
    $('#quiz-detail-progress-bar').style.width = `${(questionIndex / questions.length) * 100}%`;
    $('#quiz-detail-question').innerHTML = `
      ${current.vibe ? `<div class="quiz-question-kicker">${current.vibe}</div>` : ''}
      <h3>${current.text}</h3>
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
    const share = shared.quizShareCopy(quiz, result, reward);
    updateScoreCard(state);
    $('#quiz-detail-progress-bar').style.width = '100%';
    $('#quiz-detail-question').hidden = true;
    $('#quiz-detail-result').hidden = false;
    $('#quiz-detail-result').innerHTML = `
      <span>${text().result}</span>
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
  $('#quiz-detail-lang').addEventListener('click', () => {
    shared.setLang(shared.getLang() === 'zh' ? 'en' : 'zh');
    renderHeader();
    resetQuiz();
  });

  setDetailUrl();
  renderHeader();
  resetQuiz();
})();
