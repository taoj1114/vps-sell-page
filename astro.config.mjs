// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://vps-radar.pages.dev',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
});
