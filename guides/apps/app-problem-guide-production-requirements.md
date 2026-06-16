# App Problem Guide Production Requirements

## 目标

在 `89gameshub.com` 站内制作一批英文 App 问题解决页，用于承接：

- Google Search 自然流量
- Google Ads 小预算测试
- AI 搜索引用
- Display ads
- 官方外链点击
- Email capture
- 后续 affiliate / outbound click 测试

App guide 页面前台品牌名统一显示：

```text
89 APPS Guide
```

这些页面不是 APK 下载页，不是破解页，也不是泛泛介绍页。每个页面必须解决一个真实搜索问题，并让用户在首屏 5 秒内知道下一步该做什么。

## 统一路径

```text
/guides/apps/{slug}/
```

示例：

```text
/guides/apps/paybyphone-not-working/
```

## URL 参数

页面必须读取并保留以下参数，用于投放和数据归因：

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
matchtype
country
page_type
creative_id
experiment_id
landing_name
```

示例投放 URL：

```text
https://89gameshub.com/guides/apps/paybyphone-not-working/?utm_source=google&utm_medium=cpc&utm_campaign=paybyphone_not_working_us&utm_term={keyword}&matchtype={matchtype}&country=us&page_type=app_problem_guide
```

## 页面定位

页面必须是英文。

页面必须：

- 解决真实搜索问题
- 使用清楚、实用、中立的 consumer guide 风格
- 不假装自己是官方页面
- 不提供破解 APK、第三方 APK、非官方危险下载
- 不出现 `download cracked APK`、`hacked app`、`mod APK` 等危险内容
- 对 payment / finance app 页面加入安全提醒、诈骗提醒、验证码提醒、官方支持提醒
- 移动端可读
- 适合 SEO 和 AI 引用

## 统一页面结构

每页按以下结构制作：

1. Title tag
2. Meta description
3. H1：直接命中搜索问题
4. Short answer：首屏 30 秒答案，5-8 行
5. Quick issue finder：用户选择问题类型，给出下一步建议
6. Quick checklist
7. Checklist 中插入第一个 in-article AdSense 广告位
8. Official app / official help 区块
9. Main fixes / steps
10. Safety notes
11. Alternatives or related guides
12. CTA block
13. Email capture
14. FAQ，至少 5 个
15. Related guides，至少 3 个
16. Footer：只放站点 Privacy / Terms / Contact 链接
17. Article JSON-LD
18. FAQPage JSON-LD

## 内容要求

每页建议 800-1200 英文词。

必须回答：

- 用户为什么会遇到这个问题
- 用户现在应该先检查什么
- 哪些情况不要继续尝试
- 哪些操作有安全风险
- 官方入口在哪里
- 如果官方 app 不可用，有什么替代方案
- 常见 FAQ 中的真实搜索问题

不要关键词堆砌，不要写营销腔，不要夸大，不要编造官方价格、状态、政策或功能。

## 官方入口区块

每个 App 页面必须有官方入口区块。

官方入口区块必须包含一句独立说明：

```text
This guide is independent and is not an official {App Name} page.
```

不要在页面底部单独放 Disclosure 模块。

如果页面涉及 app 下载或 app 修复，必须有官方下载 CTA。

主按钮文案统一：

```text
Official APP Download
```

如果已经确认官方商店链接，按钮不要跳官网中转页，必须直达官方商店：

- Android 用户：跳 Google Play 官方 app 页面
- iPhone / iPad / 非 Android 用户：默认跳 Apple App Store 官方 app 页面

如果没有确认到官方商店链接：

- 不要编造链接
- 主按钮改为 `Open official site`
- 跳官方站点或官方 help page

官方模块可以展示官方 icon / banner / logo，但必须来自：

- 官方站点
- 官方 app store
- 可确认的官方素材来源

不要自制假 icon，不要用自制首字母图标冒充官方 icon。

官方 banner/icon 卡片内尽量只展示官方视觉素材，不要放大段解释文字。

官方 icon / banner 不要直接依赖热链展示。制作流程必须：

1. 先确认素材来自官方 app store、官方站点或官方可确认来源
2. 下载到本地目录：

```text
guides/apps/assets/
```

3. 页面引用本地文件，例如：

```html
<img src="../assets/{app-name}-official-app-icon.jpg" alt="{App Name} official app icon" loading="lazy" />
```

4. 本地检查图片文件是否存在、是否能识别尺寸

如果找不到可确认官方素材：

- 不要放假 icon
- 不要用首字母图标
- 只保留官方按钮和官方链接

## 设备识别下载逻辑

官方下载按钮点击时按设备自动分流。

逻辑：

```text
Android -> Google Play
iPhone / iPad / iPod -> App Store
Mac with touch -> App Store
其他非 Android -> App Store 网页版或官方站点
```

不要页面加载后自动跳转。只在用户点击 `Official APP Download` 时跳转。

必须验证链接有效性：

- Google Play 链接必须是官方包名页面，例如 `https://play.google.com/store/apps/details?id={package}`
- App Store 链接必须来自 Apple lookup、官方站点或可确认 app id
- iOS 真机优先可以使用 `itms-apps://itunes.apple.com/app/id{app_id}`
- 桌面端要保留 `https://apps.apple.com/.../id{app_id}` 网页链接
- 不要只凭猜测写 package id 或 app id

