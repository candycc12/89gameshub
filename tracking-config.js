// Global 89GamesHub tracking configuration.
// Keep this file at the site root so pages in any folder can share one setup.
window.ARCADE_TRACKING = window.ARCADE_TRACKING || {
  googleTagId: 'AW-11124436937',
  ga4MeasurementId: 'G-W9KB44PNFN',
  tiktokPixelId: 'D8BEO9JC77U7N1D0E6E0',
  googleAds: {
    conversionActions: {
      ad_click: {
        actionName: 'AC_Main_AR',
        optimizeFor: 'primary',
        value: 1,
        currency: 'USD',
        sendTo: 'AW-11124436937/ZKAqCP-EqKwYEMnfxbgp'
      },
      game_start: {
        actionName: 'game_start',
        optimizeFor: 'secondary',
        value: 1,
        currency: 'USD',
        sendTo: ''
      },
      campaign_landing_view: {
        actionName: 'campaign_landing_view',
        optimizeFor: 'observation',
        value: 0,
        currency: 'USD',
        sendTo: ''
      }
    }
  }
};
