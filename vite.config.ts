import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' — статичний лендинг на GitHub Pages у підпапці репозиторію.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: 5191, strictPort: true },
})
