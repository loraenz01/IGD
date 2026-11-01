import type { APIRoute } from 'astro';
import { IST_LIVE, SITE } from '../lib/site';

// Auf der Test-URL wird die Indexierung verhindert, nach dem Go-live erlaubt.
export const GET: APIRoute = () =>
  new Response(
    IST_LIVE
      ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
