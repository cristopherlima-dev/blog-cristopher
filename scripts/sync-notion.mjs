import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

dotenv.config();

// Verificação de segurança
if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
  console.error(
    "❌ ERRO: Faltam variáveis no arquivo .env (NOTION_TOKEN ou NOTION_DATABASE_ID)",
  );
  process.exit(1);
}

// Limpa aspas extras que o dotenv possa ter lido acidentalmente
const NOTION_TOKEN = process.env.NOTION_TOKEN.replace(/"/g, "");
const DATABASE_ID = process.env.NOTION_DATABASE_ID.replace(/"/g, "");

// Inicializa o cliente apenas para a conversão de Markdown
const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

// Função para criar a URL amigável
const slugify = (text) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

// Função para baixar as imagens do Notion localmente
async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filepath, buffer);
}

// Lida com as imagens que vierem no corpo do texto
n2m.setCustomTransformer("image", async (block) => {
  const { image } = block;
  const imageUrl = image.type === "file" ? image.file.url : image.external.url;

  const imageName = `notion-img-${Date.now()}.png`;
  const imageDir = path.join(process.cwd(), "public", "images", "posts");
  const imagePath = path.join(imageDir, imageName);

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  console.log(`  📥 Baixando imagem...`);
  await downloadImage(imageUrl, imagePath);

  return `![Imagem](/images/posts/${imageName})`;
});

async function syncPosts() {
  console.log("🚀 Iniciando sincronização com o Notion...\n");

  try {
    // 💡 USANDO FETCH NATIVO PARA CONTORNAR O BUG DA BIBLIOTECA
    const queryUrl = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Status",
          status: {
            equals: "Done", // ATENÇÃO: Tem que ser exatamente a palavra usada no Notion
          },
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Erro na API do Notion: ${response.status} - ${errorBody}`,
      );
    }

    const data = await response.json();
    const posts = data.results;

    // =========== CÓDIGO DE LIMPEZA (SINGLE SOURCE OF TRUTH) ===========
    // Diretórios onde os posts e imagens ficam salvos
    const targetDir = path.join(process.cwd(), "src", "pages", "posts");
    const imageDir = path.join(process.cwd(), "public", "images", "posts");

    // Limpa a pasta de posts (apaga e recria vazia)
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    fs.mkdirSync(targetDir, { recursive: true });

    // Limpa a pasta de imagens (apaga e recria vazia)
    if (fs.existsSync(imageDir)) {
      fs.rmSync(imageDir, { recursive: true, force: true });
    }
    fs.mkdirSync(imageDir, { recursive: true });
    // ==================================================================

    if (!posts || posts.length === 0) {
      console.log("Nenhum post com status 'Done' encontrado na tabela.");
      return;
    }

    console.log(`Encontrados ${posts.length} post(s) para sincronizar.`);

    for (const post of posts) {
      const properties = post.properties;

      const title = properties.Name?.title[0]?.plain_text || "Sem Título";
      const description =
        properties.Description?.rich_text[0]?.plain_text || "";
      const category = properties.Category?.select?.name || "";

      const tags =
        properties.Tags?.multi_select
          ?.map((tag) => `"${tag.name}"`)
          .join(", ") || "";

      // Ajustado para o nome da sua coluna: Data
      const date =
        properties.Data?.date?.start || new Date().toISOString().split("T")[0];

      const slug = slugify(title);
      console.log(`\n📄 Processando post: "${title}"`);

      // Converte o texto do Notion para Markdown
      const mdblocks = await n2m.pageToMarkdown(post.id);
      const mdString = n2m.toMarkdownString(mdblocks);

      const frontmatter = `---
layout: ../../layouts/PostLayout.astro
title: "${title}"
author: "Cristopher Lima"
date: "${date}"
category: "${category}"
tags: [${tags}]
description: "${description}"
---

${mdString.parent}
`;

      const filePath = path.join(targetDir, `${slug}.md`);
      fs.writeFileSync(filePath, frontmatter);
      console.log(`  ✅ Salvo em: src/pages/posts/${slug}.md`);
    }

    console.log("\n✨ Sincronização concluída com sucesso!");
  } catch (error) {
    console.error("\n❌ Erro ao buscar dados do Notion:");
    console.error(error.message);
  }
}

syncPosts();
