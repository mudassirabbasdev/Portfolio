import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Stable vendor chunks cache across deploys (your own code changes far more often than these).
        // GSAP is deliberately NOT listed: it stays inside the lazy MaskedHeading chunk.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react';
          if (/node_modules\/(motion|motion-dom|motion-utils|framer-motion)\//.test(id)) return 'motion';
          return undefined;
        },
      },
    },
  },
});
