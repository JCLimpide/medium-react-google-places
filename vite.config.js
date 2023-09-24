import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  esbuild: {
    loader: {
      '.js': 'jsx', // Configure esbuild pour traiter les fichiers .js comme des fichiers .jsx
    },
  },
  resolve: {
    alias: {
      '@styles': '/src/assets/scss/', // Remplace par le chemin réel de votre fichier style.scss
    },
  },
});
