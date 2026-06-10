(function () {
  const shared = window.ArcadequizShared;
  if (!shared) return;

  const params = new URLSearchParams(location.search);
  const quiz = shared.QUIZZES.find((item) => item.id === params.get('id')) || shared.QUIZZES[0];
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

  function setQuestionAdVisible(isVisible) {
    const slot = $('#quiz-question-ad-slot');
    if (!slot) return;
    slot.hidden = !isVisible;
    if (isVisible && !questionAdPushed && window.adsbygoogle) {
      questionAdPushed = true;
      window.setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (_) {}
      }, 0);
    }
  }

  function setResultAdVisible(isVisible) {
    const slot = $('#quiz-result-ad-slot');
    if (!slot) return;
    slot.hidden = !isVisible;
    if (isVisible && !resultAdPushed && window.adsbygoogle) {
      resultAdPushed = true;
      window.setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (_) {}
      }, 0);
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
      setQuestionAdVisible(false);
      setResultAdVisible(false);
      return;
    }
    const current = questions[questionIndex];
    $('#quiz-detail-progress-label').textContent = shared.quizNeedsProfile(quiz)
      ? `${current.vibe || 'Signal scan'} · ${Math.round(((questionIndex + 1) / questions.length) * 100)}%`
      : `${text().q}${shared.getLang() === 'zh' ? '' : ' '}${questionIndex + 1} ${text().of} ${questions.length}`;
    $('#quiz-detail-progress-label').hidden = false;
    $('#quiz-detail-progress-bar').parentElement.hidden = false;
    $('#quiz-detail-progress-bar').style.width = `${(questionIndex / questions.length) * 100}%`;
    const questionText = escapeHTML(shared.personalizeText(current.text, profileName()));
    $('#quiz-detail-question').innerHTML = `
      ${current.vibe ? `<div class="quiz-question-kicker">${current.vibe}</div>` : ''}
      <h3>${questionText}</h3>
      <div class="quiz-options">
        ${current.options.map((option, index) => `<button class="buttonlike" type="button" data-detail-answer="${index}">${option.label}</button>`).join('')}
      </div>
      <div class="quiz-answer-reaction" aria-live="polite"></div>
    `;
    setQuestionAdVisible(true);
    setResultAdVisible(false);
  }

  function chooseAnswer(index, button) {
    if (isAnswering) return;
    const selected = questions[questionIndex].options[index];
    const reactions = {
      en: {
        spark: 'Logged: this answer was not neutral.',
        analyst: 'Receipts saved. Peer review pending.',
        connector: 'Soft signal detected. Bestie alert warmed up.',
        strategist: 'Boundary shield active. Delusion contained.'
      },
      zh: {
        spark: '已记录：这个答案不太中立。',
        analyst: '证据已保存，等待朋友复审。',
        connector: '温柔信号已捕捉，朋友警报预热中。',
        strategist: '边界护盾已开启，脑补暂时受控。'
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
      saveRun(questionIndex);
      if (questionIndex >= questions.length) showResult();
      else location.href = questionUrl(questionIndex);
    }, quiz.category === 'love' ? 620 : 160);
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
      ${shareCard || `<span>${text().result}</span>`}
      <div class="quiz-result-analysis">
        <span>${shared.quizNeedsProfile(quiz) ? 'Why you got this' : text().result}</span>
        ${profileCard}
        <h3>${resultTitle}</h3>
        <p>${resultCopy}</p>
        ${metricCard}
      </div>
      <div class="quiz-share-badge">${quiz.category === 'love' ? (shared.getLang() === 'zh' ? '适合发给朋友复盘' : 'Send this to your bestie') : title()}</div>
      <div class="quiz-reward">+${reward} ${text().points} · ${score}/${questions.length}</div>
      <label>${text().share}<textarea readonly>${escapeHTML(share)}</textarea></label>
      <div class="quiz-result-actions">
        ${shared.quizNeedsProfile(quiz) ? '<button class="quiz-primary buttonlike" type="button" data-share-result>Share result</button><button class="quiz-ghost buttonlike" type="button" data-download-card>Download card</button><button class="quiz-ghost buttonlike" type="button" data-copy-link>Copy quiz link</button>' : ''}
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
        navigator.share({ title: 'Crush Scanner', text: shareText, url: quizLink() }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(shareText);
        shareResult.textContent = 'Copied share text';
      }
    }
    if (event.target.closest('[data-download-card]')) downloadShareCard();
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
