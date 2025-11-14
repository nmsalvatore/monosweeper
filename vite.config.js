import { defineConfig } from 'vite'

export default defineConfig({
  base: '/minesweeper/',
  build: {
    outDir: 'dist'
  },
  test: {
    environment: 'jsdom'
  }
})
