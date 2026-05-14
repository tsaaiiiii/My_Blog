---
title: "從 Webpack 到 Vite：理解前端打包與開發流程"
description: "整理前端打包的用途、歷史演進，以及 Webpack 與 Vite 的差異。"
category: frontend
tags: ["Bundler", "Webpack", "Vite"]
date: 2026-05-13
draft: false
---

## 打包是什麼

> **把分散在多個檔案的模組，合併成少量（通常是一個或幾個）檔案的過程。**

除了自己撰寫的模組會被集中打包以外，像是如果用到第三方套件其中一個功能，例如使用 lodash 的 `cloneDeep`，此時打包工具會把第三方套件 `cloneDeep` 那一段的模塊，跟自己撰寫的模組一起被打包。

所以在 CI 時就會需要執行 npm install，才可以拿到第三方套件的模塊

```markdown
source code (src/)
↓ ci/本地開發: node_modules/ （install 來的第三方）
↓
build 工具跑一輪（編譯 + 打包 + 壓縮）
↓
dist/ ← 最終產物，直接部署
```

## 歷史演進

### ~2010 以前：沒有打包工具的年代

```markdown
- 直接寫一堆 <script> 標籤手動排順序
- 全部寫在 global 就對了

順序很重要

 <head>
    <script src="jquery.js"></script>
    <script src="jquery.plugin.js"></script>
    <script src="app.js"></script>
 </head>
```

### 2009：`Node.js` 出現

帶來 CommonJS 模組系統（require）。但這是給後端用的，瀏覽器還是不認得 require。

### 2011：`Browserify`

第一個流行的「打包工具」出現了。它的賣點就是：讓你**在瀏覽器也能用 Node 的 `require`**。把 CommonJS 編譯成瀏覽器能跑的格式。

```markdown
const { add } = require('./math')

1. 把每個模組包進 function 裡，讓每個檔案都有自己的作用域，例如 module、exports、require。
2. 把多個模組塞進同一個檔，並讓它們還能互相找到對方
```

### 2014：`Webpack`

SPA 興起、要打包 CSS、圖片，開發者希望直接 `import './style.css'`、`import logo from './logo.png'`，讓元件跟資源綁在一起。

**Webpack** 不只打包 JS，連 CSS、圖片、字型都能納入打包流程，從此「前端 build」幾乎等於「webpack」。

### 2020：為提升速度跟效能

**Vite**：用 native ESM + Rolldown（現在），改變 dev server 體驗

## 那為何要打包？？

<aside>
現在雖然瀏覽器已經可以支援 ESM，但之所以還需要打包工具是因為

- 瀏覽器看不懂第三方套件的引入，因為第三方套件通常是用套件名稱引入
  ```js
  import cloneDeep from "lodash/cloneDeep";
  ```
- 編譯 TS / JSX
- Tree shaking
- minify（壓縮）
- code splitting（程式碼分割，可以按需載入）
- 請求數還是越少越好

| 情境           | 總大小 | 請求數 | 載入時間                 |
| -------------- | ------ | ------ | ------------------------ |
| 1 個 bundle.js | 500KB  | 1      | 較快                     |
| 100 個小檔案   | 500KB  | 100    | 較慢（每個都要握手等待） |

</aside>

## Webpack

> **Webpack 本體是用 JavaScript 寫的，跑在 Node.js 上**。
> 本體只是個**打包器**，不負責編譯、不負責壓縮、不負責跑 dev server。它能變成「構建工具」是因為**透過 loader / plugin 把其他工具串起來**。

> 一般來說，Webpack 會把多個 module 包進一個 bundle，把每個 module 轉成函式，並用自己的 runtime 管理載入與執行；最後通常會用 IIFE 包住整個 bundle，讓瀏覽器可以直接執行，同時避免污染全域作
> 用域。

來説説什麼是**構建工具**，他是一個完整的工具箱，也就是上述講到的那些壓縮、tree shaking… 都是一個個的工具，而 Webpack 的本體是打包器，意思就是原本也只是其中一種工具，叫做打包工具，最後才慢慢變成「構建工具」

```text
構建工具 = webpack（打包核心）
                + babel-loader / ts-loader（編譯）
                + css-loader、style-loader（樣式）
                + asset modules（資源）
                + TerserPlugin（壓縮）
                + webpack-dev-server（開發）
                + HtmlWebpackPlugin（HTML 產出）
                + ...

補充：
loader： Webpack 只懂 JS，遇到 TS / CSS / 圖片就處理不了，所以透過 loader，調整成讓 webpack 可以識別的檔案
plugin: 在 webpack build 的某個時間點（開始打包、即將輸出、打包完成...）介入做事
```

<aside>

1. 統一模組格式
   ESM / CommonJS / AMD 都能用 → **Webpack 自己看得懂的模組**
2. 把「非 JS」也納入模組系統
   CSS、圖片、字型都 import → **用 loader 處理**
