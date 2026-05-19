(function () {
  const SITE_NAME = 'Arcade Hub';
  const DEFAULT_IMAGE = 'external-assets/brand/og-arcade-hub.svg';
  const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname);

  function absoluteUrl(path) {
    try { return new URL(path, location.href).href; }
    catch (_) { return path; }
  }
  function ensureMeta(selector, attrs) {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      Object.entries(attrs.identity || {}).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    }
    Object.entries(attrs.values || {}).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }
  function setCanonical(url) {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement('link');
      el.rel = 'canonical';
      document.head.appendChild(el);
    }
    el.href = url;
  }
  function trimDescription(text) {
    return String(text || '').replace(/\s+/g, ' ').trim().slice(0, 158);
  }

  window.ArcadeHubSEO = {
    update({ title, description, image, type = 'website', canonical } = {}) {
      const finalTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
      const finalDescription = trimDescription(description || 'Play instant HTML5 browser games on Arcade Hub. Discover puzzle, action, racing, sports, arcade, and casual games in your browser.');
      const finalImage = absoluteUrl(image || DEFAULT_IMAGE);
      const finalUrl = canonical || location.href;
      document.title = finalTitle;
      ensureMeta('meta[name="description"]', { identity: { name: 'description' }, values: { content: finalDescription } });
      ensureMeta('meta[property="og:site_name"]', { identity: { property: 'og:site_name' }, values: { content: SITE_NAME } });
      ensureMeta('meta[property="og:title"]', { identity: { property: 'og:title' }, values: { content: finalTitle } });
      ensureMeta('meta[property="og:description"]', { identity: { property: 'og:description' }, values: { content: finalDescription } });
      ensureMeta('meta[property="og:type"]', { identity: { property: 'og:type' }, values: { content: type } });
      ensureMeta('meta[property="og:url"]', { identity: { property: 'og:url' }, values: { content: finalUrl } });
      ensureMeta('meta[property="og:image"]', { identity: { property: 'og:image' }, values: { content: finalImage } });
      ensureMeta('meta[name="twitter:card"]', { identity: { name: 'twitter:card' }, values: { content: 'summary_large_image' } });
      ensureMeta('meta[name="twitter:title"]', { identity: { name: 'twitter:title' }, values: { content: finalTitle } });
      ensureMeta('meta[name="twitter:description"]', { identity: { name: 'twitter:description' }, values: { content: finalDescription } });
      ensureMeta('meta[name="twitter:image"]', { identity: { name: 'twitter:image' }, values: { content: finalImage } });
      setCanonical(finalUrl);
    }
  };

  const analytics = window.ArcadeHubAnalytics = {
    events: [],
    track(name, params = {}) {
      const event = {
        name,
        params: { page_path: location.pathname, page_title: document.title, ...params },
        ts: new Date().toISOString()
      };
      analytics.events.push(event);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: name, ...event.params });
      if (typeof window.gtag === 'function') window.gtag('event', name, event.params);
      if (isLocal) console.debug('[ArcadeHubAnalytics]', event);
    }
  };

  document.addEventListener('click', (event) => {
    const ad = event.target.closest && event.target.closest('a[rel~="sponsored"], .promo-ad, .preroll-link');
    if (ad) analytics.track('ad_click', { ad_href: ad.href || '', ad_slot: ad.className || 'ad' });
    const gameLink = event.target.closest && event.target.closest('a[href*="detail.html?id="], a[href*="play.html?id="]');
    if (gameLink) analytics.track('game_link_click', { href: gameLink.href });
  }, true);

  window.addEventListener('load', () => {
    analytics.track('page_view');
    document.querySelectorAll('.promo-ad, .preroll-link').forEach((ad) => {
      analytics.track('ad_impression', { ad_slot: ad.className || 'ad', ad_href: ad.href || '' });
    });
  });
})();
