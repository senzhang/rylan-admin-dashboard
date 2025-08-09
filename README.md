Rylan Admin Dashboard (React + TS)
一个“优秀初级 → 接近中级”水准的后台模板：包含 Users/Products CRUD、通用 DataTable、RBAC 权限、i18n 中英切换、深浅色主题、懒加载 + ErrorBoundary、Toast 通知、Vitest 示例。支持本地 Mock（localStorage），可无缝接入真实后端。

Live Demo · Issue · Roadmap


✨ 特性
🧭 模块化架构：routes / store / shared(ui|api|routers|i18n) / lib

👥 Users 模块：列表、搜索、弹窗表单（zod 校验）、删除确认、持久化

🛒 Products 模块：同上（含价格、库存、分类、状态、图片 URL）

📊 通用 DataTable：列定义渲染、空状态、操作区（支持扩展分页/排序/多选）

🔐 RBAC 权限：admin / editor / viewer，按钮和路由级别控制

🌙 主题：深/浅色切换并持久化（Tailwind dark class）

🌍 i18n：中文/英文即时切换（自带词典）

⚠️ 容错：路由懒加载、ErrorBoundary

🔔 Toast：全局轻量提示

🧪 测试：Vitest 示例（store & i18n）

🧱 技术栈
React 18 · TypeScript · Vite · TailwindCSS · Zustand · React Router v6 · react-hook-form · zod · Recharts · axios · Vitest

🚀 快速开始
bash
复制
编辑
# 安装依赖
npm i

# 开发启动
npm run dev

# 生产构建
npm run build
npm run preview

# 测试
npm run test
登录方式：访问 /login，任意账号/密码即可。
如果账号名是 admin / editor / viewer 会得到对应角色权限。

📂 目录结构
pgsql
复制
编辑
.
├── src
│   ├── routes
│   │   ├── DashboardPage.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── auth/LoginPage.tsx
│   │   ├── users/
│   │   │   ├── UsersPage.tsx
│   │   │   ├── users.store.ts
│   │   │   └── users.types.ts
│   │   └── products/
│   │       ├── ProductsPage.tsx
│   │       ├── ProductEditor.tsx
│   │       ├── products.store.ts
│   │       └── products.types.ts
│   ├── shared
│   │   ├── api/client.ts
│   │   ├── i18n/I18nContext.tsx
│   │   ├── routers/{ProtectedRoute,RequireRole,ErrorBoundary}.tsx
│   │   └── ui/{DataTable.tsx,toast.tsx}
│   ├── store/{auth.ts,theme.ts}
│   ├── lib/utils.ts
│   ├── main.tsx
│   └── index.css
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── README.md
🔧 配置点
主题初始化：在 src/main.tsx 首屏同步 localStorage.theme 到 html.classList，切换逻辑在 src/store/theme.ts。

权限：src/store/auth.ts

登录时，若账号名为 admin / editor / viewer，分配对应角色。

组件内用 <RequireRole roles={['admin']}>...</RequireRole> 控制按钮/区域可见。

i18n：src/shared/i18n/I18nContext.tsx

useI18n().t('key') 取词；右上角下拉切换语言（持久化）。

API 封装：src/shared/api/client.ts（axios）

如接后端：把 baseURL 改成你的服务地址；把 users.store.ts / products.store.ts 的 read/write 替换为异步请求即可。

DataTable：src/shared/ui/DataTable.tsx

通过 columns 描述渲染、actions(row) 提供操作按钮。分页/排序可在上层容器实现并传入。

🛡️ 角色与权限示例
角色	可见页面	操作权限
admin	全部	新增/编辑/删除
editor	全部	新增/编辑（无删除）
viewer	全部（只读）	无新增/编辑/删除，按钮不展示

🧪 测试
示例用例见：src/routes/users/users.store.test.ts、src/shared/i18n/i18n.test.ts

运行：

bash
复制
编辑
npm run test
📦 部署
推荐 Vercel：

Framework Preset: Vite

Build：npm run build

Output：dist

将链接加入 README 顶部（Live Demo），并上传几张 docs/*.png 截图。

🗺️ Roadmap
 DataTable：内置分页/排序/多选/导出 CSV

 导入 CSV（校验与错误行回显）

 TanStack Query 接入真实 API（缓存/重试/失效）

 E2E 测试样例（Playwright）

 更细粒度的权限（字段级/动作级）

 组件与样式库抽象（例如表单控件库）

🤝 贡献
欢迎 Issue/PR。代码风格：ESLint + TypeScript 严格模式，提交信息建议 type(scope): message。

📄 许可证
MIT（或按你的需要填写）

🇬🇧 English (Brief)
Rylan Admin Dashboard is a clean, extensible admin starter built with React + TypeScript + Vite. It ships with Users/Products CRUD, a reusable DataTable, RBAC, i18n (ZH/EN), dark/light theme, lazy routes + ErrorBoundary, toast notifications, and Vitest samples. Data is mocked via localStorage and can be swapped to real APIs easily.

Quick Start
bash
复制
编辑
npm i
npm run dev
Login at /login. Use username admin / editor / viewer to test different roles.

Highlights
Modular structure (routes / store / shared / lib)

Reusable DataTable

Role-based access control

Dark/Light theme with persistence

i18n (ZH/EN), lazy routes, ErrorBoundary

Axios client & Vitest samples

Deploy
Vercel → npm run build → output dist. Put the live link at the top of this README.