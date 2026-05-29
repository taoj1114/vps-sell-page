---
# ==========================================
# 商家背景模板 (src/content/providers/example.md)
# ==========================================

name: "商家名称"
website: "https://www.example.com/"
description: "一句话核心介绍"
intro: "详细的商家背景介绍。"
reviewLink: "https://www.example.com/reviews"
paymentMethods: ["PayPal", "Alipay"]
refundPolicy: "退款政策说明。"
affiliateParam: "ref"
affiliateValue: "12345"
testIP: "1.1.1.1" # 可选：测速 IP
testFile: "https://example.com/100mb.bin" # 可选：测速下载链接
---

# ==========================================
# 优惠活动模板 (src/content/plans/example-sale.md)
# ==========================================

title: "优惠活动名称"
provider: example
pubDate: 2026-06-01
expiryDate: 2026-08-31
products:
  - name: "产品名称"
    price: 9.99
    currency: "USD"
    cpu: 1
    memory: 1024
    storage: 20
    bandwidth: "1TB"
    location: "USA"
    routing: "CN2"
    billingCycle: "year"
    affiliateLink: "https://www.example.com/order"
    status: "active" # 'active' 或 'sold_out'
    note: "备注"
    couponCode: "SAVE20" # 可选：优惠码，仅在需要时添加
---
