import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteImagemin from 'vite-plugin-imagemin'
import babel from '@rollup/plugin-babel'

export default defineConfig({
	base: '',
  root: './src',

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
          injectOptions: {
            data: {
              title: 'index',
              injectScript: `<script src="./index.js"></script>`,
            },
          },
        },
        {
          entry: 'pages/service-entry/service-entry.js',
          filename: 'service.html',
          template: 'pages/service-entry/service-entry.html',
          injectOptions: {
            data: {
              title: 'Service Entry',
              injectScript: `<script src="./service-entry.js"></script>`,
            },
          },
        },
        {
          entry: 'pages/service/service.js',
          filename: 'service.html',
          template: 'pages/service/service.html',
          injectOptions: {
            data: {
              title: 'Service',
              injectScript: `<script src="./service.js"></script>`,
            },
          },
        },
        {
          entry: 'pages/service/publications.js',
          filename: 'publications.html',
          template: 'pages/publications/publications.html',
          injectOptions: {
            data: {
              title: 'Publications',
              injectScript: `<script src="./publications.js"></script>`,
            },
          },
        },
        {
          entry: 'pages/service/publications-entry.js',
          filename: 'publications-entry.html',
          template: 'pages/publications/publications-entry.html',
          injectOptions: {
            data: {
              title: 'Publications Entry',
              injectScript: `<script src="./publications-entry.js"></script>`,
            },
          },
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
})