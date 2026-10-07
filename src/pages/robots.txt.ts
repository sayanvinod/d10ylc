import type { APIRoute } from 'astro';
import { siteUrl } from '../content/site';

export const GET: APIRoute = () => {
  const allowIndexing = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';
  const directive = allowIndexing ? 'Allow: /' : 'Disallow: /';

  return new Response(
    `User-agent: *\n${directive}\n\nSitemap: ${siteUrl}/sitemap-index.xml\n`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
};
