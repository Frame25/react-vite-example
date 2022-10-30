/// <reference types="vitest" />

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import viteSvgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  plugins: [
    tsconfigPaths(),
    eslintPlugin(),
    react(),
    viteSvgr(),
  ],
  resolve: {
    alias: [
      {
        find: 'shared',
        replacement: resolve(__dirname, 'src/shared'),
      },
      {
        find: 'pages',
        replacement: resolve(__dirname, 'src/pages'),
      },
      {
        find: 'entities',
        replacement: resolve(__dirname, 'src/entities'),
      },
      {
        find: 'app',
        replacement: resolve(__dirname, 'src/app'),
      },
    ],
  },
  server: {
    port: 8080
  }
});
