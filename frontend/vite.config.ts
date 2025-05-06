
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { reactRouter } from '@react-router/vite-plugin';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), reactRouter()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    hmr: {
      port: 5000,
      clientPort: 443
    }
  }
});
