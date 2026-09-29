// vite.config.js
import { defineConfig } from 'vite';


dotenv.config();

export default defineConfig({
  server: {
    port: 8044,
    allowedHosts: [
      "0.0.0.0"
    ]
    port: Number(process.env.PORT) || 8044,
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
