# Google Ads conversion tracking notes

Current observed conversion action in Google Ads:

- Conversion action: `AC_Main_AR`
- Source: Website
- Optimization: Other, Primary action
- Enhanced conversions: Managed through Google Tag

## Website events emitted by Arcade Hub

The site now pushes these events into `window.dataLayer` and also calls `gtag('event', ...)` when a Google tag is configured:

| Event | Meaning | Recommended Google Ads use |
| --- | --- | --- |
| `ad_click` | User clicked a sponsored ad placement on the site | Existing primary conversion mapping if you want to keep the old flow |
| `game_start` | A game iframe is actually launched after the pre-roll screen | Better optimization event for traffic quality |
| `campaign_landing_view` | A Demand Gen collection landing page loaded | Observation / remarketing signal |
| `game_detail_view` | A game detail page loaded | Observation signal |
| `game_link_click` | User clicked toward a game detail/play page | Observation signal |
| `search` | User searched the game catalog | Observation signal |

Every event includes useful parameters such as:

- `page_location`
- `page_path`
- `page_title`
- `landing_theme`
- `game_id`
- `game_title`
- `category`
- `ad_href`
- `ad_slot`

## How to connect the current Google Ads action

Edit `arcade-hub/tracking-config.js` after confirming the Google tag ID and conversion label.

```js
window.ARCADE_TRACKING = {
  googleTagId: 'AW-11124436937',
  googleAds: {
    conversionActions: {
      ad_click: {
        actionName: 'AC_Main_AR',
        optimizeFor: 'primary',
        value: 1,
        currency: 'USD',
        sendTo: 'AW-11124436937/ZKAqCP-EqKwYEMnfxbgp'
      }
    }
  }
};
```

If the Google Tag UI already maps custom events to conversion actions, you can leave `sendTo` empty and configure the trigger in Google Tag using event name `ad_click` or `game_start`.

## Recommendation for Demand Gen

Start with `ad_click` if the account has historical learning around `AC_Main_AR`. Once traffic is stable, test `game_start` as the primary conversion because it measures actual playable intent, not just an ad placement click.
