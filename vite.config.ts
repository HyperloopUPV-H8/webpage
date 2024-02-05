import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "webpage",
  },
  plugins: [
    react(), 
    ViteImageOptimizer({
      jpeg: {
        quality: 75,
      },
      jpg: {
        quality: 75,
      },
    })
  ],
})
