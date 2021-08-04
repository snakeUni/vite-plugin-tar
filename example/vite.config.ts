import refresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import tarPlugin from 'vite-plugin-tar'

export default defineConfig({
  plugins: [refresh(), tarPlugin()],
  build: {
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
})
