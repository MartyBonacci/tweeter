
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    hmr: {
      host: '391d5fe2-0f01-4c8b-b0b6-c18e5ad99a70-00-ujolnz7mlczt.worf.replit.dev'
    }
  },
  optimizeDeps: {
    include: ['@remix-run/router']
  }
});
