(function () {
  const shared = window.ArcadequizShared;
  if (!shared) return;

  const params = new URLSearchParams(location.search);
  const quiz = shared.QUIZZES.find((item) => item.id === params.get('id')) || shared.QUIZZES[0];
  let questions = [];
  let questionIndex = 0;
  let answers = [];

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
    $('#quiz-detail-lang').textContent = shared.getLang() === 'zh' ? 'EN' : '中文';
    $('#quiz-detail-format').textContent = shared.quizMeta(quiz);
    $('#quiz-detail-title').textContent = title();
    $('#quiz-detail-copy').textContent = quiz.format === 'strategy'
      ? (shared.getLang() === 'zh' ? '中立决策模拟：权衡信号、成本和不确定性。' : 'Neutral decision simulation: weigh signals, cost, and uncertainty.')
      : (shared.getLang() === 'zh' ? '回答 3-5 道选择题，获得结果卡、积分奖励和分享文案。' : 'Answer 3-5 multiple-choice questions to get a result card, points, and share copy.');
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
    $('#quiz-detail-result').hidden = true;
    $('#quiz-detail-question').hidden = false;
    renderQuestion();
  }

  function renderQuestion() {
    const current = questions[questionIndex];
    $('#quiz-detail-progress-label').textContent = `${text().q}${shared.getLang() === 'zh' ? '' : ' '}${questionIndex + 1} ${text().of} ${questions.length}`;
    $('#quiz-detail-progress-bar').style.width = `${(questionIndex / questions.length) * 100}%`;
    $('#quiz-detail-question').innerHTML = `
      <h3>${current.text}</h3>
      <div class="quiz-options">
        ${current.options.map((option, index) => `<button class="buttonlike" type="button" data-detail-answer="${index}">${option.label}</button>`).join('')}
      </div>
    `;
  }

  function chooseAnswer(index) {
    answers.push(questions[questionIndex].options[index]);
    questionIndex += 1;
    if (questionIndex >= questions.length) showResult();
    else renderQuestion();
  }

  function showResult() {
    const score = answers.filter((answer) => answer.correct).length;
    const traits = answers.reduce((memo, answer) => {
      memo[answer.trait] = (memo[answer.trait] || 0) + 1;
      return memo;
    }, {});
    const topTrait = Object.entries(traits).sort((a, b) => b[1] - a[1])[0]?.[0] || 'spark';
    const result = text().results[topTrait];
    const reward = quiz.points + score * 10;
    const state = shared.updateProgress(reward);
    const share = shared.getLang() === 'zh'
      ? `我在 Arcadequiz 玩了「${title()}」，结果是「${result[0]}」，拿到 ${reward} 分。`
      : `I played "${title()}" on Arcadequiz, got "${result[0]}", and earned ${reward} points.`;
    updateScoreCard(state);
    $('#quiz-detail-progress-bar').style.width = '100%';
    $('#quiz-detail-question').hidden = true;
    $('#quiz-detail-result').hidden = false;
    $('#quiz-detail-result').innerHTML = `
      <span>${text().result}</span>
      <h3>${result[0]}</h3>
      <p>${result[1]}</p>
      <div class="quiz-reward">+${reward} ${text().points} · ${score}/${questions.length}</div>
      <label>${text().share}<textarea readonly>${share}</textarea></label>
      <div class="quiz-result-actions">
        <button class="quiz-primary buttonlike" type="button" id="quiz-detail-again">${text().again}</button>
        <a class="quiz-ghost buttonlike" href="arcadequiz.html">${shared.getLang() === 'zh' ? '返回题库' : 'Back to feed'}</a>
      </div>
    `;
  }

  document.addEventListener('click', (event) => {
    const answer = event.target.closest('[data-detail-answer]');
    if (answer) chooseAnswer(Number(answer.dataset.detailAnswer));
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
