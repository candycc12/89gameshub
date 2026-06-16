# 89 Guide Page System Requirements

## 目标

统一 `89gameshub.com` 站内 Guide 类页面的品牌、结构、样式、数据打点和验收标准。

当前 Guide 页面分成三条内容线：

1. `89 APPS Guide`
2. `89 Deals Guide`
3. `89 Learning Guide`
4. `89 Sports Guide`

所有页面都必须：

- 解决真实用户问题
- 首屏快速给答案
- 结构适合 SEO 和 AI 搜索引用
- 移动端可读
- 不展示内部 tracking / SEO / 投放说明
- 有清晰的下一步 CTA
- 有统一的顶部和底部
- 有基础 schema
- 有可衡量的数据事件

## 三条 Guide 品牌线

### 1. 89 APPS Guide

用于 app 问题解决、官方下载、安全下载、登录/验证码/支付问题、app 对比。

Header brand：

```text
89 APPS Guide
```

Header tagline：

```text
APP PROBLEM GUIDES
```

适合页面：

- WhatsApp Not Working
- WhatsApp Official Download
- Telegram Not Sending Code
- Telegram Safe Download
- PayPal Login Problems
- PayPal Payment Pending
- Cash App Login Problems
- Is Cash App Safe
- PayByPhone App Not Working
- Waze vs Google Maps

页面重点：

- 30 秒答案
- Quick issue finder
- Checklist
- Official app / official help links
- Safety notes
- FAQ
- Related guides

必须避免：

- 假装官方页面
- 第三方 APK / cracked APK / mod APK
- 索要或建议分享验证码、密码、支付信息
- 用自制假 icon 冒充官方 icon

### 2. 89 Deals Guide

用于消费决策、deal、coupon、返现、羊毛、affiliate/outbound click 页面。

Header brand：

```text
89 Deals Guide
```

Header tagline：

```text
SMART BUYING GUIDES
```

适合页面：

- Best Cheap Phone Plans
- Best Cell Phone Deals
- Unlocked Phones vs Carrier Phones
- Trade-in Phone Deals
- Buy Now Pay Later Phones
- 什么值得买
- 什么值得薅羊毛
- Coupon / Cashback / Seasonal deal guides

页面重点：

- 用户是否值得买
- 对比表
- 月费 / 总成本 / 隐藏费用
- 优缺点
- 适合谁 / 不适合谁
- Deal 风险提醒
- Affiliate / outbound CTA
- Email capture

必须避免：

- 编造实时价格
- 编造官方优惠
- 过度承诺收益或省钱金额
- 诱导性金融表述
- 隐藏费用不披露

### 3. 89 Learning Guide

用于学习、AI learning、记忆、表达、专注、家庭教育、课程承接页面。

Header brand：

```text
89 Learning Guide
```

Header tagline：

```text
PRACTICAL LEARNING GUIDES
```

适合页面：

- AI learning
- How to improve memory
- How to speak more clearly
- How to stay focused while studying
- How to help a child speak clearly
- Parent / child learning guides
- Practice plan / checklist pages

页面重点：

- 练习步骤
- 时间计划
- 可执行 checklist
- 常见错误
- 进步判断
- Email capture
- Course / tool CTA

必须避免：

- 夸大教育效果
- 保证学习结果
- 医疗化诊断语言
- 焦虑营销

### 4. 89 Sports Guide

用于合法观看指南、streaming 对比、体育赛事观看路径、订阅选择页。

Header brand：

```text
89 Sports Guide
```

Header tagline：

```text
LIVE WATCH GUIDES
```

适合页面：

- Best Streaming Apps for Live Sports
- YouTube TV vs Hulu Live vs Sling vs Fubo
- Where to Watch NFL Games Today
- Where to Watch World Cup 2026
- Best Apps to Watch Football Without Cable

页面重点：

- 30 秒答案
- 观看路径对比
- 平台比较表
- 权益 / blackout / local channel 提醒
- 合法观看说明
- Official links
- Quiz CTA
- FAQ

