// ============================================================
// Copia o Sveltia CMS de node_modules para public/admin/,
// para o painel não depender do unpkg (site externo).
// Roda sozinho antes do "npm run dev" e do "npm run build".
// A versão é a que está travada no package.json (@sveltia/cms).
// ============================================================
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';

const pacote = new URL('../node_modules/@sveltia/cms/', import.meta.url);
const origem = new URL('dist/sveltia-cms.js', pacote);
const pastaDestino = new URL('../public/admin/', import.meta.url);
const destino = new URL('sveltia-cms.js', pastaDestino);

if (!existsSync(origem)) {
  console.error('[sveltia] Pacote não encontrado. Rode "npm install" primeiro.');
  process.exit(1);
}

// Só copia se ainda não existir ou se a versão instalada mudou (tamanho diferente)
if (!existsSync(destino) || statSync(destino).size !== statSync(origem).size) {
  mkdirSync(pastaDestino, { recursive: true });
  copyFileSync(origem, destino);
  const { version } = JSON.parse(readFileSync(new URL('package.json', pacote), 'utf8'));
  console.log(`[sveltia] Painel atualizado para a versão ${version}`);
}
