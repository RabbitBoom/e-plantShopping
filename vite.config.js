import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/e-plantShopping",
  plugins: [react()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
      app: new URL("./src/app", import.meta.url).pathname,
      store: new URL("./src/store", import.meta.url).pathname,
      components: new URL("./src/components", import.meta.url).pathname,
    },
  },
});
