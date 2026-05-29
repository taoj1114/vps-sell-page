import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const providers = fs.readdirSync(path.join(process.cwd(), 'src/content/providers'))
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace('.md', ''));

const VPS_SCHEMA = z.object({
  title: z.string(),
  provider: z.string().refine(val => providers.includes(val), {
    message: `Provider must be one of: ${providers.join(', ')}`
  }),
  price: z.number().optional(),
  currency: z.string().default('USD'),
  cpu: z.number().optional(),
  memory: z.number().optional(),
  storage: z.number().optional(),
  bandwidth: z.string().optional(),
  location: z.string().optional(),
  routing: z.string().optional(),
  billingCycle: z.enum(['month', 'year']).default('year'),
  affiliateLink: z.string().url().optional(),
  products: z.array(z.object({
    name: z.string(),
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
    note: z.string().optional(),
  })).optional(),
  pubDate: z.date().or(z.string().transform((val) => new Date(val))),
  expiryDate: z.date().or(z.string().transform((val) => new Date(val))).optional(),
});

const contentDir = path.join(process.cwd(), 'src/content/plans');
const files = fs.readdirSync(contentDir);

let hasError = false;

files.forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(contentDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  const result = VPS_SCHEMA.safeParse(data);
  
  if (!result.success) {
    console.error(`❌ Error in ${file}:`, result.error.format());
    hasError = true;
  } else {
    console.log(`✅ Successfully validated: ${file}`);
  }
});

if (hasError) {
  process.exit(1);
}
