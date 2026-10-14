# Roadmap — Blog Cristopher

Branch atual: `feat/cms-layout`

## Em andamento — CMS (Sveltia) + layout novo

- [x] 0. Criar branch `feat/cms-layout`
- [x] 1. Página do painel (`public/admin/index.html`)
- [x] 2. Textos e links do site em `src/data/site.json`
- [x] 3. Configuração do painel (`public/admin/config.yml`)
- [x] 3b. Página Sobre editável (`src/content/paginas/sobre.md`)
- [ ] 3c. Política de privacidade editável e revisada para LGPD (`src/content/paginas/privacidade.md`)
- [ ] 4. Testar o painel localmente (modo "Work with Local Repository")
- [ ] 5. Layout novo (visual do mockup), lendo os textos do `site.json`
  - [ ] Fontes hospedadas no próprio site (sem Google Fonts)
  - [ ] `Layout.astro` (cabeçalho, rodapé, banner de cookies)
  - [ ] Banner de cookies no visual novo, com textos e ID do Analytics editáveis no painel
  - [ ] `index.astro` (Home)
  - [ ] `PostLayout.astro` (página do post)
  - [ ] Página Sobre e Política de Privacidade lendo de `src/content/paginas/`
  - [ ] Migrar posts para Content Collections (`src/content/posts/`) e remover `Astro.glob`
  - [ ] Categorias e tags montadas a partir dos posts
  - [ ] Feed RSS (`/rss.xml`)
- [ ] 6. Login no painel online (OAuth do GitHub + Worker gratuito na Cloudflare)
- [ ] 7. Remover o Notion (`sync-notion.mjs`, dependências, `COMO_POSTAR.md`)
- [ ] 8. Merge na `main` e publicação

## Backlog

- [ ] **E-mail de contato do blog** (ex.: `contato@cristopherlima.com.br`) via Cloudflare Email Routing (grátis), encaminhando para o e-mail pessoal. Necessário como canal LGPD na Política de Privacidade — atualizar a política quando estiver pronto.
- [ ] SEO: meta tags Open Graph, descrição por página, sitemap
- [ ] Busca no lado do cliente (substituir a busca atual no servidor)
- [ ] Newsletter (Buttondown ou Beehiiv) — ligar o bloco já previsto no `site.json`
- [ ] README completo no final
