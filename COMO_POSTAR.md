### 📝 Guia Rápido: Como Publicar no Blog

Sempre que quiser adicionar, editar ou remover um artigo do ar, siga este fluxo de 3 passos simples (A Regra do **Escreve, Sincroniza e Sobe**):

### Passo 1: Escrever no Notion (A Fonte da Verdade)

1. Abra a sua tabela "Posts Blog" no Notion.
2. Crie uma nova página e preencha **todas** as propriedades:
   - **Name:** O título do seu artigo.
   - **Description:** O resumo que vai aparecer no card.
   - **Category:** A categoria principal (ex: Tutorial).
   - **Tags:** As tags relacionadas (ex: python, backend).
   - **Data:** A data da publicação.
3. Escreva todo o conteúdo, cole suas imagens e revise o texto.
4. **O Gatilho:** Quando o texto estiver 100% pronto para ir ao ar, mude a coluna **Status** para **`Done`**.
   _(Dica: Se quiser tirar um post do ar, basta mudar o status dele de volta para Rascunho/Draft)._

### Passo 2: Sincronizar para o Computador

Agora você precisa "puxar" as novidades do Notion para o código do seu blog.

1. Abra o terminal (no VS Code) dentro da pasta do projeto `blog-cristopher`.
2. Rode o comando mágico:

   ```bash
   npm run sync
   ```

3. Aguarde o script terminar. Ele vai avisar que apagou os antigos, fez os downloads das imagens novas e gerou os arquivos `.md`.

_(Opcional: Se quiser ver como ficou antes de jogar para a internet, rode `npm run dev` e abra no navegador)._

### Passo 3: Enviar para o Ar (Commit e Push)

Com os arquivos novos na sua máquina, é hora de avisar o GitHub (e o Cloudflare) para atualizarem o site ao vivo.

1. No mesmo terminal, adicione as modificações:

   ```bash
   git add .
   ```

2. Crie o pacote com uma mensagem (mude o texto entre aspas para o que fizer sentido):

   ```bash
   git commit -m "add: novo post sobre webhook"
   ```

3. Mande para a nuvem:

   ```bash
   git push
   ```

🎉 **Pronto!** Em cerca de 1 a 2 minutos o Cloudflare vai reconstruir seu site e o post estará disponível para o mundo.
