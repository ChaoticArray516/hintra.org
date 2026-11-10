import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const indexablePages = [
  'https://hintra.org/',
  'https://hintra.org/krillion-game/',
  'https://hintra.org/krillion-unlimited/',
  'https://hintra.org/noillirk/',
  'https://hintra.org/krillion-geography/',
  'https://hintra.org/es/krillion-unlimited/',
  'https://hintra.org/pt/krillion-unlimited/',
  'https://hintra.org/one-in-a-krillion/',
];

export default defineConfig({
  site: 'https://hintra.org',
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => indexablePages.includes(page),
      serialize: (item) => {
        delete item.lastmod;
        return item;
      },
    }),
  ],
});
