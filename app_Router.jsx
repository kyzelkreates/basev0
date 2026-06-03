/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — Activity Record Router v3
 * Participant PWA + Admin Monitoring Dashboard
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 *
 * PUBLIC ACCESS — no login required.
 *
 * Route map (hash routing):
 *   /#/                         → LandingPage  (public entry)
 *   /#/pwa/:publicLinkId        → ParticipantPwa (link-based, per participant)
 *   /#/participant-setup        → ParticipantSetup (admin creates + shares link)
 *   /#/participant-app          → ParticipantApp (legacy PIN-based, kept for compat)
 *   /#/participant-app            → ParticipantApp (legacy alias — kept for compat)
 *   /#/dashboard                → Admin Dashboard
 *   /#/participants             → Participant list
 *   … all other admin routes    → inside AppShell
 *   /#/auth/*                   → Auth pages (preserved, not in main flow)
 * ============================================================
 */

import { createHashRouter } from 'react-router-dom'
import AppShell            from './layouts_AppShell'
import LandingPage         from './pages_Landing'

// ── Participant PWA ───────────────────────────────────────────
import ParticipantSetup    from './pages_JobseekerSetup'   // internal name preserved; labels updated
import ParticipantApp      from './pages_JobseekerApp'     // legacy PIN-based (kept for compat)
import ParticipantPwa      from './pages_JobseekerPwa'     // link-based PWA

// ── Admin Dashboard pages ─────────────────────────────────────
import Dashboard           from './pages_Dashboard'
import Participants        from './pages_Jobseekers'        // internal name preserved; labels updated
import WeeklyActivity      from './pages_WeeklyActivity'
import ActivityRecords     from './pages_Applications'      // internal name preserved; labels updated
import ReviewSessions      from './pages_Interviews'        // internal name preserved; labels updated
import Evidence            from './pages_Evidence'
import CheckIns            from './pages_CheckIns'
import Tasks               from './pages_Tasks'
import SupportRisks        from './pages_SupportRisks'
import Reports             from './pages_Reports'
import AIPage              from './pages_AI'
import Settings            from './pages_Settings'
import NotFound            from './pages_NotFound'

// ── Auth pages (preserved, not in main flow) ──────────────────
import Login               from './pages_auth_Login'
import ParticipantLogin    from './pages_auth_JobseekerLogin'
import ResetConfirm        from './pages_auth_ResetConfirm'
import Setup               from './pages_auth_Setup'

export const router = createHashRouter([

  // ── Public landing page ─────────────────────────────────────
  {
    path: '/',
    element: <LandingPage />,
  },

  // ── Participant PWA — link-based (new) ───────────────────────
  // Each participant gets a unique link: /#/pwa/abc123xyz
  // No auth, no session — identity proven by public link token
  {
    path: '/pwa/:publicLinkId',
    element: <ParticipantPwa />,
  },

  // ── Participant setup (admin creates new participant + link) ──
  {
    path: '/participant-setup',
    element: <ParticipantSetup />,
  },

  // ── Legacy alias: /participant-setup → participant setup ───────
  {
    path: '/participant-setup',
    element: <ParticipantSetup />,
  },

  // ── Legacy PIN-based Participant App (kept for compat) ───────
  {
    path: '/participant-app',
    element: <ParticipantApp />,
  },

  // ── Legacy alias: /participant-app → participant app ───────────
  {
    path: '/participant-app',
    element: <ParticipantApp />,
  },

  // ── Admin Dashboard (AppShell + Outlet) ──────────────────────
  // One layout wrapper — single Outlet — no nesting conflicts
  {
    element: <AppShell />,
    children: [
      { path: '/dashboard',                          element: <Dashboard /> },

      // Participant management pages
      { path: '/participants',                       element: <Participants /> },
      { path: '/participants/:participantId',        element: <Participants /> },

      // Legacy route aliases (keep working)
      // legacy alias handled by /participants above
      { path: '/participants/:jobseekerId',            element: <Participants /> },

      { path: '/weekly-activity',                    element: <WeeklyActivity /> },
      { path: '/activity-records',                   element: <ActivityRecords /> },
      { path: '/applications',                       element: <ActivityRecords /> },   // legacy alias
      { path: '/review-sessions',                    element: <ReviewSessions /> },
      { path: '/interviews',                         element: <ReviewSessions /> },    // legacy alias
      { path: '/evidence',                           element: <Evidence /> },
      { path: '/check-ins',                          element: <CheckIns /> },
      { path: '/tasks',                              element: <Tasks /> },

      // AI & risk
      { path: '/ai',                                 element: <AIPage /> },
      { path: '/support-risks',                      element: <SupportRisks /> },

      // Reports
      { path: '/reports',                            element: <Reports /> },
      { path: '/reports/:participantId',             element: <Reports /> },
      { path: '/reports/participant/:jobseekerId',     element: <Reports /> }, // legacy alias

      // Settings
      { path: '/settings',                           element: <Settings /> },
      { path: '/settings/:section',                  element: <Settings /> },
    ],
  },

  // ── Auth routes (preserved, bypassed in normal flow) ────────
  { path: '/auth/setup',          element: <Setup /> },
  { path: '/auth/login',          element: <Login /> },
  { path: '/auth/participant',    element: <ParticipantLogin /> },
  { path: '/auth/jobseeker',      element: <ParticipantLogin /> }, // legacy alias — kept for compat
  { path: '/auth/reset-confirm',  element: <ResetConfirm /> },

  // ── 404 ────────────────────────────────────────────────────
  { path: '*', element: <NotFound /> },

])

export default router
