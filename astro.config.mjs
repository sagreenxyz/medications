import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://sagreenxyz.github.io',
  base: '/medications',
  output: 'static',
  integrations: [tailwind()],
});
