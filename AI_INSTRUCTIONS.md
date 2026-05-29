# AI Agent Data Extraction & Formatting Guide

This guide is designed for AI agents to understand how to crawl/parse a VPS promotion page and convert it into the specific Markdown format required for this project.

## 1. Goal
Extract structured data from a given VPS promo URL and generate two types of Markdown files: `provider` (if new) and `plan`.

---

## 2. Extraction Schema (What to look for)

When analyzing a promo page, identify the following:

### A. Provider Level (Proactive Research Required)
**Do not just copy text. Use Web Search or crawl the main site to synthesize a professional profile:**
- **Brand Name**: (e.g., CloudCone)
- **Official Website**: (The root domain)
- **Description**: A catchy 1-sentence summary of the brand's market position (e.g., "Industry leader in budget Los Angeles VPS").
- **Intro (Synthesis Required)**: A 3-5 sentence paragraph covering:
    1. Establishment year and headquarters.
    2. Primary datacenter locations and network specialty (e.g., "Multacom LA", "CN2 GIA focus").
    3. Technical unique selling points (e.g., "Hourly billing", "AWS-like VPC", "DDoS protection").
    4. Target audience (e.g., "Beginner friendly", "High bandwidth users").
- **Review Link**: Search for the most authoritative recent review or benchmark.
- **Payment Methods**: Confirm current support for regional methods (Alipay, etc.) via billing pages.
- **Refund Policy (Critical)**: Must find the latest TOS update. Summarize specific conditions (e.g., "Non-refundable for promos", "Balance-only refunds").
- **Affiliate Specs**: Identify tracking parameters (e.g., `ref`, `affid`).
- **Test IP & File**: Search for "Looking Glass" or "Speedtest" IP and download files.

### B. Promo/Plan Level (Activity Info)
- **Promo Title**: (e.g., "Hashtag 2026 Sale", "Black Friday 2025")
- **Duration**: Start Date (`pubDate`) and End Date (`expiryDate`).
- **Product List**: A collection of specific VPS configurations.

### C. Product Level (Specific Config)
- **Name**: (e.g., "SSD VPS 1")
- **Price**: (Numeric value + Currency)
- **Billing Cycle**: (`month` or `year`)
- **CPU**: (Core count)
- **Memory**: (MB or GB)
- **Storage**: (GB)
- **Bandwidth**: (TB or "Unlimited")
- **Location**: (e.g., "Los Angeles, USA")
- **Routing**: (Look for "CN2", "GIA", "9929", "Optimized")
- **Direct Link**: The specific URL for the "Order" or "Deploy" button.
- **Status**: Identify if "Out of stock" (`sold_out`) or "Buy now" (`active`).
- **Coupon Code**: (Optional) Search for a specific code needed at checkout.

### D. Affiliate Integration (MANDATORY & HIGH PRIORITY)
**The most important task is ensuring the User's Affiliate Code is used:**
1. **Identify**: Find the specific parameter the provider uses (e.g., `aff`, `ref`, `affid`).
2. **Verify Provider Config**: Ensure the `affiliateParam` and `affiliateValue` (the user's ID) are correctly set in the `provider` Markdown file.
3. **Automated Stitching**: The system is designed to automatically append the `affiliateValue` to every `affiliateLink` found in the `plan` files. AI must ensure the `provider` field in the `plan` Markdown exactly matches the filename of the corresponding `provider` file.
4. **No Link Leakage**: Never leave a link in its "raw" state without ensuring it belongs to a provider that has an affiliate ID configured.

---

## 3. Data Transformation Rules (Mapping to Project Logic)

### Tagging Logic (CRITICAL)
AI must ensure the following keywords are placed in `location`, `routing`, or `note` to trigger the UI filters:

| Category | Keywords to Use |
| :--- | :--- |
| **USA VPS** | `USA`, `US`, `United States`, `Missouri`, `Los Angeles`, `Seattle`, `San Jose`, `Dallas`, `New York` |
| **Japan VPS** | `Japan`, `Tokyo`, `Osaka`, `JP` |
| **Europe VPS** | `Europe`, `London`, `UK`, `Frankfurt`, `DE`, `Amsterdam`, `NL`, `Paris`, `FR` |
| **Singapore VPS** | `Singapore`, `SG` |
| **Hong Kong VPS** | `Hong Kong`, `HK` |
| **China Optimized**| `CN2`, `GIA`, `9929`, `4837`, `Direct Routing`, `Premium Network` |
| **Unlimited BW** | `Unlimited`, `Unmetered`, `Inf` |

---

## 4. Output Format

### Provider File (`src/content/providers/{id}.md`)
```yaml
---
name: "Official Brand Name"
website: "https://example.com"
description: "Professional 1-sentence summary."
intro: "Synthesized 3-5 sentence brand profile."
reviewLink: "https://benchmark.link/page"
paymentMethods: ["PayPal", "Alipay", "Credit Card"]
refundPolicy: "Latest summarized policy."
affiliateParam: "ref"
affiliateValue: "YOUR_ID"
testIP: "x.x.x.x"
testFile: "https://xxx/100mb.bin"
---
```

### Plan File (`src/content/plans/{slug}.md`)
```yaml
---
title: "Exact Promo Name"
provider: "{provider-id}"
pubDate: YYYY-MM-DD
expiryDate: YYYY-MM-DD
products:
  - name: "Product Name"
    price: 19.99
    currency: "USD"
    cpu: 2
    memory: 2048
    storage: 40
    bandwidth: "5 TB"
    location: "City, Country"
    routing: "Network Type"
    billingCycle: "year"
    affiliateLink: "THE_DIRECT_ORDER_URL"
    status: "active" # or "sold_out"
    note: "Helpful tip for tagging"
    couponCode: "OptionalCode"
---

Detailed description of promo rules...
```

---

## 5. AI Reasoning Flow
1. **Fetch & Crawl**: Access the promo URL and the root official domain.
2. **Proactive Search**: Execute a web search for "{Brand} company profile", "{Brand} refund policy", and "{Brand} speedtest IP".
3. **Parse Configs**: Extract all product configurations from the promo cards.
4. **Normalize & Map**: Standardize units and ensure `location` keywords match the project's tagging logic.
5. **Affiliate Verification**: Cross-check if the provider exists. If new, create it with the correct `affiliateParam`. If existing, double-check that the `affiliateValue` (User ID) is preserved and NEVER deleted.
6. **Synthesize Quality Content**: Write the `intro` and `description` in professional Chinese (default) or English.
7. **Output**: Generate the two Markdown files with full context.
