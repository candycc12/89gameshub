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

  const trackingConfig = window.ARCADE_TRACKING || {};
  const googleTagId = String(trackingConfig.googleTagId || '').trim();
  const ga4MeasurementId = String(trackingConfig.ga4MeasurementId || '').trim();
  const conversionActions = (trackingConfig.googleAds && trackingConfig.googleAds.conversionActions) || {};
  const pageLoadAt = Date.now();
  const trackedScrollDepths = new Set();
  let engagementSent = false;
  const sessionKey = 'arcadehub_session_started_at';
  const lastPathKey = 'arcadehub_last_path';
  try {
    if (!sessionStorage.getItem(sessionKey)) sessionStorage.setItem(sessionKey, String(pageLoadAt));
    sessionStorage.setItem(lastPathKey, location.pathname + location.search);
  } catch (_) {}

  function installGoogleTag() {
    if (!googleTagId || googleTagId.includes('YOUR_') || document.querySelector(`script[data-arcade-google-tag="${googleTagId}"]`)) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', googleTagId, { send_page_view: false });
    if (ga4MeasurementId && !ga4MeasurementId.includes('YOUR_')) {
      window.gtag('config', ga4MeasurementId, { send_page_view: false });
    }
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`;
    script.dataset.arcadeGoogleTag = googleTagId;
    document.head.appendChild(script);
  }

  function buildConversionPayload(name, params) {
    const action = conversionActions[name];
    if (!action) return null;
    return {
      conversion_event: name,
      conversion_action_name: action.actionName || name,
      action_optimization: action.optimizeFor || '',
      value: Number(action.value || 0),
      currency: action.currency || 'USD',
      send_to: action.sendTo || '',
      ...params
    };
  }

  function dispatchGoogleAdsConversion(name, params = {}, options = {}) {
    const payload = buildConversionPayload(name, params);
    if (!payload) return false;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'ads_conversion_candidate', ...payload });
    if (payload.send_to && typeof window.gtag === 'function') {
      const { send_to, conversion_event, conversion_action_name, action_optimization, ...gtagPayload } = payload;
      const conversionPayload = { send_to, ...gtagPayload };
      if (typeof options.event_callback === 'function') conversionPayload.event_callback = options.event_callback;
      if (Number(options.event_timeout || 0) > 0) conversionPayload.event_timeout = Number(options.event_timeout);
      window.gtag('event', 'conversion', conversionPayload);
      return true;
    }
    return false;
  }

  installGoogleTag();

  const analytics = window.ArcadeHubAnalytics = {
    events: [],
    track(name, params = {}) {
      const enrichedParams = {
        page_path: location.pathname,
        page_location: location.href,
        page_title: document.title,
        landing_theme: new URLSearchParams(location.search).get('theme') || '',
        ...params
      };
      const event = { name, params: enrichedParams, ts: new Date().toISOString() };
      analytics.events.push(event);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: name, arcade_event: name, ...event.params });
      if (typeof window.gtag === 'function') window.gtag('event', name, event.params);
      if (name !== 'ad_click') dispatchGoogleAdsConversion(name, event.params);
      if (isLocal) console.debug('[ArcadeHubAnalytics]', event);
    }
  };

  function normalizeAdSlot(ad) {
    const className = typeof ad.className === 'string' ? ad.className : String(ad.className || '');
    if (className.includes('campaign-play-jumbo')) return 'campaign_primary_cta';
    if (className.includes('promo-ad-home')) return 'home_banner';
    if (className.includes('detail-inline-ad')) return 'detail_inline_banner';
    if (className.includes('promo-ad-play')) return 'play_below_game_banner';
    if (className.includes('promo-ad-rail')) return 'play_right_rail_banner';
    if (className.includes('preroll-link')) return 'pre_game_preroll';
    if (className.includes('short-preroll-ad')) return 'shorts_preroll';
    if (className.includes('shorts-ad')) return 'shorts_inline_banner';
    return className || 'sponsored_ad';
  }

  function isWarIncAd(ad, href) {
    const text = String(ad.textContent || '').toLowerCase();
    return href.includes('com.i89trillion.strategy.rising') || text.includes('war inc');
  }

  function buildAdParams(ad, href) {
    const warInc = isWarIncAd(ad, href);
    return {
      ad_href: href,
      ad_slot: normalizeAdSlot(ad),
      ad_type: warInc ? 'warinc' : 'sponsored',
      ad_campaign: warInc ? 'war_inc_rising' : 'sponsored',
      ad_destination: href.includes('play.google.com') ? 'google_play' : 'external',
      ad_title: warInc ? 'War Inc: Rising' : String(ad.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
      conversion_event: 'ad_click'
    };
  }

  document.addEventListener('click', (event) => {
    const ad = event.target.closest && event.target.closest('a[rel~="sponsored"], a.promo-ad, a.preroll-link, a.short-preroll-ad');
    if (ad) {
      const href = ad.href || '';
      let navigated = false;
      const go = () => {
        if (navigated || !href) return;
        navigated = true;
        if (ad.target === '_blank') window.open(href, '_blank', 'noopener');
        else window.location.href = href;
      };
      const params = buildAdParams(ad, href);
      const eventName = 'ad_click';
      const shouldReportAdsConversion = params.ad_type === 'warinc'
        && params.ad_campaign === 'war_inc_rising'
        && params.ad_destination === 'google_play'
        && href
        && conversionActions.ad_click
        && conversionActions.ad_click.sendTo;
      if (shouldReportAdsConversion) {
        event.preventDefault();
        analytics.track(eventName, params);
        const sent = dispatchGoogleAdsConversion('ad_click', params, { event_callback: go, event_timeout: 1200 });
        if (!sent) setTimeout(go, 80);
        else setTimeout(go, 1400);
      } else {
        analytics.track(eventName, params);
      }
    }
    const gameLink = event.target.closest && event.target.closest('a[href*="detail.html?id="], a[href*="play.html?id="]');
    if (gameLink) analytics.track('game_link_click', { href: gameLink.href });
  }, true);

  function sendEngagement(reason = 'hidden') {
    if (engagementSent) return;
    const now = Date.now();
    const pageSeconds = Math.max(1, Math.round((now - pageLoadAt) / 1000));
    if (pageSeconds < 3) return;
    let siteSeconds = pageSeconds;
    try {
      const startedAt = Number(sessionStorage.getItem(sessionKey) || pageLoadAt);
      if (startedAt > 0) siteSeconds = Math.max(pageSeconds, Math.round((now - startedAt) / 1000));
    } catch (_) {}
    engagementSent = true;
    analytics.track('page_time', { engagement_time_sec: pageSeconds, page_time_sec: pageSeconds, engagement_reason: reason });
    analytics.track('site_session_time', { engagement_time_sec: siteSeconds, site_session_time_sec: siteSeconds, engagement_reason: reason });
  }

  function trackScrollDepth() {
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const depth = Math.min(100, Math.round((window.scrollY / maxScroll) * 100));
    [25, 50, 75, 90].forEach((threshold) => {
      if (depth >= threshold && !trackedScrollDepths.has(threshold)) {
        trackedScrollDepths.add(threshold);
        analytics.track('scroll_depth', { scroll_depth: threshold });
      }
    });
  }

  window.addEventListener('load', () => {
    analytics.track('page_view');
    document.querySelectorAll('.promo-ad, .preroll-link, .short-preroll-ad').forEach((ad) => {
      {
        const href = ad.href || '';
        const params = buildAdParams(ad, href);
        analytics.track('ad_impression', params);
      }
    });
  });

  window.addEventListener('scroll', trackScrollDepth, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') sendEngagement('visibility_hidden'); });
  window.addEventListener('pagehide', () => sendEngagement('pagehide'));
})();
