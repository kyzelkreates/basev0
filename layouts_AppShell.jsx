/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — App Shell
 * Burger menu drawer, responsive layout.
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */

import { useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Sidebar from './layouts_Sidebar'
import TopNav  from './layouts_TopNav'
import { useAppStore } from './core_storage'

export default function AppShell() {
  const sidebarExpanded = useAppStore(s => s.sidebarExpanded)
  const location        = useLocation()

  // Auto-close sidebar on route change
  useEffect(() => {
    useAppStore.getState().closeSidebar?.()
  }, [location.pathname])

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden bg-[#050810]" style={{ maxWidth: '100vw' }}>
      {/* Overlay — close sidebar on backdrop tap */}
      {sidebarExpanded && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => useAppStore.getState().closeSidebar?.()}
          aria-hidden="true"
        />
      )}

      {/* Sidebar drawer — always off-canvas, slides in */}
      <Sidebar />

      {/* Main content area — full width since sidebar never occupies space */}
      <div
        className="flex flex-col flex-1 min-w-0 overflow-hidden"
        style={{ width: '100%', maxWidth: '100vw' }}
      >
        <TopNav />
        <main
          className="flex-1 overflow-auto scrollbar-none"
          style={{ overflowX: 'hidden', minWidth: 0, width: '100%' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
