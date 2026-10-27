// ============================================================
// Coleções de conteúdo do blog
// Diz ao Astro ONDE estão os arquivos .md e QUAIS campos cada um tem.
// Se um post vier com campo errado (ex.: data inválida), o build avisa.
// ============================================================
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts: um arquivo .md por post, criados pelo painel
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    date: z.coerce.date(), // aceita "2026-10-14" e converte para data
    category: z.string().default('Geral'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false), // true = não aparece no site
    author: z.string().default('Cristopher Lima'),
  }),
});

// Páginas fixas: Sobre e Política de Privacidade
const paginas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paginas' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(), // usado na página Sobre
    updated: z.coerce.date().optional(), // usado na Política de Privacidade
  }),
});

export const collections = { posts, paginas };
