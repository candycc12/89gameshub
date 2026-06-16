(function () {
  if (window.__ARCADE_GLOBAL_ADS_INSTALLED__) return;
  window.__ARCADE_GLOBAL_ADS_INSTALLED__ = true;

  const ADSENSE_CLIENT = 'ca-pub-5502975373459743';
  const ADSENSE_SLOTS = {
    home_top_display: '9312460378',
    detail_inline_display: '9859255284',
    play_below_game_display: '5923921267',
    guide_in_article_display: '1597621884',
    quiz_result_display: '1172840816'
  };
  const WAR_INC_GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.i89trillion.strategy.rising&listing=89gamehub&referrer=utm_source%3D89gamehub_website%26utm_medium%3Dreferral%26utm_campaign%3Dwarinc_site%26utm_content%3Dsite_warinc_ad';
  const WAR_INC_APP_STORE_URL = 'https://apps.apple.com/us/app/war-inc-rising/id6747767390?ppid=a4a6e47e-0a10-4194-a69b-9fadbfddacb6';

  function rootUrl(path) {
    const src = document.currentScript && document.currentScript.src;
    const root = src ? new URL('.', src).href : `${location.origin}/`;
    return new URL(path, root).href;
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

  function track(name, params) {
    if (window.ArcadeHubAnalytics && typeof window.ArcadeHubAnalytics.track === 'function') {
      window.ArcadeHubAnalytics.track(name, params || {});
    }
  }

  function inferPageKind() {
    const path = location.pathname.replace(/\/index\.html$/i, '/');
    const file = path.split('/').pop() || 'index.html';
    if (path.includes('/arcade-hub/detail.html')) return 'detail';
    if (path.includes('/arcade-hub/play.html')) return 'play';
    if (path.includes('/arcade-hub/arcadequiz')) return 'quiz';
    if (path.includes('/arcade-hub/world-cup/')) return 'article';
    if (path.includes('/learning-guides/') || path.includes('/phone-deals/')) return 'article';
    if (file === 'index.html' || path === '/' || path.endsWith('/arcade-hub/')) return 'home';
    return 'generic';
  }

  function adsenseSlotName() {
    const explicit = document.body && document.body.dataset.adsenseSlotName;
    if (explicit && ADSENSE_SLOTS[explicit]) return explicit;
    const kind = inferPageKind();
    if (kind === 'detail') return 'detail_inline_display';
    if (kind === 'play') return 'play_below_game_display';
    if (kind === 'quiz') return 'quiz_result_display';
    if (kind === 'article') return 'guide_in_article_display';
    return 'home_top_display';
  }

  function ensureAdSenseLoader() {
    const srcPart = `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    if (document.querySelector(`script[src*="${srcPart}"]`)) return;
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://${srcPart}`;
    document.head.appendChild(script);
  }

  function createAdSenseSlot(slotName) {
    const wrap = document.createElement('section');
    wrap.className = 'site-ad-slot site-ad-slot-adsense';
    wrap.dataset.ad = 'adsense';
    wrap.dataset.adType = 'adsense';
    wrap.dataset.adNetwork = 'google_adsense';
    wrap.dataset.adSlotName = slotName;
    wrap.setAttribute('aria-label', 'Advertisement');
    wrap.innerHTML = [
      '<span class="site-ad-label">Advertisement</span>',
      '<ins class="adsbygoogle"',
      '     style="display:block"',
      `     data-ad-client="${ADSENSE_CLIENT}"`,
      `     data-ad-slot="${ADSENSE_SLOTS[slotName]}"`,
      '     data-ad-format="auto"',
      '     data-full-width-responsive="true"></ins>'
    ].join('\n');
    return wrap;
  }

  function findAdSenseInsertionPoint() {
    return document.querySelector('[data-adsense-anchor]')
      || document.querySelector('main section:nth-of-type(2)')
      || document.querySelector('main')
      || document.body;
  }

  function placeAdSenseSlot() {
    document.querySelectorAll('ins.adsbygoogle').forEach((ins) => {
      const parent = ins.closest('[data-ad], .site-ad-slot') || ins.parentElement;
      if (parent) {
        parent.dataset.ad = parent.dataset.ad || 'adsense';
        parent.dataset.adType = parent.dataset.adType || 'adsense';
        parent.dataset.adNetwork = parent.dataset.adNetwork || 'google_adsense';
        parent.dataset.adSlotName = parent.dataset.adSlotName || parent.dataset.adSlot || 'adsense_display';
      }
    });
    if (document.querySelector('.site-ad-slot-adsense, ins.adsbygoogle')) return;
    ensureAdSenseLoader();
    const slotName = adsenseSlotName();
    const slot = createAdSenseSlot(slotName);
    const anchor = findAdSenseInsertionPoint();
    if (anchor === document.body || anchor.tagName === 'MAIN') anchor.appendChild(slot);
    else anchor.insertAdjacentElement('afterend', slot);
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
  }

  function createHouseBanner() {
    const link = document.createElement('a');
    link.className = 'promo-ad site-house-banner';
    link.href = getWarIncUrl();
    link.target = '_blank';
    link.rel = 'noopener sponsored';
    link.dataset.ad = 'house';
    link.dataset.adType = 'house';
    link.dataset.adNetwork = 'internal_cross_promo';
    link.dataset.adSlotName = 'house_banner_primary';
    link.dataset.adCampaign = 'war_inc_rising';
    link.dataset.adDestination = isIOSDevice() ? 'app_store' : 'google_play';
    link.dataset.offerId = isIOSDevice() ? 'warinc_app_store' : 'warinc_google_play';
    link.innerHTML = [
      '<span class="site-ad-label">Recommended</span>',
      `<img src="${rootUrl('arcade-hub/external-assets/war-inc/war-inc-banner-territory.png')}" alt="War Inc: Rising" loading="lazy" />`,
      '<span class="promo-copy">',
      `<img src="${rootUrl('arcade-hub/external-assets/war-inc/war-inc-icon.png')}" alt="" loading="lazy" />`,
      '<strong>War Inc: Rising</strong>',
      '<em>Build. Expand. Conquer.</em>',
      '</span>',
      '<b>Play Now</b>'
    ].join('');
    return link;
  }

  function normalizeHouseBanner(el) {
    el.dataset.ad = 'house';
    el.dataset.adType = 'house';
    el.dataset.adNetwork = 'internal_cross_promo';
    el.dataset.adSlotName = 'house_banner_primary';
    el.dataset.adCampaign = el.dataset.adCampaign || 'war_inc_rising';
    if (/war\s*inc/i.test(el.textContent || '') || String(el.href || '').includes('war-inc-rising') || String(el.href || '').includes('i89trillion.strategy.rising')) {
      el.href = getWarIncUrl();
      el.dataset.adCampaign = 'war_inc_rising';
      el.dataset.adDestination = isIOSDevice() ? 'app_store' : 'google_play';
      el.dataset.offerId = isIOSDevice() ? 'warinc_app_store' : 'warinc_google_play';
    }
  }

  function findHouseInsertionPoint() {
    return document.querySelector('[data-house-ad-anchor]')
      || document.querySelector('main section:nth-of-type(3)')
      || document.querySelector('main')
      || document.body;
  }

  function placeHouseBanner() {
    const banners = Array.from(document.querySelectorAll('a.promo-ad, a[rel~="sponsored"][data-ad-type="house"], a[data-ad="house"]'));
    banners.forEach(normalizeHouseBanner);
    banners.slice(1).forEach((el) => el.remove());
    if (banners[0]) return;
    const banner = createHouseBanner();
    const anchor = findHouseInsertionPoint();
    if (anchor === document.body || anchor.tagName === 'MAIN') anchor.appendChild(banner);
    else anchor.insertAdjacentElement('afterend', banner);
  }

  function installStyles() {
    if (document.getElementById('site-ads-styles')) return;
    const style = document.createElement('style');
    style.id = 'site-ads-styles';
    style.textContent = `
      .site-ad-slot{box-sizing:border-box;width:min(100% - 28px,1120px);margin:24px auto;padding:10px;border:1px solid rgba(120,130,150,.22);border-radius:12px;background:rgba(255,255,255,.04)}
      .site-ad-label{display:block;margin:0 0 6px;font:600 11px/1.2 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8a93a5}
      .site-house-banner{box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:16px;width:min(100% - 28px,1120px);min-height:140px;margin:24px auto;padding:18px;overflow:hidden;border-radius:16px;text-decoration:none;color:#fff;background:#111827;position:relative}
      .site-house-banner>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.55}
      .site-house-banner::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,7,18,.88),rgba(4,7,18,.24))}
      .site-house-banner .site-ad-label,.site-house-banner .promo-copy,.site-house-banner b{position:relative;z-index:1}
      .site-house-banner .promo-copy{display:grid;grid-template-columns:46px minmax(0,1fr);gap:10px;align-items:center}
      .site-house-banner .promo-copy img{width:46px;height:46px;border-radius:10px}
      .site-house-banner .promo-copy strong,.site-house-banner .promo-copy em{display:block}
      .site-house-banner .promo-copy strong{font:700 22px/1.1 Arial,sans-serif}
      .site-house-banner .promo-copy em{margin-top:4px;color:#d8e0ef;font-style:normal}
      .site-house-banner b{padding:10px 14px;border-radius:10px;background:#fff;color:#111827;font:700 14px/1 Arial,sans-serif}
      @media (max-width:700px){.site-house-banner{grid-template-columns:1fr;min-height:180px}.site-house-banner b{width:max-content}}
    `;
    document.head.appendChild(style);
  }

  function installAdSenseClickAttemptTracking() {
    document.addEventListener('pointerdown', (event) => {
      const slot = event.target.closest && event.target.closest('.site-ad-slot-adsense, [data-ad-type="adsense"]');
      if (!slot) return;
      track('adsense_slot_click_attempt', {
        ad_type: 'adsense',
        ad_network: 'google_adsense',
        ad_slot_name: slot.dataset.adSlotName || '',
        ad_slot: slot.querySelector('ins.adsbygoogle')?.dataset.adSlot || slot.dataset.adSlot || '',
        ad_format: 'display'
      });
    }, true);
  }

  document.addEventListener('DOMContentLoaded', () => {
    installStyles();
    placeAdSenseSlot();
    placeHouseBanner();
    installAdSenseClickAttemptTracking();
  });
})();
