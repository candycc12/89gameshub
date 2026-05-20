(function () {
  const video = document.getElementById('main-short-video');
  const title = document.getElementById('current-title');
  const desc = document.getElementById('current-desc');
  const cards = Array.from(document.querySelectorAll('.short-card'));
  let lastTrackedSrc = '';

  function track(name, params) {
    if (window.ArcadeHubAnalytics) window.ArcadeHubAnalytics.track(name, params || {});
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      cards.forEach((item) => item.classList.remove('active'));
      card.classList.add('active');
      const src = card.dataset.video;
      video.pause();
      video.poster = card.dataset.poster;
      video.querySelector('source').src = src;
      title.textContent = card.dataset.title;
      desc.textContent = card.dataset.desc;
      video.load();
      video.scrollIntoView({ behavior: 'smooth', block: 'center' });
      track('short_select', { short_title: card.dataset.title, short_index: index + 1, video_src: src });
    });
  });

  video.addEventListener('play', () => {
    const src = video.currentSrc || video.querySelector('source').src;
    if (lastTrackedSrc !== src) {
      lastTrackedSrc = src;
      track('short_video_play', { short_title: title.textContent, video_src: src });
    }
  });

  video.addEventListener('ended', () => {
    track('short_video_complete', { short_title: title.textContent, video_src: video.currentSrc || '' });
  });
})();
