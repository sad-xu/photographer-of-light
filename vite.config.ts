import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
// import px2rem from 'postcss-plugin-px2rem';

const isDev = process.env.NODE_ENV == 'development';

export default defineConfig({
  base: '/p/',
  server: {
    port: 8766,
    host: true,
    open: true,
    proxy: {
      // '/api': {
      //   target: '',
      //   changeOrigin: true,
      // },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    // 全局导入scss方法
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/mixin.scss";',
      },
    },
    postcss: {
      plugins: [
        // css 前缀补全
        autoprefixer(),
        // px2rem
        // px2rem({
        //   rootValue: 16, // 换算基数
        //   unitPrecision: 3,
        //   exclude: /(node_module)/,
        //   mediaQuery: false,
        //   minPixelValue: 3,
        // }),
      ],
    },
  },
  build: {
    // css 不拆分文件
    cssCodeSplit: false,
    minify: 'esbuild',
  },
  esbuild: {
    // 去除console
    drop: isDev ? [] : ['console', 'debugger'],
  },
});