按钮打点必须带：

```js
target_store
detected_platform
funnel_step = "official_app_download"
click_target = "official_app_download"
```

## 广告位要求

页面必须加载 AdSense 脚本：

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5502975373459743"
     crossorigin="anonymous"></script>
```

统一 in-article 广告单元：

```html
<!-- guide_in_article_display -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-5502975373459743"
     data-ad-slot="1597621884"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

广告位置：

- 第一个广告放在 `Quick checklist` 中，建议放在第 3 个 checklist 卡片后
- 可以保留第二个下半页广告位，放在 FAQ 或 Related guides 附近
- 不要在页面上展示内部 debug 参数说明
- 广告位需要可衡量曝光
- 不要给广告位加虚线框、背景色、固定高度或占位文案
- 不要写 `Advertisement placement reserved...`
- 广告大小和样式交给 AdSense 控制；如果广告未填充，页面不应该显示一个空框

广告事件：

```text
ad_impression
adsense_slot_click_attempt
```

广告打点字段：

```js
ad_unit = "guide_in_article_display"
ad_client = "ca-pub-5502975373459743"
ad_slot_id = "1597621884"
ad_network = "adsense"
ad_format = "auto"
```

## Tracking 要求

每页必须接入站内已有 tracking：

```html
<script src="../../../arcade-hub/tracking-config.js?v=5"></script>
<script src="../../../arcade-hub/site-utils.js?v=14"></script>
```

每页必须设置 page taxonomy：

```js
landing_name
page_category
page_type
landing_type
content_type
topic
intent
content_format
monetization_model
keyword_stage
experiment_id
creative_id
```

App problem guide 默认值：

```js
page_category = "problem_description"
content_type = "problem_description"
content_format = "seo_problem_page"
monetization_model = "mixed"
keyword_stage = "organic_validation"
```

每页必须触发或支持以下事件：

```text
page_view
landing_view
problem_description_view
content_click
funnel_step_click
form_submit
scroll_depth
page_time
site_session_time
ad_impression
adsense_slot_click_attempt
```

FAQ 展开事件：

```js
event = "content_click"
content_type = "faq"
click_target = "faq_expand"
```

Email capture 事件：

```js
event = "form_submit"
form_name = "email_capture"
```

Quick issue finder 提交事件：

```js
event = "form_submit"
form_name = "issue_finder"
```

## SEO 要求

每页必须有：

- Title tag
- Meta description
- Canonical URL
- OG title
- OG description
- OG URL
- Twitter card
- Article JSON-LD
- FAQPage JSON-LD

Title、meta、H1 不要重复堆词。

## FAQ 要求

每页至少 5 个 FAQ。

FAQ 必须覆盖真实用户搜索问题，例如：

- Why is this app not working?
- Why am I not receiving a code?
- Is this app safe?
- Should I reinstall the app?
- How do I contact official support?

FAQ 文案必须简短、直接、有用。

## Related Guides 要求

每页底部必须有 Related guides，至少链接 3 个相关页面。

优先链接同类页面：

- Messaging app 页面互链
- Payment app 页面互链
- Parking / navigation 页面互链
- Safety / download guide 页面互链

## 安全要求

Payment / finance app 页面必须提醒：

- 不要分享验证码
- 不要通过陌生链接登录
- 不要相信社交媒体上的“客服”
- 不要把卡号、密码、验证码输入到非官方页面
- 如果付款、登录、账户状态异常，优先打开官方 app / 官方站点 / 官方支持

