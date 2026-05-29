import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const vpsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vps' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    currency: z.string().default('USD'),
    cpu: z.number(),
    memory: z.number(), // in MB or GB
    storage: z.number(), // in GB
    bandwidth: z.string(),
    location: z.string(),
    tags: z.array(z.string()).optional(),
    affiliateLink: z.string().url(),
    rating: z.number().min(0).max(5),
    pubDate: z.date().or(z.string().transform((val) => new Date(val))),
  }),
});

export const collections = {
  'vps': vpsCollection,
};
