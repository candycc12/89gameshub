// Arcade Hub tracking configuration.
// Fill googleTagId / sendTo after confirming the Google tag ID and conversion label in Google Ads.
// Current Google Ads conversion action observed in account: AC_Main_AR.
window.ARCADE_TRACKING = {
  googleTagId: 'AW-11129215317',
  ga4MeasurementId: 'G-W9KB44PNFN',
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