必须避免：

- 非法直播引导
- IPTV piracy
- fake official wording
- 编造实时版权、实时赛程、实时价格
- 把 comparison 页写成新闻页

## 统一 Header

所有 Guide 页面顶部结构统一：

```html
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="../../../index.html" data-event="content_click" data-event-label="site_home" data-content-type="navigation" data-click-target="site_home">
      <strong>{Brand Name}</strong>
      <span>{Cluster Tagline}</span>
    </a>
    <nav aria-label="Page navigation">
      ...
    </nav>
  </div>
</header>
```

品牌映射：

```text
/guides/apps/        -> 89 APPS Guide | APP PROBLEM GUIDES
/guides/sports/      -> 89 Sports Guide | LIVE WATCH GUIDES
/phone-deals/        -> 89 Deals Guide | SMART BUYING GUIDES
/learning-guides/    -> 89 Learning Guide | PRACTICAL LEARNING GUIDES
/ai-learning/        -> 89 Learning Guide | PRACTICAL LEARNING GUIDES
/speaking-confidence/ -> 89 Learning Guide | PRACTICAL LEARNING GUIDES
/focus-test/         -> 89 Learning Guide | PRACTICAL LEARNING GUIDES
```

Header 要求：

- 桌面端显示品牌名和 tagline
- 移动端可以隐藏 tagline
- 不使用 logo 占位图
- 不展示内部项目名
- 不使用 `89 Games Hub` 作为 Guide 页面前台品牌

## 统一 Footer

Guide 页面底部只放站点基础链接。

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

- Disclosure 长文案
- tracking 参数说明
- SEO/GEO/AI 引用说明
- 投放测试说明
- 内部制作说明

如果页面需要独立性说明，放在相关模块中，例如 Apps Guide 的官方链接区：

```text
This guide is independent and is not an official {App Name} page.
```

## 通用页面模块

所有 Guide 页面优先使用以下模块：

1. Title tag
2. Meta description
3. Canonical
4. OG / Twitter metadata
5. H1
6. Short answer
7. Quick checklist 或 quick picker
8. Main content sections
9. Safety / caveats / hidden costs / common mistakes
10. CTA block
11. Email capture
12. FAQ
13. Related guides
14. Footer links
15. Article JSON-LD
16. FAQPage JSON-LD

## Apps Guide 页面结构

Apps Guide 推荐结构：

1. H1
2. Short answer
3. Quick issue finder
4. Quick checklist
5. AdSense in-article ad tag
6. Official app / official help links
7. Main fixes / steps
8. Safety notes
9. Alternatives or next steps
10. CTA block
11. Related guides
12. Email capture
13. FAQ

Apps Guide 必须有：

- 官方 app store / official help / official site
- 安全提醒
- FAQ
- Related guides
- `problem_description_view`
- 官方下载按钮打点

官方 app 下载按钮：

```text
Official APP Download
```

设备识别：

```text
Android -> Google Play
iPhone / iPad / iPod -> App Store deep link
Desktop -> App Store web page or official site
```

## Deals Guide 页面结构

Deals Guide 推荐结构：

1. H1
2. Opening answer：直接回答是否值得买 / 怎么选
3. Quick picks table
4. Main comparison table
5. Scenario recommendations
6. Hidden costs / catches
7. Deal risk notes
8. CTA / outbound / affiliate module
9. Email capture
10. Related deal guides
11. FAQ

Deals Guide 必须有：

- 对比表
- 隐藏费用或风险提醒
- 适合谁 / 不适合谁
- Affiliate / outbound CTA 打点
- 不编造实时价格

推荐 CTA：

```text
Compare current offers
Check official deals
See plan options
Get deal updates
```

## Learning Guide 页面结构

Learning Guide 推荐结构：

