import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/openrouter': {
        target: 'https://openrouter.ai/api/v1/chat/completions',
        changeOrigin: true,
        rewrite: () => '',
        headers: {
          'Origin': 'https://openrouter.ai',
          'Referer': 'https://openrouter.ai'
        }
      },
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        changeOrigin: true,
        rewrite: () => '',
        headers: {
          'Origin': 'https://generativelanguage.googleapis.com'
        }
      }
    }
  }
})
