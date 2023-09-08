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
          entry: 'pages/service/service.js',
          filename: 'pages/service/service.html',
          template: '/pages/service/service.html',
          injectOptions: {
            data: {
              title: 'About',
              injectScript: `<script src="./service.js"></script>`,
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