# GitHub Pages 部署 Arcade Hub

这个项目可以直接部署到 GitHub Pages。注意：不要只上传 `arcade-hub/`，必须上传整个当前目录，因为 `arcade-hub/games.json` 中的游戏入口会引用上一级的各个游戏文件夹。

## 推荐仓库名

如果你准备用自定义域名：

```text
89gameshub
```

如果你暂时不用自定义域名，也可以用：

```text
89gameshub.github.io
```

## 第一次上传

在当前目录运行：

```bash
git init
git add .
git commit -m "Initial Arcade Hub site"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/89gameshub.git
git push -u origin main
```

把 `YOUR_GITHUB_USERNAME` 换成你的 GitHub 用户名。

## 开启 GitHub Pages

进入 GitHub 仓库：

```text
Settings → Pages
```

选择：

```text
Source: Deploy from a branch
Branch: main
Folder: / root
```

保存后，GitHub 会给你一个访问地址，例如：

```text
https://YOUR_GITHUB_USERNAME.github.io/89gameshub/
```

如果仓库名是 `YOUR_GITHUB_USERNAME.github.io`，访问地址会是：

```text
https://YOUR_GITHUB_USERNAME.github.io/
```

## 设置自定义域名

如果你购买了：

```text
89gameshub.com
```

在 GitHub Pages 的 Custom domain 填：

```text
89gameshub.com
```

然后到 DNS 服务商设置记录。常见方式：

```text
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    YOUR_GITHUB_USERNAME.github.io
```

DNS 生效后，在 GitHub Pages 勾选：

```text
Enforce HTTPS
```

## 上线前更新 sitemap

如果使用 GitHub Pages 临时地址：

```bash
SITE_URL=https://YOUR_GITHUB_USERNAME.github.io/89gameshub npm run sitemap
npm run check:deploy
```

如果使用独立域名：

```bash
SITE_URL=https://89gameshub.com npm run sitemap
npm run check:deploy
```

然后提交更新：

```bash
git add robots.txt sitemap.xml
git commit -m "Update sitemap for production domain"
git push
```

## 本地预览

```bash
npm run preview
```

打开：

```text
http://127.0.0.1:4173/arcade-hub/index.html
```
