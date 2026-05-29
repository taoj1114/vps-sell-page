# 项目结构概览

本仓库是基于 Astro 5.0+ (Static) 构建的 VPS 推荐门户。

```text
/
├── src/
│   ├── components/       # 可复用 UI 组件
│   │   └── ui/           # 基础 UI (Navbar, Footer 等)
│   ├── content/          # Content Collections 数据源
│   │   └── vps/          # VPS 评测 Markdown 文件
│   ├── layouts/          # 页面布局模板 (Layout.astro)
│   ├── pages/            # Astro 页面路由
│   │   └── vps/          # 详情页路由 ([slug].astro)
│   └── styles/           # 全局样式 (global.css, Tailwind)
├── content.config.ts     # 数据集合 Schema 定义 (Zod)
├── astro.config.mjs      # Astro 配置文件
└── scripts/              # 辅助校验脚本
```

## 数据规范
所有新 VPS 评测需遵循 `content.config.ts` 中的 Zod Schema。
使用 `npx ts-node scripts/validate-vps.ts` 运行校验。
