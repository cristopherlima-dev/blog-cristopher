// ============================================================
// Funções de apoio para posts, usadas em várias páginas
// (Home, página do post, categorias, tags, busca e RSS).
// ============================================================
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

// Posts publicados (sem rascunhos), do mais novo para o mais antigo
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Endereço do post no site
export const urlDoPost = (post: Post) => `/posts/${post.id}/`;

// Texto -> endereço amigável: "Banco de Dados" -> "banco-de-dados"
export function slugify(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // tira acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9#+]+/g, '-') // troca o resto por hífen (mantém c# e c++)
    .replace(/#/g, 'sharp')
    .replace(/\+/g, 'plus')
    .replace(/^-+|-+$/g, '');
}

// Datas: "02 out 2026" e "2026-10-02"
export const dataCurta = (d: Date) =>
  d.toLocaleDateString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric' }).replace(/\./g, '').replace(/ de /g, ' ');
export const dataIso = (d: Date) => d.toISOString().slice(0, 10);

// Tempo de leitura estimado (200 palavras por minuto, mínimo 1)
export function tempoDeLeitura(post: Post): string {
  const palavras = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(palavras / 200))} min`;
}

// Primeiro bloco de código do post (para a prévia do destaque na Home)
export function primeiroCodigo(post: Post, maxLinhas = 5): { lang: string; code: string } | null {
  const m = (post.body ?? '').match(/```([\w#+-]*)\n([\s\S]*?)\n```/);
  if (!m) return null;
  const linhas = m[2].split('\n');
  const code = linhas.slice(0, maxLinhas).join('\n') + (linhas.length > maxLinhas ? '\n…' : '');
  return { lang: m[1] || 'text', code };
}

// Lista de categorias ou tags com quantidade de posts, em ordem alfabética
export function contar(posts: Post[], campo: 'category' | 'tags') {
  const mapa = new Map<string, { nome: string; slug: string; total: number }>();
  for (const p of posts) {
    const valores = campo === 'tags' ? p.data.tags : [p.data.category];
    for (const nome of valores) {
      const slug = slugify(nome);
      const item = mapa.get(slug) ?? { nome, slug, total: 0 };
      item.total++;
      mapa.set(slug, item);
    }
  }
  return [...mapa.values()].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}
