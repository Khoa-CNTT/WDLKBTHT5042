import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
      extensions: ['.js', '.jsx']
  },
  server: {
      port: 5173
  },
});