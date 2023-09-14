import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteImagemin from 'vite-plugin-imagemin';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  base: '',
  root: './src/',

  server: {
    port: 3000,
    hot: true,
    open: true,
  },

  build: {
    outDir: '../dist',
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled',
          presets: ['@babel/preset-env'],
        }),
      ],
    },
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'index.js',
          filename: 'index.html',
          template: 'index.html',
        },
        {
          entry: '/pages/service-entry/service-entry.js',
          filename: 'service-entry.html',
          template: '/pages/service-entry/service-entry.html',
        },
        {
          entry: '/pages/service/service.js',
          filename: 'service.html',
          template: '/pages/service/service.html',
        },
        {
          entry: '/pages/publications/publications.js',
          filename: 'publications.html',
          template: '/pages/publications/publications.html',
        },
        {
          entry: '/pages/publications-entry/publications-entry.js',
          filename: 'publications-entry.html',
          template: '/pages/publications-entry/publications-entry.html',
        },
        {
          entry: 'pages/contact/contact.js',
          filename: 'contact.html',
          template: '/pages/contact/contact.html',
        },
        {
          entry: '/pages/team/team.js',
          filename: 'team.html',
          template: '/pages/team/team.html',
        },
        {
          entry: '/pages/team-entry/team-entry.js',
          filename: 'team-entry.html',
          template: '/pages/team-entry/team-entry.html',
        },
        {
          entry: '/pages/about/about.js',
          filename: 'about.html',
          template: '/pages/about/about.html',
        },
      ],
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
});
