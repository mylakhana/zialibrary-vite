import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.ziaemadinah.test',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/')
      }
    }
  }
})
