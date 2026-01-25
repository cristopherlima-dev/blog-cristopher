import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

// Função para criar slug (URL amigável)
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

console.log("🚀 Vamos criar um novo post!\n");

try {
  // 1. Perguntas
  const title = await questions("Título do Post: ");
  if (!title) throw new Error("O título é obrigatório!");

  const description = await questions("Descrição curta (para SEO/Cards): ");

  const category = await questions("Categoria (ex: Carreira, Tutorial): ");

  const tagsInput = await questions("Tags (separadas por vírgula): ");
  const tags = tagsInput
    .split(",")
    .map((t) => `"${t.trim()}"`)
    .filter(Boolean)
    .join(", ");

  // 2. Processamento de Dados
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const slug = slugify(title);
  const filename = `${slug}.md`;

  // Caminho onde o arquivo será salvo
  const targetDir = path.join(process.cwd(), "src", "pages", "posts");
  const filePath = path.join(targetDir, filename);

  // 3. Template do Frontmatter
  const content = `---
layout: ../../layouts/PostLayout.astro
title: "${title}"
author: "Cristopher Lima"
date: "${date}"
category: "${category}"
tags: [${tags}]
description: "${description}"
---

Escreva seu conteúdo aqui...
`;

  // 4. Criação do Arquivo
  if (fs.existsSync(filePath)) {
    console.error(`\n❌ Erro: Já existe um arquivo chamado "${filename}".`);
  } else {
    fs.writeFileSync(filePath, content);
    console.log(`\n✅ Post criado com sucesso!`);
    console.log(`📂 Caminho: src/pages/posts/${filename}`);
  }
} catch (error) {
  console.error("\n❌ Algo deu errado:", error.message);
} finally {
  rl.close();
}
