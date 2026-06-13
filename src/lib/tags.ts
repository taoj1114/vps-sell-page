import type { CollectionEntry } from 'astro:content';

export const getDealTags = (plan: CollectionEntry<'plans'>) => {
  const tags: string[] = [];
  const title = plan.data.title.toLowerCase();
  const product = getPrimaryProduct(plan);
  const bandwidth = product.bandwidth.toLowerCase();
  const routing = (product.routing ?? '').toLowerCase();
  const note = (product.note ?? '').toLowerCase();

  const isUnlimited = (str: string) => {
    const keywords = ['unlimited', '不限', '无限', 'inf'];
    return keywords.some(k => {
      if (/^[a-z0-9_]+$/i.test(k)) {
        return new RegExp(`\\b${k}\\b`, 'i').test(str);
      }
      return str.includes(k);
    });
  };

  if (isUnlimited(bandwidth) || isUnlimited(note)) {
    tags.push('无限流量');
  }

  // Exclude HostDare from "Big Disk" tag
  if (product.storage >= 200 && plan.data.provider.id !== 'hostdare') {
    tags.push('大硬盘');
  }

  const isChinaOptimized = (str: string) => {
    const keywords = ['cn2', '9929', '4837', 'gia', 'china', 'premium', 'carrier', '三网', '优化', '回国'];
    return keywords.some(k => {
      if (/^[a-z0-9_]+$/i.test(k)) {
        return new RegExp(`\\b${k}\\b`, 'i').test(str);
      }
      return str.includes(k);
    });
  };

  if (isChinaOptimized(routing) || isChinaOptimized(title) || isChinaOptimized(note)) {
    tags.push('中国优化');
  }

  const annualPrice = product.billingCycle === 'month' ? product.price * 12 : product.price;
  if (annualPrice <= 10) {
    tags.push('Under $10/yr');
  }

  if (plan.data.expiryDate) {
    tags.push('限时');
  }

  return tags;
};

export const getRegionTags = (plan: CollectionEntry<'plans'>) => {
  const tags: string[] = [];
  const title = plan.data.title.toLowerCase();
  const product = getPrimaryProduct(plan);
  const location = product.location.toLowerCase();
  const note = (product.note ?? '').toLowerCase();

  const checkWord = (keywords: string[]) => keywords.some(k => {
    if (/^[a-z0-9_]+$/i.test(k)) {
      const re = new RegExp(`\\b${k}\\b`, 'i');
      return re.test(location) || re.test(title) || re.test(note);
    }
    return location.includes(k) || title.includes(k) || note.includes(k);
  });

  if (checkWord(['usa', 'united states', 'seattle', 'dallas', 'san jose', 'new york', 'los angeles', 'la', 'sj', 'us', '美国'])) {
    tags.push('美国 VPS');
  }

  if (checkWord(['japan', 'tokyo', 'osaka', 'jp', '日本'])) {
    tags.push('日本 VPS');
  }

  if (checkWord(['europe', 'london', 'amsterdam', 'frankfurt', 'paris', 'ljubljana', 'uk', 'de', 'nl', 'fr', '欧洲'])) {
    tags.push('欧洲 VPS');
  }

  if (checkWord(['singapore', 'sg', '新加坡'])) {
    tags.push('新加坡 VPS');
  }

  if (checkWord(['hong kong', 'hk', '香港'])) {
    tags.push('香港 VPS');
  }

  return tags;
};

// Helper function duplicated here to ensure `getDealTags` and `getRegionTags` have access to it
function getPrimaryProduct(plan: CollectionEntry<'plans'>) {
  const [product] = plan.data.products ?? [];
  if (product) {
    return product;
  }
  return {
    name: plan.data.title,
    price: plan.data.price ?? 0,
    currency: plan.data.currency ?? 'USD',
    cpu: plan.data.cpu ?? 0,
    memory: plan.data.memory ?? 0,
    storage: plan.data.storage ?? 0,
    bandwidth: plan.data.bandwidth ?? '',
    location: plan.data.location ?? '',
    routing: plan.data.routing ?? '',
    billingCycle: plan.data.billingCycle ?? 'year',
    affiliateLink: plan.data.affiliateLink ?? '#',
    status: 'active' as const,
    note: '',
  };
}
