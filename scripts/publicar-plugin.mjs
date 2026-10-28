// ============================================================
// Botão "Publicar" do painel — parte do servidor local.
// Só funciona com "npm run dev" (não vai para o site publicado).
//
//   GET  /__publicar  -> lista o que mudou no conteúdo
//   POST /__publicar  -> commit + push SÓ das pastas de conteúdo
//
// Mudanças de código (layouts, páginas, config...) ficam de fora:
// essas continuam sendo commitadas por você, no terminal.
// ============================================================
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

// Pastas que o painel altera (posts, páginas, textos do site e imagens)
const PASTAS_DE_CONTEUDO = ['src/content', 'src/data', 'public/images'];

export default function publicarPlugin() {
  return {
    name: 'blog-publicar',
    apply: 'serve', // só no servidor de desenvolvimento
    configureServer(server) {
      const raiz = server.config.root;
      const git = (...args) =>
        run('git', ['-c', 'core.quotepath=false', ...args], { cwd: raiz, windowsHide: true, timeout: 60_000 });
      const pastas = () => PASTAS_DE_CONTEUDO.filter((p) => existsSync(join(raiz, p)));

      server.middlewares.use('/__publicar', async (req, res) => {
        const responder = (status, dados) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify(dados));
        };

        // Segurança: só aceita chamadas feitas no próprio computador
        const host = (req.headers.host || '').split(':')[0];
        if (!['localhost', '127.0.0.1'].includes(host)) return responder(403, { erro: 'Acesso negado.' });

        try {
          const { stdout: branch } = await git('rev-parse', '--abbrev-ref', 'HEAD');

          // Lista o que mudou (M = modificado, ?? = novo, D = apagado)
          if (req.method === 'GET') {
            const { stdout } = await git('status', '--porcelain', '-uall', '--', ...pastas());
            const arquivos = stdout
              .split('\n')
              .filter(Boolean)
              .map((linha) => ({ estado: linha.slice(0, 2).trim(), caminho: linha.slice(3) }));
            return responder(200, { branch: branch.trim(), arquivos });
          }

          // Publica: add + commit (só as pastas de conteúdo) + push
          if (req.method === 'POST') {
            let corpo = '';
            for await (const parte of req) corpo += parte;
            const mensagem = (JSON.parse(corpo || '{}').mensagem || '').trim();
            if (!mensagem) return responder(400, { erro: 'Escreva uma mensagem para o commit.' });

            await git('add', '--all', '--', ...pastas());
            const { stdout: preparados } = await git('diff', '--cached', '--name-only', '--', ...pastas());
            if (!preparados.trim()) return responder(400, { erro: 'Não há alterações de conteúdo para publicar.' });

            await git('commit', '-m', mensagem, '--', ...pastas());
            await git('push');
            const { stdout: hash } = await git('rev-parse', '--short', 'HEAD');
            return responder(200, { ok: true, branch: branch.trim(), commit: hash.trim(), arquivos: preparados.split('\n').filter(Boolean) });
          }

          responder(405, { erro: 'Método não permitido.' });
        } catch (e) {
          responder(500, { erro: String(e.stderr || e.message || e).trim() });
        }
      });
    },
  };
}
