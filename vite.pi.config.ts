// vite.pi.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src/apps/pi',
  build: {
    outDir: '../../../dist-pi',
    emptyOutDir: true,
  },
})