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


  function slugify(value, fallback = '') {
    return String(value || fallback || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || fallback;
  }

  function queryParams() {
    return new URLSearchParams(location.search || '');
  }

  function getQueryValue(keys) {
    const params = queryParams();
    for (const key of keys) {
      const value = params.get(key);
      if (value) return value;
    }
    return '';
  }

  function inferPageType() {
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (page === 'campaign.html') return 'game_collection';
    if (page === 'shorts.html') return 'short_video_collection';
    if (page === 'territory-clash-live.html') return 'interactive_game_landing';
    if (page === 'detail.html') return 'game_detail';
    if (page === 'play.html') return 'game_play';
    if (page === 'index.html' || page === '') return 'home';
    return page.replace(/\.html$/, '') || 'site_page';
  }

  function inferLandingName(pageType) {
    const params = queryParams();
    const explicit = getQueryValue(['landing_name', 'landing', 'page_name']);
    if (explicit) return slugify(explicit);
    const theme = getQueryValue(['theme', 'utm_campaign']);
    const gameId = params.get('id') || '';
    if (pageType === 'game_collection') return slugify(theme || 'word_link', 'word_link') + '_collection';
    if (pageType === 'short_video_collection') return 'shorts_collection';
    if (pageType === 'interactive_game_landing') return 'territory_clash_live';
    if ((pageType === 'game_detail' || pageType === 'game_play') && gameId) return slugify(gameId);
    return pageType;
  }

  function inferExperimentId(pageType, landingName) {
    const explicit = getQueryValue(['experiment_id', 'exp', 'experiment']);
    if (explicit) return slugify(explicit);
    const utmCampaign = getQueryValue(['utm_campaign']);
    const utmContent = getQueryValue(['utm_content', 'creative_id', 'content_id']);
    if (utmCampaign && utmContent) return `${slugify(utmCampaign)}_${slugify(utmContent)}`;
    if (utmCampaign) return slugify(utmCampaign);
    const theme = getQueryValue(['theme']);
    if (theme) return `${slugify(theme)}_landing`;
    return `${slugify(landingName || pageType)}_organic`;
  }

  function inferExperimentContext() {
    const params = queryParams();
    const pageType = inferPageType();
    const landingType = slugify(getQueryValue(['landing_type']) || pageType);
    const landingName = inferLandingName(landingType || pageType);
    const campaignTheme = slugify(getQueryValue(['theme', 'campaign_theme', 'utm_campaign']));
    const utmSource = params.get('utm_source') || '';
    const utmMedium = params.get('utm_medium') || '';
    const utmCampaign = params.get('utm_campaign') || '';
    const utmContent = params.get('utm_content') || '';
    const utmTerm = params.get('utm_term') || '';
    const creativeId = slugify(getQueryValue(['creative_id', 'utm_content', 'content_id']));
    return {
      experiment_id: inferExperimentId(landingType || pageType, landingName),
      landing_type: landingType,
      landing_name: landingName,
      offer_id: slugify(getQueryValue(['offer_id']) || 'site_browse'),
      creative_id: creativeId,
      campaign_theme: campaignTheme,
      page_type: pageType,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm
    };
  }

  function cleanParams(params) {
    const out = {};
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      out[key] = value;
    });
    return out;
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
  let experimentContext = inferExperimentContext();
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
    getContext() {
      return { ...experimentContext };
    },
    setContext(params = {}) {
      experimentContext = cleanParams({ ...experimentContext, ...params });
      return analytics.getContext();
    },
    track(name, params = {}) {
      const enrichedParams = cleanParams({
        ...experimentContext,
        page_path: location.pathname,
        page_location: location.href,
        page_title: document.title,
        landing_theme: new URLSearchParams(location.search).get('theme') || '',
        ...params
      });
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
    const slot = normalizeAdSlot(ad);
    const destination = href.includes('play.google.com') ? 'google_play' : 'external';
    return {
      ad_href: href,
      ad_slot: slot,
      ad_type: warInc ? 'warinc' : 'sponsored',
      ad_campaign: warInc ? 'war_inc_rising' : 'sponsored',
      ad_destination: destination,
      ad_network: warInc ? 'internal_cross_promo' : 'sponsored',
      ad_format: slot.includes('preroll') ? 'preroll' : 'banner',
      offer_id: warInc ? 'warinc_google_play' : experimentContext.offer_id,
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
    if (gameLink) {
      let contentId = '';
      try { contentId = new URL(gameLink.href, location.href).searchParams.get('id') || ''; } catch (_) {}
      const linkParams = {
        href: gameLink.href,
        content_type: 'game',
        content_id: contentId,
        click_target: gameLink.href.includes('play.html') ? 'game_play_link' : 'game_detail_link'
      };
      analytics.track('game_link_click', linkParams);
      analytics.track('content_click', linkParams);
    }
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
    analytics.track('landing_view');
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
