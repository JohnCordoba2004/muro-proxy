import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "public",
  publicDir: false,
  plugins: [tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
