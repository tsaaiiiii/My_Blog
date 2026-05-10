export type ProjectCategory =
  | "產品實作"
  | "架構與維護性"
  | "後端與全端理解"
  | "協作與工程流程";

export type Project = {
  title: string;
  period: string;
  type: "個人專案" | "公司專案" | "協作專案";
  image?: string;
  imageAlt?: string;
  images?: { src: string; alt: string }[];
  summary: string;
  role?: string;
  highlights: string[];
  story?: {
    goal: string;
    design: string;
    challenge: string;
    learned: string;
  };
  areas: ProjectCategory[];
  tags: string[];
  links?: { label: string; href: string }[];
};

export const projectCategories: ProjectCategory[] = [
  "產品實作",
  "架構與維護性",
  "後端與全端理解",
  "協作與工程流程",
];

export const projects: Project[] = [
  {
    title: "Go Funny｜旅行分帳工具",
    period: "2026/4-仍在進行",
    type: "個人專案",
    images: [
      { src: "/images/projects/go-funny/1.png", alt: "Go Funny travel overview interface" },
      { src: "/images/projects/go-funny/2.png", alt: "Go Funny expense list interface" },
      { src: "/images/projects/go-funny/3.png", alt: "Go Funny split bill interface" },
      { src: "/images/projects/go-funny/4.png", alt: "Go Funny settlement interface" },
    ],
    summary:
      "以旅遊分帳為情境，建立前後端分工清楚的 MVP，涵蓋旅行、成員、費用、公費與結算流程。",
    highlights: [
      "使用 Node.js 建立後端服務，實作 API 與資料處理流程。",
      "規劃 API 設計、資料庫 schema 與商業邏輯分層。",
      "使用 Better Auth 實作帳號驗證流程，理解認證機制與 API 權限保護。",
      "透過實際操作理解從本地開發到雲端部署的完整流程。",
    ],
    story: {
      goal: "練習後端 API、資料庫 schema、認證權限、OpenAPI contract 與前端資料流程整合。",
      design:
        "後端採 Express、Prisma、PostgreSQL 與 Better Auth；前端採 React、Vite、TypeScript、Tailwind 與 React Router，先用 mock-backed state 驗證流程，再對齊後端 OpenAPI。",
      challenge:
        "分帳與公費兩種模式牽涉多角色、多資料表與權限條件，需要先把 service、controller、schema 與 access logic 拆清楚。",
      learned:
        "更理解 API contract、CORS、環境變數、資料關聯與權限保護如何影響前端設計。",
    },
    areas: ["後端與全端理解", "產品實作"],
    tags: ["TypeScript", "React", "Node.js", "Express", "Prisma", "PostgreSQL", "Better Auth", "OpenAPI"],
    links: [
      { label: "Live Demo", href: "https://go-funny.pages.dev/" },
      { label: "Repository", href: "https://github.com/tsaaiiiii/Go_Funny_Backend" },
    ],
  },
  {
    title: "FieldToTable｜菜單管理平台",
    period: "2026/2-仍在進行",
    type: "協作專案",
    images: [
      { src: "/images/projects/field-to-table/1.png", alt: "FieldToTable menu management overview" },
      { src: "/images/projects/field-to-table/2.png", alt: "FieldToTable menu item editing interface" },
      { src: "/images/projects/field-to-table/3.png", alt: "FieldToTable category management interface" },
      { src: "/images/projects/field-to-table/5.png", alt: "FieldToTable ordering preview interface" },
      { src: "/images/projects/field-to-table/4.png", alt: "FieldToTable restaurant settings interface" },
    ],
    summary:
      "以菜單管理為核心的 monorepo 專案，負責前端資料流、路由、API 協作與型別驗證。",
    highlights: [
      "使用 React.js 實作前端功能，負責畫面與互動邏輯設計。",
      "與後端協作串接 API，完成基本資料流程。",
      "了解 monorepo 架構與 shared package 的應用方式，透過 Turborepo 管理專案結構。",
      "參與 API 規格討論並負責前端資料流設計，整合 TanStack Router 與 TanStack Query。",
    ],
    story: {
      goal: "練習 React 生態、TanStack Router / Query、shared package 與 monorepo 協作方式。",
      design:
        "前端使用 React + Vite + TypeScript，搭配 TanStack Router、TanStack Query、Zustand 與 Zod；後端使用 Hono、Drizzle ORM 與 PostgreSQL。",
      challenge:
        "前後端 API 規格需要持續對齊，且 monorepo 中共用型別與 package 邊界要避免混亂。",
      learned:
        "理解資料請求快取、file-based routing、shared package 與 team skills 管理如何改善協作效率。",
    },
    areas: ["產品實作", "協作與工程流程"],
    tags: ["React", "TypeScript", "TanStack Router", "TanStack Query", "Zod", "Turborepo", "Hono", "Drizzle"],
    links: [
      { label: "Live Demo", href: "https://field-to-table.pages.dev" },
      { label: "Repository", href: "https://github.com/EeveeBag/Field-To-Table" },
    ],
  },
  {
    title: "AI Agent 產品｜WebChat 與後台功能",
    period: "2025/3-2025/8",
    type: "公司專案",
    image: "/images/projects/ai-agent.png",
    imageAlt: "AI agent product interface",
    summary:
      "負責 WebChat AI 聊天視窗模組與後台 UI 功能，並推動 JS 專案導入 TypeScript。",
    role: "前端工程師",
    highlights: [
      "主導 JS 專案導入 TypeScript，重構核心模組與資料夾結構，提升程式碼可維護性。",
      "開發 WebChat AI 聊天視窗模組與後台 UI 功能，處理動態資料渲染與使用者互動邏輯。",
      "與後端、設計、前端成員協作制定功能規格與 UI 流程，確保需求與開發時程一致。",
    ],
    areas: ["架構與維護性", "產品實作", "協作與工程流程"],
    tags: ["Vue 3", "TypeScript", "Element Plus", "Quasar", "AI Chat", "Refactor"],
  },
  {
    title: "叫號機系統｜重新開發與部署",
    period: "2024/9-2024/10",
    type: "公司專案",
    image: "/images/projects/queue-system.png",
    imageAlt: "Queue system interface",
    summary:
      "獨立重新開發內部叫號機系統，負責需求理解、前端實作、monorepo 整合與線上部署。",
    role: "前端工程師",
    highlights: [
      "獨立重新開發叫號機系統，負責功能設計、前端實作與線上部署。",
      "撰寫 GitHub Actions CI/CD 工作流，實現自動化建置與部署。",
      "整合至既有 monorepo 架構，確保系統穩定上線並滿足內部實際需求。",
    ],
    areas: ["產品實作", "協作與工程流程"],
    tags: ["Vue 3", "TypeScript", "GitHub Actions", "CI/CD", "Monorepo"],
  },
  {
    title: "後台與線上點餐功能開發與維護",
    period: "2024/2-2025/2",
    type: "公司專案",
    image: "/images/projects/gudianbao-admin.png",
    imageAlt: "Dashboard and online ordering interface",
    summary:
      "參與後台與線上點餐系統開發，涵蓋訂單、分析報表、桌位設定、打卡紀錄與購物車等模組。",
    role: "前端工程師",
    highlights: [
      "參與後台開發，涵蓋訂單、分析報表、桌位設定與打卡紀錄等模組。",
      "開發線上點餐系統購物車相關功能。",
      "開發 Guideline 元件、後台數據報表呈現與 Excel 下載功能。",
      "使用 i18n 處理多國語系需求。",
    ],
    areas: ["產品實作", "架構與維護性"],
    tags: ["Vue 3", "TypeScript", "GitHub Actions", "i18n", "Dashboard"],
  },
  {
    title: "力合量前台網頁開發",
    period: "2023/11-2023/12",
    type: "公司專案",
    image: "/images/projects/powerax-quantum.png",
    imageAlt: "Powerax Quantum Electronic Corporation logo",
    summary:
      "以 Nuxt 3 建置公司官網，負責響應式版面、多國語系、互動表單與後端 API 串接。",
    role: "前端工程師",
    highlights: [
      "使用 Nuxt.js 建置官網，採用 SSR 方案提升 SEO 表現。",
      "實作響應式版面，支援多裝置瀏覽需求。",
      "使用 i18n 處理中英文多國語系。",
      "實作表單驗證、動態內容載入等互動功能，並串接後端 API。",
    ],
    areas: ["產品實作", "架構與維護性"],
    tags: ["Nuxt 3", "TypeScript", "SSR", "SEO", "i18n", "RWD", "API Integration"],
    links: [{ label: "Live Demo", href: "https://www.powerax.com.tw/zh-TW/" }],
  },
];
