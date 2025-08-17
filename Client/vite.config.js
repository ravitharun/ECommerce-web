import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  optimizeDeps: {
    include: ['react-is'], // keep it simple, no require.resolve
  },
  build: {
    rollupOptions: {
      external: [], // don’t add require.resolve here
    },
  },
})
