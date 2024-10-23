import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), react()],
  vite: {
    optimizeDeps: {
      include: ['src/components/*.vue', 'gsap']
    }
  }
});