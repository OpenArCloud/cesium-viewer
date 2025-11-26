import { defineConfig } from 'vite';
import dotenv from 'dotenv';

export default defineConfig({
  server: {
    port: 8044,
    proxy: {
      "/api": {
        target: "https://example.com/",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
});