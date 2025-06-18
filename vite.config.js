// vite.config.js
import { defineConfig } from 'vite';


export default defineConfig({
  server: {
    port: 8044,
    allowedHosts: [
      "YOUR_EXTERNAL_URL"
    ]
  },
});