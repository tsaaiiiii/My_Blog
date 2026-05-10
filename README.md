# Windy Tsai Personal Site

這是一個使用 Astro 建置的個人網站，內容包含個人首頁、專案整理與筆記分類頁。

## 技術使用

- Astro
- TypeScript
- CSS
- GitHub Actions
- GitHub Pages

## 本地開發

安裝依賴：

```bash
npm install
```

啟動開發環境：

```bash
npm run dev
```

檢查並建置：

```bash
npm run build
```

預覽建置結果：

```bash
npm run preview
```

## 專案結構

```txt
src/
  components/      共用元件
  content/         筆記內容
  data/            個人資料與專案資料
  layouts/         頁面 Layout
  pages/           Astro 頁面
  styles/          全站樣式

public/
  images/          網站圖片資源
```

## 筆記新增方式

筆記使用 Astro Content Collection 管理。

後續可以在 `src/content/notes` 底下依分類新增 Markdown 檔案，並在 frontmatter 設定標題、日期、分類與 tags。新增後會自動出現在筆記列表中，並依日期由新到舊排序。

## 部署

此專案已加入 GitHub Actions workflow：

```txt
.github/workflows/deploy.yml
```

當內容推送到 `main` 分支後，GitHub Actions 會自動執行：

```txt
npm ci -> npm run build -> deploy to GitHub Pages
```

目前部署設定對應：

```txt
https://tsaaiiiii.github.io/My_Blog/
```

## 備註

`node_modules`、`dist` 與 `.astro` 已透過 `.gitignore` 排除，不需要推到 GitHub。
