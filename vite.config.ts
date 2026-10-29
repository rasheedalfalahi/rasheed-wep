import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import {
  generateSitemapXml,
  getAllStaticSeoRoutes,
  injectSeoIntoHtml,
} from './src/lib/seo';

function seoStaticPagesPlugin(): Plugin {
  return {
    name: 'seo-static-pages-generator',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (ctx.originalUrl) {
          const cleanPath = ctx.originalUrl.split('?')[0];
          return injectSeoIntoHtml(html, cleanPath);
        }
        return html;
      },
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const baseIndexHtmlPath = path.join(distDir, 'index.html');

      if (!fs.existsSync(baseIndexHtmlPath)) {
        return;
      }

      const baseHtml = fs.readFileSync(baseIndexHtmlPath, 'utf-8');
      const routes = getAllStaticSeoRoutes();

      for (const route of routes) {
        const relativeRoute = route.replace(/^\/+/, '');
        if (!relativeRoute) continue;

        const routeDir = path.join(distDir, relativeRoute);
        fs.mkdirSync(routeDir, { recursive: true });

        const tailoredHtml = injectSeoIntoHtml(baseHtml, route);
        fs.writeFileSync(path.join(routeDir, 'index.html'), tailoredHtml, 'utf-8');
      }

      // Automatically regenerate sitemap.xml with all current articles and projects
      const sitemapXml = generateSitemapXml();
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');

      const publicSitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
      if (fs.existsSync(path.dirname(publicSitemapPath))) {
        fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');
      }

      console.log(
        `[SEO Generator] Created ${routes.length} standalone HTML route pages with custom OpenGraph & Twitter meta tags.`
      );
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [
      seoStaticPagesPlugin(),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
