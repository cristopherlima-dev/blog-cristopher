# 🚀 Blog Pessoal - Cristopher Lima

Meu blog, onde publico as coisas que eu gosto.
O projeto utiliza **Server-Side Rendering (SSR)** para entregar conteúdo dinâmico com velocidade.

## 🛠️ Tecnologias Utilizadas

- **[Astro](https://astro.build/)** (v5.0+) - Framework web focado em conteúdo e performance.
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária rápida e responsiva.
- **[Cloudflare](https://pages.cloudflare.com/)** - Infraestrutura de hospedagem e Edge Computing.
- **Markdown** - Gerenciamento de conteúdo dos artigos.

## ✨ Funcionalidades

- **⚡ Renderização Híbrida/SSR:** Configurado com `@astrojs/cloudflare` no modo `server` para respostas dinâmicas rápidas.
- **📝 Sistema de Blog:** Artigos escritos em Markdown com suporte a metadados ricos (autor, data, descrição).
- **🗂️ Organização de Conteúdo:**
  - **Categorias:** Filtragem de posts por temas (ex: Carreira, Programação).
  - **Tags:** Sistema de etiquetas com contagem de artigos por tópico.
- **🔍 Busca Interna:** Pesquisa dinâmica que varre títulos, descrições e conteúdo dos posts em tempo real.
- **🏠 Home Dinâmica:** Destaque automático para o post mais recente e listagem cronológica dos demais.
- **🎨 Design Responsivo:** Layout limpo e adaptável para dispositivos móveis.

## 🚀 Como Rodar o Projeto

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/cristopherlima-dev/blog-cristopher
    cd blog-cristopher
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O site estará disponível em `http://localhost:4321`.

## 📂 Estrutura Principal

- `src/pages/` - Rotas do site (Home, Sobre, Busca, Tags, Categorias).
- `src/pages/posts/` - Arquivos `.md` com os artigos do blog.
- `src/layouts/` - Templates de layout (Base e Post).
- `wrangler.jsonc` - Configuração de deploy para o Cloudflare.

---

Feito com 💙 por **Cristopher Lima**.
