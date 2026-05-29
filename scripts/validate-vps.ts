import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const VPS_SCHEMA = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  currency: z.string().default('USD'),
  cpu: z.number(),
  memory: z.number(),
  storage: z.number(),
  bandwidth: z.string(),
  location: z.string(),
  tags: z.array(z.string()).optional(),
  affiliateLink: z.string().url(),
  rating: z.number().min(0).max(5),
  pubDate: z.date().or(z.string().transform((val) => new Date(val))),
});

const contentDir = path.join(process.cwd(), 'src/content/vps');
const files = fs.readdirSync(contentDir);

let hasError = false;

files.forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(contentDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  const result = VPS_SCHEMA.safeParse(data);
  
  if (!result.success) {
    console.error(`Error in ${file}:`, result.error.format());
    hasError = true;
  } else {
    console.log(`Successfully validated: ${file}`);
  }
});

if (hasError) {
  process.exit(1);
}
