export const profile = {
  englishName: "Windy Tsai",
  role: "Frontend Engineer",
  email: "a0909513991@gmail.com",
  github: "https://github.com/tsaaiiiii",
  location: "New Taipei City, Taiwan",
  image: "/images/profile/windy-tsai.jpg",
  focus: [
    "後台產品流程與資料呈現",
    "TypeScript 導入與前端重構",
    "API 協作、資料流與狀態管理",
    "AI workflow、Code Review 與工程知識",
  ],
  stack: [
    "Vue 3",
    "TypeScript",
    "React",
    "Nuxt 3",
    "TanStack Query",
    "Node.js",
    "Prisma",
    "GitHub Actions",
  ],
};

export const noteCategories = [
  {
    slug: "frontend",
    title: "Frontend",
    description: "Vue、React、CSS、狀態管理與互動流程。",
  },
  {
    slug: "typescript",
    title: "TypeScript",
    description: "型別設計、重構策略、Zod、API 型別與維護性。",
  },
  {
    slug: "backend",
    title: "Backend",
    description: "Node.js、Express、Prisma、Auth、DB 與 API 分層。",
  },
  {
    slug: "testing",
    title: "Testing",
    description: "單元測試、元件測試、E2E、測試策略與品質回饋。",
  },
  {
    slug: "ai-workflow",
    title: "AI Workflow",
    description: "Codex、Claude、skills、PR review 與 AI 輔助開發流程。",
  },
  {
    slug: "deployment",
    title: "Deployment",
    description:
      "GitHub Actions、Cloudflare Pages、Render、環境變數與發布流程。",
  },
  {
    slug: "performance",
    title: "Performance",
    description: "前端效能、bundle、圖片最佳化、載入速度與 Lighthouse 指標。",
  },
  {
    slug: "frontend-security",
    title: "Frontend Security",
    description: "前端資安、XSS、CORS、Token 儲存、權限與表單安全。",
  },
] as const;
