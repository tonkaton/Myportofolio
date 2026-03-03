import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    sourcemap: false, // Disable in production for smaller files
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Split vendor chunks — browser caches them separately
        manualChunks: {
          'react-vendor':  ['react', 'react-dom'],
          'three-vendor':  ['three'],
          'r3f-vendor':    ['@react-three/fiber', '@react-three/drei'],
          'post-vendor':   ['@react-three/postprocessing', 'postprocessing'],
          'gsap-vendor':   ['gsap'],
          'zustand-vendor':['zustand'],
        },
      },
    },
  },
})
