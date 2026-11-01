// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Die Test-URL auf Netlify (*.netlify.app) wird beim Go-live durch die echte Domain ersetzt.
export default defineConfig({
  site: 'https://www.igdiessbach.ch',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/og-vorlage/') })],
  image: {
    // Bilder werden beim Build automatisch als WebP/AVIF in passenden Grössen erzeugt.
    responsiveStyles: true,
  },
});
