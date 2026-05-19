# Arcade Hub 部署说明

这个项目是一个静态网站，但不是只上传 `arcade-hub/` 文件夹。游戏入口在 `arcade-hub/games.json` 里大量使用 `../游戏目录/index.html`，所以正式部署时要把当前目录 `/Users/chen/Desktop/W-3-260/games` 作为网站根目录发布。

## 1. 本地预览

在项目根目录运行：

```bash
npm run preview
```

然后打开：

```text
http://127.0.0.1:4173/arcade-hub/index.html
```

## 2. 上线前生成 sitemap

把域名替换成你的正式域名：

```bash
SITE_URL=https://your-domain.com npm run sitemap
```

这会更新：

- `sitemap.xml`
- `robots.txt` 里的 Sitemap 地址

## 3. 上线前检查

```bash
npm run check:deploy
```

如果只剩 `YOUR_DOMAIN_HERE` 相关 warning，说明还没有填正式域名；部署前按第 2 步重新生成即可。

## 4. 推荐部署方式 A：Netlify

适合最快上线。

1. 登录 Netlify，新建站点。
2. 发布目录选择当前项目根目录，也就是 `/Users/chen/Desktop/W-3-260/games`。
3. Build command 使用：

```bash
python3 arcade-hub/scripts/generate_sitemap.py
```

4. Publish directory 使用：

```text
.
```

5. 环境变量设置：

```text
SITE_URL=https://your-domain.com
```

项目已经带了 `netlify.toml`，会自动处理首页入口、缓存头和基础安全头。

## 5. 推荐部署方式 B：Vercel

1. 导入当前项目根目录。
2. Framework Preset 选择 `Other` 或静态项目。
3. Build Command 可以留空，或使用：

```bash
python3 arcade-hub/scripts/generate_sitemap.py
```

4. Output Directory 留空或设为 `.`。
5. 环境变量设置：

```text
SITE_URL=https://your-domain.com
```

项目已经带了 `vercel.json`，根路径会转到 `/arcade-hub/index.html`。

## 6. 自己服务器 / Nginx

把整个 `/Users/chen/Desktop/W-3-260/games` 上传到服务器，例如：

```text
/var/www/arcadehub
```

Nginx 站点根目录指向这个目录，并把 `/` 指到 `index.html` 即可。不要只上传 `arcade-hub/`，否则游戏 iframe 会找不到上一级游戏目录。

## 7. 正式上线前最后确认

- 首页能打开：`/arcade-hub/index.html`
- 详情页能打开：`/arcade-hub/detail.html?id=BallSortPuzzle&lang=zh`
- 游戏页能打开并经过广告后启动：`/arcade-hub/play.html?id=BallSortPuzzle&lang=zh`
- 手机端侧边栏、搜索、分类正常
- `robots.txt` 和 `sitemap.xml` 里没有 `YOUR_DOMAIN_HERE`
