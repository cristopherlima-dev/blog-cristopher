import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.cristopherlima.com.br',
  // Garante que o Tailwind e o Cloudflare funcionem juntos
  integrations: [tailwind()],
  adapter: cloudflare(),
  output: 'server',

  markdown: {
    // Realce de código por linguagem (Shiki) com tema escuro no estilo do GitHub
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false, // linhas longas rolam para o lado em vez de quebrar
    },
  },
});
