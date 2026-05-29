import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

const providers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/providers' }),
  schema: z.object({
    name: z.string(),
    website: z.string().url(),
    logo: z.string().optional(),
    description: z.string(),
  }),
});

const plans = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/plans' }),
  schema: z.object({
    title: z.string(),
    provider: reference('providers'),
    price: z.number(),
    currency: z.string().default('USD'),
    cpu: z.number(),
    memory: z.number(),
    storage: z.number(),
    bandwidth: z.string(),
    location: z.string(),
    routing: z.string().optional(),
    billingCycle: z.enum(['month', 'year']).default('year'),
    affiliateLink: z.string().url(),
    pubDate: z.date().or(z.string().transform((val) => new Date(val))),
    expiryDate: z.date().or(z.string().transform((val) => new Date(val))).optional(),
  }),
});

export const collections = {
  providers,
  plans,
};
