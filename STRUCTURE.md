# 项目结构概览

本仓库是基于 Astro 5.0+ (Static) 构建的 VPS 推荐门户。

```text
/
├── src/
│   ├── components/       # 可复用 UI 组件
│   ├── content/          # Content Collections 数据源
│   │   ├── providers/    # 服务商背景资料 (.md)
│   │   └── plans/        # VPS 套餐详情 (.md)
│   ├── layouts/          # 页面布局模板
│   ├── pages/            # 页面路由
└── scripts/              # 校验脚本
```

## AI Agent 开发指南：添加新 VPS 计划
若要添加新的 VPS 计划，请遵循以下步骤以避免构建错误：

1. **查阅模板**：参考根目录下的 `PLAN_TEMPLATE.md`。
2. **创建文件**：在 `src/content/plans/` 目录下创建新的 `.md` 文件（请勿在 `src/content/plans/` 内创建模板文件！）。
3. **设置 Provider**：`provider` 字段必须引用 `src/content/providers/` 中已存在的文件名。
4. **校验数据**：创建完成后，执行以下命令验证 Schema：
   `npm run validate-vps`
5. **提交变更**：确认校验通过后提交并推送。
