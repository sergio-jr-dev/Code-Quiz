import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { siteMetadata } from './config/siteMetadata.ts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'SITE_');
  return {
    plugins: [react(), siteMetadata(env.SITE_URL)],
    base: '/',
    css: { devSourcemap: true },
  };
});
