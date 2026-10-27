import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Fontes (arquivos vêm do Fontsource, carregados no Layout.astro)
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      // Paleta do mockup. Use assim: bg-fundo, text-suave, border-borda...
      colors: {
        fundo: '#0D1117', // fundo da página
        superficie: '#11161D', // cards e caixas
        barra: '#0F141A', // barra de título dos cards e blocos de código
        codigo: '#0B0F14', // fundo dos blocos de código
        borda: '#222A35', // bordas principais
        'borda-forte': '#2A3240', // bordas de botões e campos
        divisor: '#1C232D', // linhas entre itens de lista
        texto: '#E6EDF3', // texto principal
        'texto-2': '#C9D1D9', // texto dos posts
        suave: '#9DA7B3', // datas, legendas, menus
        destaque: '#F5A524', // cor de destaque (âmbar)
        link: '#79C0FF', // tags e links secundários
      },
      // Estilo do texto dos posts (classe "prose prose-blog")
      typography: ({ theme }) => ({
        blog: {
          css: {
            '--tw-prose-body': theme('colors.texto-2'),
            '--tw-prose-headings': theme('colors.texto'),
            '--tw-prose-lead': theme('colors.suave'),
            '--tw-prose-links': theme('colors.destaque'),
            '--tw-prose-bold': theme('colors.texto'),
            '--tw-prose-counters': theme('colors.suave'),
            '--tw-prose-bullets': theme('colors.suave'),
            '--tw-prose-hr': theme('colors.borda'),
            '--tw-prose-quotes': theme('colors.texto'),
            '--tw-prose-quote-borders': theme('colors.destaque'),
            '--tw-prose-captions': theme('colors.suave'),
            '--tw-prose-code': theme('colors.texto'),
            '--tw-prose-pre-code': theme('colors.texto-2'),
            '--tw-prose-pre-bg': theme('colors.codigo'),
            '--tw-prose-th-borders': theme('colors.borda-forte'),
            '--tw-prose-td-borders': theme('colors.divisor'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};
