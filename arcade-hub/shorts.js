(function () {
  const video = document.getElementById('main-short-video');
  const title = document.getElementById('current-title');
  const desc = document.getElementById('current-desc');
  const cards = Array.from(document.querySelectorAll('.short-card'));
  const preroll = document.getElementById('short-preroll');
  const continueButton = document.getElementById('continue-short');
  let lastTrackedSrc = '';
  let prerollSeenForSrc = '';
  let allowPlay = false;

  function track(name, params) {
    if (window.ArcadeHubAnalytics) window.ArcadeHubAnalytics.track(name, params || {});
  }

  function currentSrc() {
    return video.currentSrc || video.querySelector('source').src || '';
  }

  function showPreroll() {
    prerollSeenForSrc = video.querySelector('source').src || currentSrc();
    preroll.classList.add('show');
    track('short_preroll_show', { short_title: title.textContent, video_src: prerollSeenForSrc });
  }

  function hidePrerollAndPlay() {
    allowPlay = true;
    preroll.classList.remove('show');
    track('short_preroll_continue', { short_title: title.textContent, video_src: currentSrc() });
    video.play().catch(function () {});
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      cards.forEach((item) => item.classList.remove('active'));
      card.classList.add('active');
      const src = card.dataset.video;
      allowPlay = false;
      prerollSeenForSrc = '';
      video.pause();
      video.poster = card.dataset.poster;
      video.querySelector('source').src = src;
      title.textContent = card.dataset.title;
      desc.textContent = card.dataset.desc;
      video.load();
      video.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showPreroll();
      track('short_select', { short_title: card.dataset.title, short_index: index + 1, video_src: src });
    });
  });

  video.addEventListener('play', () => {
    const src = currentSrc();
    if (!allowPlay && prerollSeenForSrc !== src) {
      video.pause();
      showPreroll();
      return;
    }
    if (lastTrackedSrc !== src) {
      lastTrackedSrc = src;
      track('short_video_play', { short_title: title.textContent, video_src: src });
    }
  });

  continueButton.addEventListener('click', hidePrerollAndPlay);

  document.querySelectorAll('a[href="#featured-video"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (!allowPlay) setTimeout(showPreroll, 250);
    });
  });

  video.addEventListener('ended', () => {
    allowPlay = false;
    prerollSeenForSrc = '';
    track('short_video_complete', { short_title: title.textContent, video_src: currentSrc() });
  });
})();
