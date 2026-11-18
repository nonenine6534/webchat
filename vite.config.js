import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite: el plugin de React permite usar JSX
// y la recarga rápida en desarrollo.
export default defineConfig({
  plugins: [react()],
})
