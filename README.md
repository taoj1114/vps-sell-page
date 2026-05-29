# VPS Sell Page

一个基于 Astro 的静态 VPS 推荐站点。

## 主要功能

- 首页按卡片展示 VPS 套餐
- 详情页展示服务商信息、套餐参数和 Markdown 正文
- 通过 content collections 管理 `providers` 和 `plans`
- 支持过期优惠自动隐藏或提示

## 项目结构

- `src/content/providers/`: 服务商资料
- `src/content/plans/`: VPS 套餐内容
- `src/pages/`: 页面路由
- `src/components/`: 可复用组件
- `scripts/validate-vps.ts`: 套餐数据校验脚本

## 开发

```sh
npm install
npm run dev
```

## 构建

```sh
npm run build
```

## 校验套餐数据

```sh
npm run validate-vps
```

## 添加新套餐

1. 先在 `src/content/providers/` 中准备对应服务商文件。
2. 再在 `src/content/plans/` 中新增套餐 Markdown 文件。
3. 确保 `provider` 字段引用的是已存在的服务商 ID。
4. 执行 `npm run validate-vps` 检查数据。
