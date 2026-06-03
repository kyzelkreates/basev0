import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * ============================================================
 * 4P3X Refractable Base OS™ — Vite Config
 * Participant PWA + Admin Monitoring Dashboard
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */

export default defineConfig({
  base: '/',

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name:             '4P3X Refractable Base OS™',
        short_name:       '4P3X Base',
        description:      'Reusable participant PWA and admin monitoring dashboard Powered by 4P3X Intelligent AI — Created by Kyzel Kreates.',
        theme_color:      '#090e1c',
        background_color: '#050810',
        display:          'standalone',
        orientation:      'any',
        scope:            '/',
        start_url:        '/#/learner',
        categories:       ['business', 'productivity'],
        icons: [
          {
            src:     'icons/icon-192x192.png',
            sizes:   '192x192',
            type:    'image/png',
            purpose: 'maskable any',
          },
          {
            src:     'icons/icon-512x512.png',
            sizes:   '512x512',
            type:    'image/png',
            purpose: 'maskable any',
          },
        ],
        shortcuts: [
          {
            name:        'Learner PWA',
            short_name:  'Learner',
            url:         '/#/learner',
            description: 'Open the 4P3X Refractable Base OS Learner PWA',
            icons: [{ src: 'icons/icon-192x192.png', sizes: '192x192' }],
          },
          {
            name:        'Admin Dashboard',
            short_name:  'Dashboard',
            url:         '/#/dashboard',
            description: 'Open the 4P3X Refractable Base OS Admin Dashboard',
            icons: [{ src: 'icons/icon-192x192.png', sizes: '192x192' }],
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler:    'CacheFirst',
            options: {
              cacheName:  '4p3x-refractable-base-os-fonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },

      devOptions: {
        enabled: true,
        type:    'module',
      },
    }),
  ],

  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },

  server: {
    port: 3000,
    host: true,
  },

  build: {
    outDir:    'dist',
    sourcemap: false,
    minify:    'esbuild',
    target:    'es2020',
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui':       ['lucide-react', 'clsx'],
          'vendor-state':    ['zustand'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-charts':   ['recharts'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },

  optimizeDeps: {
    include: ['recharts', 'zustand', '@supabase/supabase-js'],
  },
})
