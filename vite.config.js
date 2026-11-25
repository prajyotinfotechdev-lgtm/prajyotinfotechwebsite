import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows LAN access
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, "/");
          if (
            norm.includes("/node_modules/react/") ||
            norm.includes("/node_modules/react-dom/") ||
            norm.includes("/node_modules/react-router") ||
            norm.includes("/node_modules/scheduler/")
          ) {
            return "react-core";
          }
          if (
            norm.includes("/node_modules/framer-motion/") ||
            norm.includes("/node_modules/motion-dom/") ||
            norm.includes("/node_modules/motion-utils/")
          ) {
            return "motion-vendor";
          }
        },
      },
    },
  },
});
