/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — Service Worker
 * public/sw-job-sync.js
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 *
 * Handles background sync for offline activity log submissions.
 * All data is stored locally in localStorage — this SW provides
 * offline fallback and cache management.
 * ============================================================
 */

const CACHE_NAME = '4p3x-base-os-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(['/'])
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // Cache-first for static assets, network-first for API
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }
        const cloned = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned))
        return response
      }).catch(() => cached)
    })
  )
})

self.addEventListener('sync', (event) => {
  if (event.tag === '4p3x-activity-sync') {
    event.waitUntil(syncPendingActivityLogs())
  }
})

async function syncPendingActivityLogs() {
  // Activity logs are stored in localStorage — sync is handled by the app layer
  // This handler is a placeholder for future background sync extension
  console.log('[4P3X:SW] Background sync triggered — activity sync handled by app layer')
}
