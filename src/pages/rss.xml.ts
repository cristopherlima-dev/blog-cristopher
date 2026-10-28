// ============================================================
// Feed RSS: /rss.xml
// Leitores de RSS (Feedly, Inoreader...) usam este endereço
// para avisar quando sai post novo. Gerado no build.
// ============================================================
import type { APIContext } from 'astro';
import site from '../data/site.json';
import { getPosts, urlDoPost } from '../lib/posts';

export const prerender = true;

// Protege caracteres especiais do XML (&, <, > e aspas)
const xml = (t = '') =>
  t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]!);

export async function GET(context: APIContext) {
  const base = context.site ?? new URL('https://www.cristopherlima.com.br');
  const posts = (await getPosts()).slice(0, 30); // os 30 mais recentes

  const itens = posts
    .map((p) => {
      const link = new URL(urlDoPost(p), base).href;
      const categorias = [p.data.category, ...p.data.tags].map((c) => `<category>${xml(c)}</category>`).join('');
      return `
    <item>
      <title>${xml(p.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <description>${xml(p.data.description)}</description>
      ${categorias}
    </item>`;
    })
    .join('');

  const corpo = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.titulo)}</title>
    <link>${base.href}</link>
    <description>${xml(site.descricao)}</description>
    <language>pt-BR</language>
    <atom:link href="${new URL('/rss.xml', base).href}" rel="self" type="application/rss+xml" />${itens}
  </channel>
</rss>`;

  return new Response(corpo, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
