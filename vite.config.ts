import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const SITE_URL = 'https://leonardogonzalezcv.netlify.app';

/**
 * Emits sitemap.xml at build time so <lastmod> always reflects the deploy date
 * instead of whenever someone last remembered to edit the file by hand.
 */
function sitemap(): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${SITE_URL}/og-image.png</image:loc>
      <image:title>Leonardo González · Desarrollador full-stack</image:title>
    </image:image>
  </url>
  <url>
    <loc>${SITE_URL}/LeoCV.pdf</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemap()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 550,
  },
});
