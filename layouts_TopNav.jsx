/**
 * ============================================================
 * 4P3X Refractable Base OS™ — Top Navigation Bar
 * Hamburger trigger, branding, user context, demo badge.
 * Responsive: brand text truncates, all items flex-shrink safe.
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */

import { useNavigate } from 'react-router-dom'
import Icon from './components_ui_Icon'
import { useAppStore, useAuthStore, useConfigStore } from './core_storage'

export default function TopNav() {
  const openSidebar = useAppStore(s => s.openSidebar)
  const user        = useAuthStore(s => s.user)
  const navigate    = useNavigate()
  const config      = useConfigStore(s => s.config)
  const isDemoMode  = config.demoModeEnabled

  return (
    <header
      className="flex-shrink-0 h-12 flex items-center gap-2 px-3 sm:px-4 border-b border-slate-800/60 bg-[#090e1c]/95 backdrop-blur-md z-30"
      style={{ width: '100%', minWidth: 0, overflow: 'hidden' }}
    >
      {/* Hamburger — always visible */}
      <button
        onClick={openSidebar}
        className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors flex-shrink-0"
        aria-label="Open navigation menu"
      >
        <Icon name="Menu" size={18} />
      </button>

      {/* Brand — truncates gracefully, never wraps */}
      <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
        <span className="font-display font-bold text-[#d4af37] text-xs sm:text-sm tracking-wide truncate min-w-0">
          4P3X Refractable Base OS™
        </span>
        {/* Tagline on sm+ only */}
        <span className="hidden sm:inline text-slate-600 text-xs truncate min-w-0">
          — Refractable Base OS
        </span>
        {isDemoMode && (
          <span className="flex-shrink-0 text-[9px] font-bold tracking-widest uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded whitespace-nowrap">
            DEMO
          </span>
        )}
      </div>

      {/* Settings */}
      <button
        onClick={() => navigate('/settings')}
        className="p-2 rounded-md text-slate-500 hover:text-white hover:bg-slate-800/60 transition-colors flex-shrink-0"
        aria-label="Settings"
      >
        <Icon name="Settings" size={16} />
      </button>

      {/* User avatar */}
      <div className="flex items-center flex-shrink-0">
        <div className="w-7 h-7 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center">
          <span className="text-[#d4af37] text-xs font-bold">
            {user?.full_name?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || 'C'}
          </span>
        </div>
      </div>
    </header>
  )
}