1. H1
2. Short answer
3. Practice plan 或 quick checklist
4. Step-by-step guide
5. Common mistakes
6. How to know it is working
7. Practice schedule
8. CTA / course / tool / email capture
9. Related learning guides
10. FAQ

Learning Guide 必须有：

- 可执行练习步骤
- 时间或频率建议
- 常见错误
- 不夸大结果
- Email capture 或 course/tool CTA

## Tracking 要求

所有 Guide 页面必须读取这些 URL 参数：

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

所有 Guide 页面必须设置 taxonomy：

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

通用事件：

```text
page_view
landing_view
content_click
funnel_step_click
form_submit
scroll_depth
page_time
site_session_time
ad_impression
```

Apps Guide 额外事件：

```text
problem_description_view
official_app_download_click
adsense_slot_click_attempt
```

Deals Guide 额外事件：

```text
outbound_offer_click
affiliate_click
deal_compare_click
email_submit
```

Learning Guide 额外事件：

```text
practice_plan_click
lesson_cta_click
email_submit
```

## 广告要求

如果页面接 AdSense：

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5502975373459743"
     crossorigin="anonymous"></script>
```

统一 in-article ad tag：

```html
<!-- guide_in_article_display -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-5502975373459743"
     data-ad-slot="1597621884"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

不要：

- 手动画广告框
- 放虚线框
- 放固定高度
- 放 `Advertisement placement reserved...`
- 用占位广告影响阅读

广告大小和样式交给 AdSense 控制。广告没填充时，页面不应该显示空白大框。

## 官方素材要求

Apps Guide 中的官方 icon / banner 必须来自：

- App Store
- Google Play
- 官方站点
- 可确认官方素材来源

要求：

- 下载到本地 `guides/apps/assets/`
- 页面引用本地文件
- 不直接依赖热链
- 不用自制首字母 icon
- 不用看起来像官方但来源不明的图

如果找不到官方素材，就不展示 icon/banner。

## SEO 和 Schema

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

FAQ 至少 5 个。

Title / meta / H1 不要堆词。

## 移动端要求

每页必须适配移动端：

- `page-shell` 单列
- hero 区单列
- card grid 单列
- CTA grid 单列
- 按钮 `width: 100%`
- 按钮允许换行
- 不允许横向滚动
- 图片不能撑出 viewport
- 广告不能出现固定空框
- H1 在手机端降低字号

## 内容质量要求

所有页面都必须：

- 使用英文
- 原创
- 清楚实用
- 短段落
- 有表格、checklist 或步骤
- 不写内部说明
- 不假装官方
- 不夸大效果
- 不编造实时信息

## 验收标准

每页完成后检查：

- URL 正确
- Title / meta / H1 合理
- 首屏有 short answer
- 页面结构符合对应 Guide 类型
- Footer 只有 Privacy / Terms / Contact
- 没有内部 debug 参数
- 没有底部 disclosure 长文案
- 有 FAQ
- 有 Related guides
- 有 Article schema
- 有 FAQPage schema
- JS 语法通过
- 移动端按钮不变形
- 无广告占位框
- 官方素材已本地化
- 官方链接已验证

## 本地检查命令

检查 JS：

```bash
node -e "const fs=require('fs'); const html=fs.readFileSync('{path}/index.html','utf8'); const scripts=[...html.matchAll(/<script(?![^>]*type=\"application\\/ld\\+json\")[^>]*>([\\s\\S]*?)<\\/script>/g)].map(m=>m[1].trim()).filter(Boolean); for (const s of scripts) new Function(s); console.log('inline scripts ok:', scripts.length);"
```

检查广告占位：

```bash
rg -n "Advertisement placement|border: 1px dashed|place-items: center|min-height: 120px" {path}/index.html
```

检查移动端关键 CSS：

```bash
rg -n "white-space: normal|@media \\(max-width: 640px\\)|width: 100%" {path}/index.html
```

检查 footer：

```bash
rg -n "Privacy|Terms|Contact|Disclosure|utm_source" {path}/index.html
```
