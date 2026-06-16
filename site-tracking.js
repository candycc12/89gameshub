(function () {
  if (window.__ARCADE_GLOBAL_TRACKING_INSTALLED__) return;
  window.__ARCADE_GLOBAL_TRACKING_INSTALLED__ = true;

  const config = window.ARCADE_TRACKING || {};
  const googleTagId = String(config.googleTagId || '').trim();
  const ga4MeasurementId = String(config.ga4MeasurementId || '').trim();
  const tiktokPixelId = String(config.tiktokPixelId || '').trim();
  const conversionActions = (config.googleAds && config.googleAds.conversionActions) || {};
  const pageLoadAt = Date.now();
  const trackedScrollDepths = new Set();
  const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  const SITE_NAME = 'Arcade Hub';
  const DEFAULT_IMAGE = '/arcade-hub/external-assets/brand/og-arcade-hub.svg';
  const WAR_INC_GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.i89trillion.strategy.rising&listing=89gamehub&referrer=utm_source%3D89gamehub_website%26utm_medium%3Dreferral%26utm_campaign%3Dwarinc_site%26utm_content%3Dsite_warinc_ad';
  const WAR_INC_APP_STORE_URL = 'https://apps.apple.com/us/app/war-inc-rising/id6747767390?ppid=a4a6e47e-0a10-4194-a69b-9fadbfddacb6';
  const sessionKey = 'arcadehub_session_started_at';
  const sessionLastActivityKey = 'arcadehub_session_last_activity_at';
  const SESSION_IDLE_RESET_MS = 30 * 60 * 1000;
  const MAX_SESSION_WINDOW_MS = 12 * 60 * 60 * 1000;
  let engagementSent = false;

  function slugify(value, fallback = '') {
    return String(value || fallback || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || fallback;
  }

  function cleanParams(params) {
    const out = {};
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      out[key] = value;
    });
    return out;
  }

  function absoluteUrl(path) {
    try { return new URL(path, location.href).href; }
    catch (_) { return path; }
  }

  function ensureMeta(selector, attrs) {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      Object.entries(attrs.identity || {}).forEach(([key, value]) => el.setAttribute(key, value));
      document.head.appendChild(el);
    }
    Object.entries(attrs.values || {}).forEach(([key, value]) => el.setAttribute(key, value));
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
    const bodyType = document.body && document.body.dataset.pageType;
    if (bodyType) return slugify(bodyType);
    const path = location.pathname.replace(/\/index\.html$/i, '/');
    if (path.includes('/arcade-hub/world-cup/')) return 'world_cup';
    if (path.includes('/ai-learning/')) return 'ai_learning';
    if (path.includes('/focus-test/')) return 'focus_test';
    if (path.includes('/speaking-confidence/')) return 'speaking_confidence';
    if (path.includes('/learning-guides/')) return 'learning_guide';
    if (path.includes('/phone-deals/')) return 'phone_deal';
    if (path.includes('/RBS-shop/')) return 'shop';
    if (path.includes('/arcade-hub/')) return 'arcade_hub';
    return path.split('/').filter(Boolean).length > 1 ? 'game_page' : 'site_page';
  }

  function inferPageCategory(pageType) {
    const explicit = document.body && (document.body.dataset.pageCategory || document.body.dataset.siteCategory);
    if (explicit) return slugify(explicit);
    const path = location.pathname.replace(/\/index\.html$/i, '/');
    if (path.includes('/arcade-hub/arcadequiz')) return 'quiz';
    if (path.includes('/arcade-hub/world-cup/')) return 'trend';
    if (path.includes('/ai-learning/')) return 'solution_landing';
    if (path.includes('/focus-test/')) return 'problem_description';
    if (path.includes('/speaking-confidence/')) return 'problem_description';
    if (path.includes('/phone-deals/')) return 'problem_description';
    if (path.includes('/learning-guides/')) return 'solution_landing';
    if (path.includes('/quiz-lesson-report/')) return 'solution_landing';
    if (path.includes('/RBS-shop/')) return 'shop';
    if (pageType === 'game_page' || path.includes('/arcade-hub/detail.html') || path.includes('/arcade-hub/play.html') || path.includes('/arcade-hub/launch.html')) return 'game';
    if (path.includes('/arcade-hub/')) return 'game';
    return 'site';
  }

  function inferLandingName(pageType) {
    const explicit = document.body && (document.body.dataset.landingName || document.body.dataset.pageName);
    if (explicit) return slugify(explicit);
    const query = getQueryValue(['landing_name', 'landing', 'page_name']);
    if (query) return slugify(query);
    const path = location.pathname.replace(/\/index\.html$/i, '/').replace(/\/$/i, '');
    const parts = path.split('/').filter(Boolean);
    if (!parts.length) return pageType || 'home';
    return slugify(parts.join('_'), pageType || 'site_page');
  }

  function inferExperimentId(pageType, landingName) {
    const explicit = getQueryValue(['experiment_id', 'exp', 'experiment']);
    if (explicit) return slugify(explicit);
    const utmCampaign = getQueryValue(['utm_campaign']);
    const utmContent = getQueryValue(['utm_content', 'creative_id', 'content_id']);
    if (utmCampaign && utmContent) return `${slugify(utmCampaign)}_${slugify(utmContent)}`;
    if (utmCampaign) return slugify(utmCampaign);
    return `${slugify(landingName || pageType)}_organic`;
  }

  window.ArcadeHubSEO = window.ArcadeHubSEO || {
    update({ title, description, image, type = 'website', canonical } = {}) {
      const finalTitle = title ? `${title} | ${SITE_NAME}` : (document.title || SITE_NAME);
      const finalDescription = trimDescription(description || document.querySelector('meta[name="description"]')?.content || 'Play instant HTML5 browser games and interactive experiences on 89GamesHub.');
      const finalImage = absoluteUrl(image || document.querySelector('meta[property="og:image"]')?.content || DEFAULT_IMAGE);
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

  function buildContext() {
    const params = queryParams();
    const pageType = inferPageType();
    const landingName = inferLandingName(pageType);
    const pageCategory = inferPageCategory(pageType);
    return cleanParams({
      experiment_id: inferExperimentId(pageType, landingName),
      landing_type: pageType,
      landing_name: landingName,
      page_category: pageCategory,
      site_section: document.body && slugify(document.body.dataset.siteSection || pageCategory || pageType),
      offer_id: slugify(getQueryValue(['offer_id']) || 'site_browse'),
      creative_id: slugify(getQueryValue(['creative_id', 'utm_content', 'content_id'])),
      page_type: pageType,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || ''
    });
  }

  let context = buildContext();

  function installGoogleTag() {
    if (!googleTagId || googleTagId.includes('YOUR_')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', googleTagId, { send_page_view: false });
    if (ga4MeasurementId && !ga4MeasurementId.includes('YOUR_')) {
      window.gtag('config', ga4MeasurementId, { send_page_view: false });
    }
    if (document.querySelector(`script[data-arcade-google-tag="${googleTagId}"]`)) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`;
    script.dataset.arcadeGoogleTag = googleTagId;
    document.head.appendChild(script);
  }

  function installTikTokPixel() {
    if (!tiktokPixelId || tiktokPixelId.includes('YOUR_') || window.ttq) return;
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      const ttq = w[t] = w[t] || [];
      ttq.methods = ['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];
      ttq.setAndDefer = function (target, method) {
        target[method] = function () { target.push([method].concat(Array.prototype.slice.call(arguments, 0))); };
      };
      for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
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

  function dispatchTikTokEvent(name, params = {}) {
    if (!window.ttq || typeof window.ttq.track !== 'function') return false;
    const isRevenueAdClick = name === 'adsense_slot_click_attempt' || (name === 'ad_click' && params.ad_type === 'adsense');
    const props = cleanParams({
      content_name: params.click_text || params.content_title || params.ad_title || params.landing_name || document.title,
      content_type: 'product',
      content_id: params.content_id || params.ad_campaign || params.landing_name || '',
      description: params.page_title || document.title || '',
      experiment_id: params.experiment_id,
      landing_name: params.landing_name,
      landing_type: params.landing_type,
      creative_id: params.creative_id,
      utm_source: params.utm_source,
      utm_medium: params.utm_medium,
      utm_campaign: params.utm_campaign,
      utm_content: params.utm_content,
      ad_type: params.ad_type,
      ad_campaign: params.ad_campaign,
      ad_destination: params.ad_destination,
      ad_slot: params.ad_slot,
      ad_slot_name: params.ad_slot_name,
      ad_network: params.ad_network,
      ad_format: params.ad_format,
      button_name: params.click_name || name,
      click_action: params.click_name || name,
      click_category: (name === 'ad_click' || isRevenueAdClick) ? 'ad' : (name.includes('click') ? 'content' : 'page')
    });
    if (['page_view', 'landing_view'].includes(name)) window.ttq.track('ViewContent', props);
    if (['content_click', 'ad_click', 'adsense_slot_click_attempt', 'form_submit', 'funnel_step_click'].includes(name)) window.ttq.track('ClickButton', props);
    if (name === 'ad_click' || isRevenueAdClick) {
      const customName = props.ad_type === 'house' && props.ad_campaign === 'war_inc_rising' ? 'WarIncAdClick' : 'SponsoredAdClick';
      window.ttq.track(customName, props);
    }
    return true;
  }

  function track(name, params = {}) {
    const enriched = cleanParams({
      ...context,
      page_path: location.pathname,
      page_location: location.href,
      page_title: document.title,
      ...params
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, arcade_event: name, ...enriched });
    if (typeof window.gtag === 'function') window.gtag('event', name, enriched);
    dispatchTikTokEvent(name, enriched);
    if (name === 'adsense_slot_click_attempt') {
      dispatchGoogleAdsConversion('ad_click', enriched);
      return;
    }
    if (name !== 'ad_click') dispatchGoogleAdsConversion(name, enriched);
    if (isLocal) console.debug('[89GamesHubTracking]', { name, params: enriched });
  }

  window.ArcadeHubAnalytics = window.ArcadeHubAnalytics || {
    events: [],
    getContext() {
      return { ...context };
    },
    setContext(params = {}) {
      context = cleanParams({ ...context, ...params });
      return { ...context };
    },
    track(name, params = {}) {
      this.events.push({ name, params, ts: new Date().toISOString() });
      track(name, params);
    }
  };

  function syncSessionWindow(now = Date.now()) {
    try {
      const startedAt = Number(sessionStorage.getItem(sessionKey) || 0);
      const lastActivityAt = Number(sessionStorage.getItem(sessionLastActivityKey) || 0);
      const shouldReset = startedAt <= 0
        || startedAt > now
        || (lastActivityAt > 0 && (now - lastActivityAt) > SESSION_IDLE_RESET_MS)
        || (startedAt > 0 && (now - startedAt) > MAX_SESSION_WINDOW_MS);
      const nextStartedAt = shouldReset ? now : startedAt;
      sessionStorage.setItem(sessionKey, String(nextStartedAt || now));
      sessionStorage.setItem(sessionLastActivityKey, String(now));
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

  function normalizeAdSlot(el) {
    const slotName = el.dataset.adSlotName || el.getAttribute('data-ad-slot-name');
    if (slotName) return slugify(slotName);
    const explicit = el.dataset.adSlot || el.getAttribute('data-ad-slot');
    if (explicit) return slugify(explicit);
    const cls = typeof el.className === 'string' ? el.className : String(el.className || '');
    if (cls.includes('promo-ad-home')) return 'home_banner';
    if (cls.includes('detail-inline-ad')) return 'detail_inline_banner';
    if (cls.includes('preroll')) return 'preroll';
    if (cls.includes('short')) return 'shorts_ad';
    return slugify(cls, 'sponsored_ad');
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

  function isWarIncAd(el, href = '') {
    const text = String(el && el.textContent || '').toLowerCase();
    return href.includes('com.i89trillion.strategy.rising')
      || href.includes('apps.apple.com/us/app/war-inc-rising')
      || href.includes('war-inc-rising')
      || text.includes('war inc');
  }

  function normalizeWarIncLinks(root = document) {
    root.querySelectorAll('a[rel~="sponsored"], a.promo-ad, a.preroll-link, a.short-preroll-ad, [data-ad], [data-track-ad]').forEach((el) => {
      if (!el.href && !el.getAttribute('href')) return;
      const href = el.getAttribute('href') || el.href || '';
      if (!isWarIncAd(el, href)) return;
      el.href = getWarIncUrl();
      el.dataset.ad = 'house';
      el.dataset.adType = 'house';
      el.dataset.adNetwork = 'internal_cross_promo';
      el.dataset.adSlotName = el.dataset.adSlotName || 'house_banner_primary';
      el.dataset.adCampaign = 'war_inc_rising';
      el.dataset.adDestination = isIOSDevice() ? 'app_store' : 'google_play';
      el.dataset.offerId = isIOSDevice() ? 'warinc_app_store' : 'warinc_google_play';
    });
  }

  function buildClickParams(el, event) {
    const href = el.href || el.getAttribute('href') || '';
    const text = String(el.innerText || el.textContent || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 120);
    return cleanParams({
      click_name: el.dataset.clickName || el.dataset.trackName || el.dataset.go || el.id || '',
      click_text: text,
      click_target: el.dataset.go || el.getAttribute('target') || '',
      click_tag: el.tagName ? el.tagName.toLowerCase() : '',
      href,
      destination_url: href,
      content_id: el.dataset.contentId || '',
      content_type: el.dataset.contentType || '',
      x: event && Number.isFinite(event.clientX) ? event.clientX : undefined,
      y: event && Number.isFinite(event.clientY) ? event.clientY : undefined
    });
  }

  function buildAdParams(el) {
    const href = el.href || el.getAttribute('href') || '';
    const text = String(el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    const warInc = isWarIncAd(el, href);
    const destination = href.includes('apps.apple.com') ? 'app_store' : (href.includes('play.google.com') ? 'google_play' : 'external');
    const isAdsense = (el.dataset.adType || el.dataset.ad) === 'adsense' || el.matches('ins.adsbygoogle, .site-ad-slot-adsense');
    const adType = isAdsense ? 'adsense' : (warInc ? 'house' : (el.dataset.adType || el.dataset.ad || 'sponsored'));
    const adNetwork = isAdsense ? 'google_adsense' : (warInc ? 'internal_cross_promo' : (el.dataset.adNetwork || 'sponsored'));
    return cleanParams({
      ...buildClickParams(el),
      ad_href: href,
      ad_slot: normalizeAdSlot(el),
      ad_slot_name: el.dataset.adSlotName || normalizeAdSlot(el),
      ad_type: adType,
      ad_campaign: warInc ? 'war_inc_rising' : (el.dataset.adCampaign || 'sponsored'),
      ad_destination: el.dataset.adDestination || destination,
      ad_network: adNetwork,
      ad_format: normalizeAdSlot(el).includes('preroll') ? 'preroll' : 'banner',
      offer_id: warInc ? (destination === 'app_store' ? 'warinc_app_store' : 'warinc_google_play') : context.offer_id,
      ad_title: warInc ? 'War Inc: Rising' : text,
      conversion_event: 'ad_click'
    });
  }

  function isAdElement(el) {
    if (!el || !el.matches) return false;
    return el.matches('a[rel~="sponsored"], a.promo-ad, a.preroll-link, a.short-preroll-ad, [data-ad], [data-track-ad], ins.adsbygoogle, .site-ad-slot-adsense');
  }

  function urlFromElement(el) {
    const href = el && (el.href || el.getAttribute('href'));
    if (!href) return null;
    try { return new URL(href, location.href); }
    catch (_) { return null; }
  }

  function textFromElement(el, max = 120) {
    return String(el && (el.innerText || el.textContent || el.getAttribute('aria-label')) || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, max);
  }

  function inferIdFromUrl(url) {
    if (!url) return '';
    const queryId = url.searchParams.get('id');
    if (queryId) return slugify(queryId);
    const parts = url.pathname.replace(/\/index\.html$/i, '').split('/').filter(Boolean);
    const skip = new Set(['arcade-hub', 'arcadehub', 'RBS-shop', 'world-cup', 'matches']);
    return slugify(parts.find((part) => !skip.has(part) && !part.endsWith('.html')) || '');
  }

  function productFromId(id) {
    const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
    return products.find((product) => product.id === id) || null;
  }

  function productParams(id, el) {
    const product = productFromId(id) || {};
    return cleanParams({
      content_type: 'product',
      product_id: id,
      page_category: 'shop',
      funnel_category: 'shop_funnel',
      item_id: id,
      item_name: product.name || textFromElement(el),
      item_category: product.category || '',
      value: product.price,
      currency: product.price ? 'USD' : '',
      page_type: 'shop'
    });
  }

  function trackGameLink(target) {
    const url = urlFromElement(target);
    if (!url) return false;
    const href = url.href;
    const isDetail = href.includes('detail.html?id=');
    const isPlay = href.includes('play.html?id=');
    const isLaunch = href.includes('launch.html?id=');
    if (!isDetail && !isPlay && !isLaunch) return false;
    const gameId = inferIdFromUrl(url);
    const params = cleanParams({
      href,
      destination_url: href,
      content_type: 'game',
      content_id: gameId,
      game_id: gameId,
      page_category: 'game',
      funnel_category: 'game_funnel',
      game_link_type: isDetail ? 'detail' : (isPlay ? 'play' : 'launch'),
      click_text: textFromElement(target)
    });
    track('game_link_click', params);
    if (isPlay || isLaunch) track('game_start_intent', params);
    return true;
  }

  function quizIdFromElement(el) {
    if (el && el.dataset && el.dataset.quizId) return slugify(el.dataset.quizId);
    const url = urlFromElement(el);
    if (url) return slugify(url.searchParams.get('id') || '');
    return slugify(queryParams().get('id') || '');
  }

  function trackQuizClick(target) {
    const quizLink = target.closest('[data-quiz-id], a[href*="arcadequiz-play.html?id="]');
    if (quizLink) {
      const quizId = quizIdFromElement(quizLink);
      const params = cleanParams({ content_type: 'quiz', page_category: 'quiz', funnel_category: 'quiz_funnel', quiz_id: quizId, content_id: quizId, click_text: textFromElement(quizLink), href: urlFromElement(quizLink)?.href || '' });
      track('quiz_link_click', params);
      track('quiz_start_intent', params);
    }
    const answer = target.closest('[data-answer], [data-detail-answer]');
    if (answer) {
      const quizId = slugify(queryParams().get('id') || '');
      track('quiz_answer', cleanParams({
        content_type: 'quiz',
        page_category: 'quiz',
        funnel_category: 'quiz_funnel',
        quiz_id: quizId,
        content_id: quizId,
        answer_index: answer.dataset.answer || answer.dataset.detailAnswer,
        answer_text: textFromElement(answer)
      }));
    }
    if (target.closest('#quick-challenge')) track('quiz_quick_challenge', { content_type: 'quiz', page_category: 'quiz', funnel_category: 'quiz_funnel' });
    if (target.closest('#quiz-detail-again, #result-close')) track('quiz_control_click', { content_type: 'quiz', page_category: 'quiz', funnel_category: 'quiz_funnel', control_name: target.id || textFromElement(target, 40) });
    if (target.closest('[data-copy-share], [data-detail-copy-share], [data-copy-link]')) track('quiz_share_copy', { content_type: 'quiz', page_category: 'quiz', funnel_category: 'quiz_funnel', quiz_id: slugify(queryParams().get('id') || '') });
    if (target.closest('[data-share-result]')) track('quiz_share_click', { content_type: 'quiz', page_category: 'quiz', funnel_category: 'quiz_funnel', quiz_id: slugify(queryParams().get('id') || ''), share_method: navigator.share ? 'native_share' : 'clipboard' });
    if (target.closest('[data-download-card]')) track('quiz_result_download', { content_type: 'quiz', page_category: 'quiz', funnel_category: 'quiz_funnel', quiz_id: slugify(queryParams().get('id') || ''), asset_type: 'result_card' });
  }

  function trackWorldCupClick(target) {
    const pollButton = target.closest('[data-wc-poll] button');
    if (pollButton) track('worldcup_poll_vote', { content_type: 'world_cup', page_category: 'trend', funnel_category: 'trend_interaction', poll_choice: textFromElement(pollButton, 80) });
    const team = target.closest('[data-wc-team]');
    if (team) track('worldcup_team_select', { content_type: 'world_cup', page_category: 'trend', funnel_category: 'trend_interaction', team_id: team.dataset.wcTeam, team_name: textFromElement(team, 80) });
    const pick = target.closest('[data-wc-pick]');
    if (pick) track('worldcup_pick_select', { content_type: 'world_cup', page_category: 'trend', funnel_category: 'trend_interaction', pick_id: pick.dataset.wcPick, pick_text: textFromElement(pick, 80) });
    if (target.closest('[data-wc-lock-prediction]')) track('worldcup_prediction_lock', { content_type: 'world_cup', page_category: 'trend', funnel_category: 'trend_interaction' });
    if (target.closest('[data-wc-share], [data-wc-share-streak]')) track('worldcup_share_click', { content_type: 'world_cup', page_category: 'trend', funnel_category: 'trend_interaction', share_type: target.closest('[data-wc-share-streak]') ? 'streak' : 'prediction' });
    if (target.closest('[data-wc-copy]')) track('worldcup_share_copy', { content_type: 'world_cup', page_category: 'trend', funnel_category: 'trend_interaction' });
    if (target.closest('[data-wc-download]')) track('worldcup_asset_download', { content_type: 'world_cup', page_category: 'trend', funnel_category: 'trend_interaction', asset_type: 'profile_pic' });
    if (target.closest('[data-wc-demo-settle]')) track('worldcup_demo_settle', { content_type: 'world_cup', page_category: 'trend', funnel_category: 'trend_interaction' });
  }

  function trackShopClick(target) {
    const addCart = target.closest('[data-add-cart]');
    if (addCart) track('add_to_cart', productParams(addCart.dataset.addCart, addCart));
    const favorite = target.closest('[data-favorite]');
    if (favorite) track('add_to_wishlist', productParams(favorite.dataset.favorite, favorite));
    const buyNow = target.closest('[data-buy-now]');
    if (buyNow) track('begin_checkout', productParams(buyNow.dataset.buyNow, buyNow));
    if (target.closest('[data-checkout-cart]')) track('begin_checkout', { content_type: 'cart', page_category: 'shop', funnel_category: 'shop_funnel', page_type: 'shop' });
    if (target.closest('[data-open-cart]')) track('view_cart', { content_type: 'cart', page_category: 'shop', funnel_category: 'shop_funnel', page_type: 'shop' });
    const productLink = target.closest('a.product-link[href]');
    if (productLink) {
      const productId = inferIdFromUrl(urlFromElement(productLink));
      track('select_item', productParams(productId, productLink));
    }
  }

  function trackSpecializedPageView() {
    const params = queryParams();
    const path = location.pathname;
    if (context.page_type === 'game_page') {
      const gameId = inferIdFromUrl(new URL(location.href));
      const gameParams = cleanParams({ content_type: 'game', page_category: 'game', funnel_category: 'game_funnel', content_id: gameId, game_id: gameId, game_title: document.title });
      track('game_start', gameParams);
      track('content_start', gameParams);
    }
    if (path.includes('/arcade-hub/arcadequiz.html')) {
      track('quiz_feed_view', { content_type: 'quiz', page_category: 'quiz', funnel_category: 'quiz_funnel' });
    }
    if (path.includes('/arcade-hub/arcadequiz-play.html')) {
      const quizId = slugify(params.get('id') || '');
      track('quiz_detail_view', { content_type: 'quiz', page_category: 'quiz', funnel_category: 'quiz_funnel', quiz_id: quizId, content_id: quizId });
      if (!params.has('step') || params.get('step') === '0') track('quiz_start', { content_type: 'quiz', page_category: 'quiz', funnel_category: 'quiz_funnel', quiz_id: quizId, content_id: quizId });
    }
    if (path.includes('/arcade-hub/world-cup/')) {
      const matchId = path.includes('/matches/') ? slugify(path.split('/').pop().replace(/\.html$/i, '')) : '';
      track(matchId ? 'worldcup_match_view' : 'worldcup_hub_view', cleanParams({ content_type: 'world_cup', page_category: 'trend', funnel_category: 'trend_interaction', match_id: matchId }));
    }
    if (path.includes('/arcadehub/RBS-shop/')) {
      const productPage = document.querySelector('[data-product-page]');
      if (productPage) track('view_item', productParams(productPage.dataset.productPage, productPage));
      else track('shop_view', { content_type: 'shop', page_category: 'shop', funnel_category: 'shop_funnel', page_type: 'shop' });
    }
    if (path.includes('/ai-learning/')) track('solution_landing_view', { content_type: 'solution_landing', page_category: 'solution_landing', solution_vertical: 'ai_learning' });
    if (path.includes('/focus-test/') || path.includes('/speaking-confidence/')) track('problem_description_view', { content_type: 'problem_description', page_category: 'problem_description' });
    if (path.includes('/learning-guides/')) track('solution_landing_view', { content_type: 'solution_landing', page_category: 'solution_landing', solution_vertical: 'ai_learning', content_format: 'guide' });
    if (path.includes('/quiz-lesson-report/')) track('solution_landing_view', { content_type: 'solution_landing', page_category: 'solution_landing', solution_vertical: 'ai_learning', content_format: 'quiz_lesson_report' });
    if (path.includes('/phone-deals/')) track('phone_deal_view', { content_type: 'problem_description', page_category: 'problem_description' });
    watchQuizResult();
  }

  function watchQuizResult() {
    const result = document.querySelector('#quiz-result, #quiz-detail-result');
    if (!result || result.dataset.analyticsWatched) return;
    result.dataset.analyticsWatched = 'true';
    const sendResult = () => {
      if (result.hidden || result.dataset.analyticsResultSent) return;
      if (!result.textContent.trim()) return;
      result.dataset.analyticsResultSent = 'true';
      const quizId = slugify(queryParams().get('id') || '');
      track('quiz_result_view', { content_type: 'quiz', page_category: 'quiz', funnel_category: 'quiz_funnel', quiz_id: quizId, content_id: quizId });
    };
    const observer = new MutationObserver(sendResult);
    observer.observe(result, { attributes: true, childList: true, subtree: true });
    sendResult();
  }

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
    track('page_time', { engagement_time_sec: pageSeconds, page_time_sec: pageSeconds, engagement_reason: reason });
    track('site_session_time', { engagement_time_sec: siteSeconds, site_session_time_sec: siteSeconds, engagement_reason: reason });
  }

  function trackScrollDepth() {
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const depth = Math.min(100, Math.round((window.scrollY / maxScroll) * 100));
    [25, 50, 75, 90].forEach((threshold) => {
      if (depth >= threshold && !trackedScrollDepths.has(threshold)) {
        trackedScrollDepths.add(threshold);
        track('scroll_depth', { scroll_depth: threshold });
      }
    });
  }

  installGoogleTag();
  installTikTokPixel();
  syncSessionWindow(pageLoadAt);

  document.addEventListener('DOMContentLoaded', () => normalizeWarIncLinks());

  document.addEventListener('click', (event) => {
    markSessionActivity();
    const target = event.target && event.target.closest && event.target.closest('a, button, [role="button"], [data-go], [data-track-click], [data-ad], [data-track-ad]');
    if (!target) return;
    if (isAdElement(target)) {
      const params = buildAdParams(target);
      track('ad_click', params);
      if (params.ad_type === 'house') track('house_ad_click', params);
      if (params.ad_type === 'house' && params.ad_campaign === 'war_inc_rising') track('warinc_ad_click', params);
      return;
    }
    trackGameLink(target);
    trackQuizClick(target);
    trackWorldCupClick(target);
    trackShopClick(target);
    const clickParams = buildClickParams(target, event);
    const eventName = target.dataset && target.dataset.go ? 'funnel_step_click' : 'content_click';
    track(eventName, clickParams);
  }, true);

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!form || !form.matches || !form.matches('form')) return;
    track('form_submit', cleanParams({
      form_id: form.id || '',
      form_name: form.getAttribute('name') || '',
      form_action: form.getAttribute('action') || location.href
    }));
  }, true);

  window.addEventListener('load', () => {
    context = buildContext();
    normalizeWarIncLinks();
    track('page_view');
    track('landing_view');
    trackSpecializedPageView();
    const impressionElements = Array.from(document.querySelectorAll('a[rel~="sponsored"], a.promo-ad, a.preroll-link, a.short-preroll-ad, [data-ad], [data-track-ad], ins.adsbygoogle, .site-ad-slot-adsense'))
      .filter((el, index, list) => {
        if (el.matches('ins.adsbygoogle') && el.closest('[data-ad], .site-ad-slot')) return false;
        const parentAd = el.parentElement && el.parentElement.closest('[data-ad], [data-track-ad], .site-ad-slot-adsense');
        if (parentAd && parentAd !== el && list.includes(parentAd)) return false;
        return true;
      });
    impressionElements.forEach((el) => {
      const params = buildAdParams(el);
      track('ad_impression', params);
      if (params.ad_type === 'house') track('house_ad_impression', params);
      if (params.ad_type === 'house' && params.ad_campaign === 'war_inc_rising') track('warinc_ad_impression', params);
    });
    const activeStep = document.querySelector('[data-screen].active, [data-page].active');
    if (activeStep) {
      track('funnel_step_view', {
        funnel_step: activeStep.dataset.screen || activeStep.dataset.page,
        step_id: activeStep.id || ''
      });
    }
  });

  window.addEventListener('scroll', trackScrollDepth, { passive: true });
  window.addEventListener('scroll', markSessionActivity, { passive: true });
  window.addEventListener('focus', markSessionActivity);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') markSessionActivity();
    if (document.visibilityState === 'hidden') sendEngagement('visibility_hidden');
  });
  window.addEventListener('pagehide', () => sendEngagement('pagehide'));
})();
