import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"

import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [tsconfigPaths(), react()],

  server: {
    proxy: {
      "/api": {
        target: "https://localhost:5000",
        changeOrigin: false,
        secure: false,
      },
    },
  },
})
