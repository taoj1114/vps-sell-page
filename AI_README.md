# AI Agent 快速引导指南

欢迎接手本 VPS 推荐项目！本项目旨在高效、准确地管理 VPS 套餐评测。请按照以下协议进行交互：

## 1. 项目核心结构
- **数据源**: `src/content/providers/` (服务商背景), `src/content/plans/` (具体套餐).
- **前端**: `src/pages/` (列表页与详情页).
- **自动化**: `scripts/validate-vps.ts` (核心校验逻辑).

## 2. 添加 VPS 套餐的标准作业流程 (SOP)
在执行任何添加操作前，请务必执行以下步骤：

1. **查阅定义**: 读取 `src/content.config.ts` 以理解当前数据 Schema。
2. **创建文件**: 在 `src/content/plans/` 中创建新 `.md` 文件，必须引用 `src/content/providers/` 中存在的 `provider` ID。
3. **数据校验 (关键)**: 务必执行：
   ```bash
   npx ts-node scripts/validate-vps.ts
   ```
4. **提交变更**: 校验通过后，提交代码并推送。

## 3. 注意事项
- **不可直接使用模板**: 严禁在 `src/content/plans/` 下放置 `TEMPLATE.md` 或其他非 Markdown 数据文件，否则会破坏 Astro 的内容加载流程。
- **引用完整性**: 所有套餐的 `provider` 字段必须是有效的服务商 ID，否则校验脚本会报错。
- **静态部署**: 本项目使用 `@astrojs/cloudflare` 进行静态部署，构建产物即为最终部署内容。

---
*开始工作前，建议先阅读此文件，并确认当前项目环境是否正常。*
