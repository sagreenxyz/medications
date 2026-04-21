import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  base: '/medications/',
  integrations: [svelte(), tailwind()],
});
