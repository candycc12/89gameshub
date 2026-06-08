(function () {
  const SITE_NAME = 'Arcade Hub';
  const DEFAULT_IMAGE = 'external-assets/brand/og-arcade-hub.svg';
  const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  const WAR_INC_GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.i89trillion.strategy.rising&listing=89gamehub&referrer=utm_source%3D89gamehub_website%26utm_medium%3Dreferral%26utm_campaign%3Dwarinc_site%26utm_content%3Dsite_warinc_ad';
  const WAR_INC_APP_STORE_URL = 'https://apps.apple.com/us/app/war-inc-rising/id6747767390?ppid=a4a6e47e-0a10-4194-a69b-9fadbfddacb6';

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
  const tiktokPixelId = String(trackingConfig.tiktokPixelId || 'D8BEO9JC77U7N1D0E6E0').trim();
  const conversionActions = (trackingConfig.googleAds && trackingConfig.googleAds.conversionActions) || {};
  const pageLoadAt = Date.now();
  const trackedScrollDepths = new Set();
  let engagementSent = false;
  let experimentContext = inferExperimentContext();
  const sessionKey = 'arcadehub_session_started_at';
  const sessionLastActivityKey = 'arcadehub_session_last_activity_at';
  const lastPathKey = 'arcadehub_last_path';
  const SESSION_IDLE_RESET_MS = 30 * 60 * 1000;
  const MAX_SESSION_WINDOW_MS = 12 * 60 * 60 * 1000;
  function syncSessionWindow(now = Date.now()) {
    try {
      const startedAt = Number(sessionStorage.getItem(sessionKey) || 0);
      const lastActivityAt = Number(sessionStorage.getItem(sessionLastActivityKey) || 0);
      const invalidStart = startedAt <= 0 || startedAt > now;
      const idleTooLong = lastActivityAt > 0 && (now - lastActivityAt) > SESSION_IDLE_RESET_MS;
      const sessionTooLong = startedAt > 0 && (now - startedAt) > MAX_SESSION_WINDOW_MS;
      const shouldReset = invalidStart || idleTooLong || sessionTooLong;
      const nextStartedAt = shouldReset ? now : startedAt;
      sessionStorage.setItem(sessionKey, String(nextStartedAt || now));
      sessionStorage.setItem(sessionLastActivityKey, String(now));
      sessionStorage.setItem(lastPathKey, location.pathname + location.search);
      return nextStartedAt || now;
    } catch (_) {
      return now;
    }
  }
  function markSessionActivity() {
    try {
      sessionStorage.setItem(sessionLastActivityKey, String(Date.now()));
    } catch (_) {}
  }
  try {
    syncSessionWindow(pageLoadAt);
  } catch (_) {}

  function installTikTokPixel() {
    if (!tiktokPixelId || tiktokPixelId.includes('YOUR_') || window.ttq || document.querySelector(`script[data-arcade-tiktok-pixel="${tiktokPixelId}"]`)) return;
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      const ttq = w[t] = w[t] || [];
      ttq.methods = ['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];
      ttq.setAndDefer = function (target, method) {
        target[method] = function () { target.push([method].concat(Array.prototype.slice.call(arguments, 0))); };
      };
      for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (id) {
        const instance = ttq._i[id] || [];
        for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(instance, ttq.methods[i]);
        return instance;
      };
      ttq.load = function (id, options) {
        const src = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        ttq._i = ttq._i || {};
        ttq._i[id] = [];
        ttq._i[id]._u = src;
        ttq._t = ttq._t || {};
        ttq._t[id] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[id] = options || {};
        const script = d.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = `${src}?sdkid=${id}&lib=${t}`;
        script.dataset.arcadeTiktokPixel = id;
        const first = d.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(script, first);
      };
      ttq.load(tiktokPixelId);
      ttq.page();
    }(window, document, 'ttq');
  }

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
  installTikTokPixel();

  function inferTikTokClickLabel(name, params = {}) {
    if (name === 'ad_click') {
      const title = params.ad_title || params.ad_campaign || 'Sponsored ad';
      const slot = params.ad_slot ? `: ${params.ad_slot}` : '';
      return `${title} ad${slot}`;
    }
    if (['game_start', 'game_link_click', 'content_click'].includes(name)) {
      return `Game click: ${params.content_id || params.hero_game || params.landing_name || 'unknown'}`;
    }
    return params.content_id || params.hero_game || params.landing_name || params.campaign_theme || params.page_type || 'arcadehub';
  }

  function inferTikTokClickAction(name, params = {}) {
    if (name === 'ad_click') return params.ad_type === 'warinc' ? 'warinc_ad_click' : 'sponsored_ad_click';
    if (name === 'game_start') return 'game_start';
    if (name === 'game_link_click') return params.click_target || 'game_link_click';
    if (name === 'content_click') return 'content_click';
    return name;
  }

  function toTikTokProperties(name, params = {}) {
    const clickAction = inferTikTokClickAction(name, params);
    return cleanParams({
      content_name: inferTikTokClickLabel(name, params),
      content_type: 'product',
      content_id: params.content_id || params.hero_game || params.ad_campaign || params.landing_name || '',
      arcade_content_type: params.content_type || params.landing_type || params.page_type || 'site',
      description: params.page_title || document.title || '',
      experiment_id: params.experiment_id,
      landing_name: params.landing_name,
      landing_type: params.landing_type,
      campaign_theme: params.campaign_theme,
      creative_id: params.creative_id,
      utm_source: params.utm_source,
      utm_medium: params.utm_medium,
      utm_campaign: params.utm_campaign,
      utm_content: params.utm_content,
      ad_type: params.ad_type,
      ad_campaign: params.ad_campaign,
      ad_destination: params.ad_destination,
      ad_slot: params.ad_slot,
      ad_network: params.ad_network,
      ad_format: params.ad_format,
      button_name: clickAction,
      click_action: clickAction,
      click_category: name === 'ad_click' ? 'ad' : (['game_start', 'game_link_click', 'content_click'].includes(name) ? 'game' : 'page'),
      value: Number(params.value || 0) || undefined,
      currency: params.currency || undefined
    });
  }

  function dispatchTikTokEvent(name, params = {}) {
    if (!window.ttq || typeof window.ttq.track !== 'function') return false;
    const props = toTikTokProperties(name, params);
    let eventName = '';
    let customEventName = '';
    if (['campaign_landing_view', 'landing_view'].includes(name)) eventName = 'ViewContent';
    if (['game_start', 'game_link_click', 'content_click', 'ad_click'].includes(name)) eventName = 'ClickButton';
    if (name === 'ad_click') customEventName = props.ad_type === 'warinc' ? 'WarIncAdClick' : 'SponsoredAdClick';
    if (name === 'game_start') customEventName = 'GameStartClick';
    if (name === 'game_link_click') customEventName = 'GameLinkClick';
    if (!eventName) return false;
    window.ttq.track(eventName, props);
    if (customEventName) window.ttq.track(customEventName, props);
    return true;
  }

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
      dispatchTikTokEvent(name, event.params);
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

  function isIOSDevice() {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const touchMac = platform === 'MacIntel' && Number(navigator.maxTouchPoints || 0) > 1;
    return /iPad|iPhone|iPod/i.test(ua) || touchMac;
  }

  function getWarIncUrl() {
    return isIOSDevice() ? WAR_INC_APP_STORE_URL : WAR_INC_GOOGLE_PLAY_URL;
  }

  function isWarIncAd(ad, href) {
    const text = String(ad.textContent || '').toLowerCase();
    return href.includes('com.i89trillion.strategy.rising') || href.includes('apps.apple.com/us/app/war-inc-rising') || text.includes('war inc');
  }

  function normalizeWarIncLinks(root = document) {
    root.querySelectorAll('a[rel~="sponsored"], a.promo-ad, a.preroll-link, a.short-preroll-ad').forEach((ad) => {
      const href = ad.getAttribute('href') || '';
      if (!isWarIncAd(ad, href)) return;
      ad.href = getWarIncUrl();
      ad.dataset.adType = 'warinc';
      ad.dataset.adCampaign = 'war_inc_rising';
      ad.dataset.adDestination = isIOSDevice() ? 'app_store' : 'google_play';
    });
  }

  function buildAdParams(ad, href) {
    const warInc = isWarIncAd(ad, href);
    const slot = normalizeAdSlot(ad);
    const destination = href.includes('apps.apple.com') ? 'app_store' : (href.includes('play.google.com') ? 'google_play' : 'external');
    return {
      ad_href: href,
      ad_slot: slot,
      ad_type: warInc ? 'warinc' : 'sponsored',
      ad_campaign: warInc ? 'war_inc_rising' : 'sponsored',
      ad_destination: destination,
      ad_network: warInc ? 'internal_cross_promo' : 'sponsored',
      ad_format: slot.includes('preroll') ? 'preroll' : 'banner',
      offer_id: warInc ? (destination === 'app_store' ? 'warinc_app_store' : 'warinc_google_play') : experimentContext.offer_id,
      ad_title: warInc ? 'War Inc: Rising' : String(ad.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
      conversion_event: 'ad_click'
    };
  }

  document.addEventListener('click', (event) => {
    markSessionActivity();
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
        && ['google_play', 'app_store'].includes(params.ad_destination)
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
      const startedAt = syncSessionWindow(now);
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

  document.addEventListener('DOMContentLoaded', () => normalizeWarIncLinks());

  window.addEventListener('load', () => {
    normalizeWarIncLinks();
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
  window.addEventListener('scroll', markSessionActivity, { passive: true });
  window.addEventListener('focus', markSessionActivity);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') markSessionActivity();
  });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') sendEngagement('visibility_hidden'); });
  window.addEventListener('pagehide', () => sendEngagement('pagehide'));
})();
