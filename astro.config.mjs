import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // Garante que o Tailwind e o Cloudflare funcionem juntos
  integrations: [tailwind()],
  adapter: cloudflare(),
  output: "server",
});
