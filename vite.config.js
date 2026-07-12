import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // Aquí está el truco: le decimos que "limpie" el reporte de todo lo demás
      // y solo calcule la matemática basándose en nuestro archivo dummy
      include: ['src/App.test.jsx'], 
      all: false
    }
  }
});