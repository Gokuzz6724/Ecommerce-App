import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),      // Keep React plugin
    tailwindcss() // Add Tailwind plugin
  ],
  server :{port : 5173}
})
