// vite.config.js
import { defineConfig } from 'vite';
import dotenv from 'dotenv';


dotenv.config();

export default defineConfig({
  server: {
    allowedHosts: [
      "0.0.0.0"
    ],
    port: Number(process.env.PORT) || 8044,
    // Without the HMR websocket, Vite cannot force a page reload when a proxy drops the connection
    ws: process.env.DISABLE_HMR === "true" ? false : undefined,
    proxy: {
      "/api": {
        target: "https://example.com/",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  },
});
