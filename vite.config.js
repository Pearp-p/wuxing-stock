import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/wuxing-stock/',
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/eastmoney': {
        target: 'https://push2.eastmoney.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/eastmoney/, ''),
        headers: {
          Referer: 'https://data.eastmoney.com/'
        }
      }
    }
  }
})
