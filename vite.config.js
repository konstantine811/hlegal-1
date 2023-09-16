import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import viteImagemin from "vite-plugin-imagemin";
import babel from "@rollup/plugin-babel";
import Pages from "vite-plugin-pages";

export default defineConfig({
  base: "",
  root: "./src/",

  server: {
    port: 3000,
    hot: true,
    open: true,
  },

  build: {
    outDir: "../docs",
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: "bundled",
          presets: ["@babel/preset-env"],
        }),
      ],
    },
  },
  plugins: [
    Pages(),
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
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
});
