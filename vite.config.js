import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ultramsg': {
        target: 'https://api.ultramsg.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/ultramsg/, ''),
      },
    },
  },
})
