import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '391d5fe2-0f01-4c8b-b0b6-c18e5ad99a70-00-ujolnz7mlczt.worf.replit.dev',
      '391d5fe2-0f01-4c8b-b0b6-c18e5ad99a70-00-ujolnz7mlczt.worf.repl.co'
    ]
  }
});
