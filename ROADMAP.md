# Roadmap — Blog Cristopher

Branch atual: `feat/cms-layout`

## Em andamento — CMS (Sveltia) + layout novo

- [x] 0. Criar branch `feat/cms-layout`
- [x] 1. Página do painel (`public/admin/index.html`)
- [x] 2. Textos e links do site em `src/data/site.json`
- [x] 3. Configuração do painel (`public/admin/config.yml`)
- [x] 3b. Página Sobre editável (`src/content/paginas/sobre.md`)
- [x] 3c. Política de privacidade editável e revisada para LGPD (`src/content/paginas/privacidade.md`)
- [x] 4. Testar o painel localmente (modo "Trabalhar com Repositório Local", no Edge)
  - [x] Tags e stack como lista de itens
  - [x] Tabela e linha divisória no editor
  - [x] Botão "Código" com seleção de linguagem (componente próprio no `admin/index.html`)
  - [x] Imagem no post (testada com link externo)
  - [ ] Envio de imagem do computador para `public/images/` (testar no primeiro post real)
- [ ] 5. Layout novo (visual do mockup), lendo os textos do `site.json`
  - [x] 5.1 Coleções de conteúdo (`src/content.config.ts`)
  - [x] 5.2 Post de teste migrado para `src/content/posts/`
  - [x] 5.3 Fontes locais (Fontsource) e paleta no `tailwind.config.mjs`
  - [x] 5.4 `Layout.astro`: cabeçalho, rodapé, Open Graph, tema escuro forçado, cursor sempre piscando
  - [x] 5.4 Banner de cookies no visual novo (textos e ID do Analytics editáveis no painel; apaga cookies `_ga` ao recusar)
  - [x] 5.5 Home (`index.astro`) + funções de apoio (`src/lib/posts.ts`)
  - [x] 5.6 Página do post (`PostLayout.astro` + `pages/posts/[slug].astro`): realce de código (Shiki), botão copiar, sumário, caixa "Resumo", anterior/próximo
  - [x] Página Sobre no visual novo, lendo de `src/content/paginas/sobre.md`
  - [x] Política de Privacidade no visual novo, lendo de `src/content/paginas/privacidade.md`
  - [ ] 5.7 Categorias (`/categorias` e `/categorias/[slug]`) no visual novo, usando Content Collections
  - [ ] 5.7 Tags (`/tags` e `/tags/[slug]`) no visual novo
  - [ ] 5.7 Busca (`/busca`) no visual novo, sem `Astro.glob`
  - [ ] 5.7 Feed RSS (`/rss.xml`)
  - [ ] 5.7 Remover o `Astro.glob` restante e o `src/styles/global.css` (não usado)
- [x] Atalho do painel na área de trabalho (`scripts/abrir-painel.bat`)
- [x] Botão "Publicar" no painel: commit + push só do conteúdo (`scripts/publicar-plugin.mjs`)
- [x] Sveltia CMS local com versão travada (`scripts/copiar-sveltia.mjs`, sem unpkg)
- [ ] 6. Acesso ao painel fora do computador local (decidir: só local ou online com Cloudflare Access)
- [ ] 7. Remover o Notion (`sync-notion.mjs`, `new-post.mjs`, dependências `@notionhq/client`, `notion-to-md`, `dotenv`) e atualizar o `COMO_POSTAR.md`
  - [ ] Limpar o Tailwind 4 que não é usado (`@tailwindcss/vite`)
  - [ ] Rodar `npm audit` depois da limpeza
- [ ] 8. Merge na `main` e publicação

## Backlog

- [ ] **Proteger o acesso ao painel `/admin`** (depois de publicar tudo). Hoje só quem tem permissão de escrita no repositório do GitHub consegue salvar, mas a página do painel fica visível. Opções a avaliar:
  - Cloudflare Access (Zero Trust, grátis): só libera `/admin` para o meu e-mail ou para um certificado instalado no meu computador
  - Não publicar o painel: usar só localmente (`npm run dev` + "Repositório Local") — opção preferida até agora
- [ ] **E-mail de contato do blog** (ex.: `contato@cristopherlima.com.br`) via Cloudflare Email Routing (grátis), encaminhando para o e-mail pessoal. Necessário como canal LGPD na Política de Privacidade — atualizar a política quando estiver pronto.
- [ ] SEO: imagem padrão para compartilhamento (Open Graph), sitemap
- [ ] Newsletter (Buttondown ou Beehiiv) — ligar o bloco já previsto no `site.json`
- [ ] Atualizar o Astro (v5 → versão atual) com calma, numa branch separada
- [ ] README completo no final

## Como usar o painel (resumo)

1. Dois cliques no atalho **Blog** (área de trabalho) → abre o painel e sobe o servidor local.
2. Primeira vez: "Trabalhar com Repositório Local" → escolher `D:\PROJETOS\astro\blog-cristopher`.
3. Editar e clicar em **Salvar** (grava só na pasta local).
4. Clicar em **⬆ Publicar** → confere a lista → confirma (commit + push do conteúdo).
5. Para desligar o servidor: fechar a janela "Blog - servidor local".
