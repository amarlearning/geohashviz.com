/// <reference types="vitest" />
import { defineConfig, type UserConfig } from 'vite';
import type { UserConfig as VitestUserConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.ts'],
  },
} as UserConfig & { test: VitestUserConfig['test'] });
