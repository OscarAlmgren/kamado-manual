import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Sajten serveras av GitHub Pages under /kamado-manual/
export default defineConfig({
  base: '/kamado-manual/',
  plugins: [react(), tailwindcss()],
})