Parking app 页面必须提醒：

- 不要假设停车 session 已经开始
- 必须确认 active session / receipt / confirmation number
- 保存 zone、license plate、time、receipt、confirmation number 截图
- 小心假 QR code、短信链接、搜索广告中的仿冒支付页

Download guide 页面必须提醒：

- 只使用官方 app store 或官方站点
- 不下载第三方 APK
- 不下载 cracked / mod / hacked app
- 不使用非官方验证码、登录、支付服务

## 前台展示限制

不要展示：

- 内部 tracking 参数列表
- 制作说明
- SEO/GEO/AI 引用目的
- “本页面用于投放测试”之类的内部说明
- 底部 Disclosure 模块

可以展示：

- 官方入口区的一句独立说明
- 安全提醒
- 正常用户可理解的广告/外链上下文

## Footer 要求

App guide 页面底部只放站点链接，不放单独说明文案。

统一 footer：

```html
<footer>
  <div class="footer-inner">
    <div class="footer-links" aria-label="Site links">
      <a href="../../../arcade-hub/privacy.html">Privacy</a>
      <a href="../../../arcade-hub/terms.html">Terms</a>
      <a href="../../../arcade-hub/contact.html">Contact</a>
    </div>
  </div>
</footer>
```

不要在 footer 放：

- disclosure 长文案
- tracking 参数说明
- 制作说明
- SEO/GEO/投放测试说明

## 移动端要求

每页必须针对手机端做实际适配，不只写基础 media query。

手机端规则：

- `page-shell` 单列
- `hero-inner` 单列
- checklist / fixes / related / CTA grid 单列
- 官方按钮组 `official-actions` 单列
- 所有 `.button` 在手机端 `width: 100%`
- 按钮允许换行：`white-space: normal`
- 长按钮文案不得撑出屏幕
- 官方 icon / banner 在手机端缩小
- H1 在手机端降低字号
- 不允许横向滚动
- 不允许按钮、图片、广告位超出 viewport

## 验收标准

每页完成后必须检查：

- URL 路径正确
- Title / meta / H1 不重复堆词
- 首屏有 short answer
- 内容至少 800-1200 英文词
- Checklist 中有广告位
- 官方 app 下载按钮直达官方商店或官方站点
- 官方 icon / banner 不自制
- 有 safety notes
- 有 FAQ
- 有 Related guides
- 有 Article schema
- 有 FAQPage schema
- Tracking taxonomy 完整
- CTA / FAQ / form / ad 都有 data attributes 或 JS tracking
- 不显示内部 debug 参数
- 不显示底部 Disclosure 模块
- Footer 只放 Privacy / Terms / Contact
- 官方 icon / banner 已本地化，不依赖热链
- 官方下载链接已验证：Android / iOS / desktop 都有明确目标
- JS 语法检查通过
- 移动端可读，按钮不变形，无横向滚动
- 不出现破解 APK、hacked app、第三方危险下载内容

## 本地检查命令

制作完成后至少运行：

```bash
node -e "const fs=require('fs'); const html=fs.readFileSync('guides/apps/{slug}/index.html','utf8'); const scripts=[...html.matchAll(/<script(?![^>]*type=\"application\\/ld\\+json\")[^>]*>([\\s\\S]*?)<\\/script>/g)].map(m=>m[1].trim()).filter(Boolean); for (const s of scripts) new Function(s); console.log('inline scripts ok:', scripts.length);"
```

再检查关键字段：

```bash
rg -n "problem_description_view|funnel_step_click|form_submit|ad_impression|adsense_slot_click_attempt|data-ad-slot=\"1597621884\"|Official APP Download" guides/apps/{slug}/index.html
```

检查官方图片文件：

```bash
file guides/apps/assets/{app-name}-official-app-icon.*
```

检查是否仍有外链官方图片或旧热链：

```bash
rg -n "googleusercontent|mzstatic|static\\.|cdn\\." guides/apps/{slug}/index.html
```

如果页面引用官方图片，应优先引用 `../assets/...` 本地文件。只有确实需要外链且本地化不可行时，才保留外链，并说明原因。

检查移动端关键 CSS：

```bash
rg -n "white-space: normal|@media \\(max-width: 640px\\)|official-actions|width: 100%" guides/apps/{slug}/index.html
```