3. 產出可以給瀏覽器跑的 bundle -> **最後都變成單一 JS**（包含將 webpack 的 runtime 邏輯寫進去打包的檔案裡）
</aside>

## Vite

> 把 dev server + Rolldown + plugin 系統打包成一個產品，**開箱即用**。

兩種模式（依照開發環境）

- Dev 模式
- Prod 模式

```text
Vite
├── Dev 模式
│ ├── 依賴預打包 → Rolldown （會先將第三方套件預打包，第一次較久，後續就用快取）
│ ├── 即時轉譯 → Rolldown
│ └── dev server → vite 自己的
│
└── Prod 模式
   ├── 打包 → Rolldown
   └── minify(壓縮） → Rolldown
```

兩類檔案（依照特性）

- 依賴（`node_modules`）
  - 特性：較不容易變動、數量很多、各種都有（CommonJS、ESM）
- 自己寫的（`src/`）
  - 特性：容易變動、數量較少、通常已經是 ESM

| 類型                 | Dev 模式                       | Build 模式                                         |
| -------------------- | ------------------------------ | -------------------------------------------------- |
| 依賴（node_modules） | Rolldown 預打包 → `.vite/deps` | Rolldown 打包進 vendor chunk（第三方套件的輸出檔） |
| 自己寫的（src/）     | 不打包，按需 Rolldown 轉譯     | Rolldown 打包進 main chunk（自己 code 的輸出檔）   |

### 其實你早就在用

**1. npm scripts（最直接的接觸點）**

```jsx
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**2. Path alias（@/components） 用來解析路徑**

```jsx
import Button from "@/components/Button.vue";
```

```jsx
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**3. 開發時的 HMR（改檔案立刻看到變化）**

```text
存檔之後畫面不用刷新就更新——這就是 HMR（Hot Module Replacement），vite 的 dev server 在幫你做。

你存檔 App.vue
   ↓
Vite dev server 偵測到檔案變動
   ↓
Vite 重新處理受影響的 module
   ↓
透過 WebSocket 通知瀏覽器有 module 更新
   ↓
瀏覽器重新載入更新後的 ESM module
   ↓
由 Vue / React 的 HMR runtime 嘗試局部替換
   ↓
如果可以安全替換，畫面局部更新且 state 可能保留
   ↓
如果不能安全替換，就 fallback 成整頁 reload
```

## Webpack vs Vite

> Webpack 是「需要組裝的打包核心」，Vite 是「預先組好的整合方案」。

### 為什麼 Vite 可以比較快？

1. dev server 的啟動

   **Webpack**：從入口檔案 → 走完整個依賴圖 → 全部打包 → 才啟動 dev server

   ```jsx
   entry: src/index.js
                 │
                 ├─→ import './App'
                 │        │
                 │        ├─→ import './Header'
                 │        │        │
                 │        │        └─→ import 'lodash'
                 │        │
                 │        └─→ import './Footer'
                 │
                 └─→ import './style.css'

     某個沒被 import 的檔案，不會被打包
   ```

   **Vite**：瀏覽器請求到哪個模組，Vite 才即時處理哪個模組

   <aside>
     <ol>
       <li>啟動 dev server</li>
       <li>瀏覽器請求 <code>/src/main.ts</code>，Vite 才處理 <code>main.ts</code></li>
       <li>瀏覽器請求 <code>import</code> 來的 <code>App.vue</code>，Vite 才處理 <code>App.vue</code></li>
       <li>依此類推</li>
     </ol>
   </aside>

2. **HMR**

   Webpack：改檔 → 重建部分依賴圖 → 重新打包受影響的那一塊 → 推送

   Vite：改檔 → 重編譯這一個檔 → 推送 （本地開發只有第三方套件會打包，我寫的 `./src` 會按需編譯）

3. **工具的程式語言**

   Webpack：JS 寫的，跑在 Node.js 上（單執行緒）

   Vite 8：Rolldown（Rust）

### 什麼時候要用 Vite？什麼時候用 Webpack

**Vite**

- 新專案
- 用主流框架（React、Vue、Svelte）
- 目標瀏覽器是現代瀏覽器
- 想少寫設定

**Webpack**

- 需支援舊版瀏覽器
- 舊有的大型專案，已使用 webpack（遷移成本高）
- 有特殊 loader 需求，是 Vite 沒有提供的

### 共通點

- 使用模組化
- 都允許裝外部套件擴充

<section class="note-references" aria-labelledby="references">
  <h2 id="references">參考資料</h2>
  <ul>
    <li>
      <a href="https://cn.vite.dev/blog/announcing-vite8">Vite 8 官方公告</a>
    </li>
    <li>
      <a href="https://ithelp.ithome.com.tw/articles/10377149">iT 邦幫忙：Vite 與 Webpack 相關文章</a>
    </li>
    <li>
      <a href="https://notes.boshkuo.com/blog/vite-vs-webpack">Bosh 筆記：Vite vs Webpack</a>
    </li>
  </ul>
</section>
