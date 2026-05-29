# 标签自动分配逻辑指南

系统会根据你填写的 `title`、`location`、`routing` 和 `note` 字段中的关键词，自动为产品分配标签。为了确保产品出现在正确的筛选结果中，请参考以下关键词对照表：

## 1. 需求分类标签 (Deal Tags)

| 标签 | 触发关键词 (不区分大小写) | 逻辑说明 |
| :--- | :--- | :--- |
| **无限流量** | `unlimited`, `不限`, `无限`, `inf` | 出现在 `bandwidth` 或 `note` 中。 |
| **大硬盘** | `nvme`, `big`, `storage` | 或者 `storage` (GB) 数值大于等于 200。 |
| **中国优化** | `cn2`, `9929`, `4837`, `gia`, `china`, `premium`, `carrier`, `三网`, `优化`, `回国` | 出现在 `routing`, `title` 或 `note` 中。 |
| **Under $10/yr** | 无关键词 | 系统自动计算：如果 `price` (年付等值) <= 10。 |
| **限时** | 无关键词 | 只要填写了 `expiryDate` 字段即自动打标。 |

## 2. 地区分类标签 (Region Tags)

| 标签 | 触发关键词 (不区分大小写) |
| :--- | :--- |
| **美国 VPS** | `usa`, `united states`, `seattle`, `dallas`, `san jose`, `new york`, `los angeles`, `la`, `sj`, `us`, `美国`, `missouri` |
| **日本 VPS** | `japan`, `tokyo`, `osaka`, `jp`, `日本` |
| **欧洲 VPS** | `europe`, `london`, `amsterdam`, `frankfurt`, `paris`, `ljubljana`, `uk`, `de`, `nl`, `fr`, `欧洲` |
| **新加坡 VPS** | `singapore`, `sg`, `新加坡` |
| **香港 VPS** | `hong kong`, `hk`, `香港` |

---

## 示例：如何让一个产品同时拥有“美国 VPS”和“中国优化”标签？

在 `src/content/plans/xxx.md` 中这样写：

```yaml
products:
  - name: "Premium LAX"
    location: "Los Angeles, USA" # 触发：美国 VPS
    routing: "CN2 GIA"           # 触发：中国优化
    # ... 其他字段
```

## 推广链接是如何工作的？

1. 在 `providers` 文件中配置 `affiliateParam: "ref"` 和 `affiliateValue: "123"`。
2. 在 `plans` 文件中填写产品链接 `affiliateLink: "https://host.com/buy"`。
3. 详情页会自动生成：`https://host.com/buy?ref=123`。
