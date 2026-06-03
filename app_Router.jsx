/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — Router v4
 * Learner PWA + Admin Monitoring Dashboard
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 *
 * PUBLIC ACCESS — no login required.
 *
 * Route map (hash routing — createHashRouter):
 *   /#/                         → LandingPage  (public home)
 *   /#/learner                  → LearnerPwa   ← PRIMARY Learner PWA route
 *   /#/pwa/:publicLinkId        → ParticipantPwa (link-based, per participant)
 *   /#/participant-setup        → ParticipantSetup
 *   /#/participant-app          → JobseekerApp (legacy PIN app — kept for compat)
 *   /#/admin                    → alias → /dashboard (Admin Dashboard)
 *   /#/dashboard                → Admin Dashboard (inside AppShell)
 *   … all other admin routes    → inside AppShell
 * ============================================================
 */

import { createHashRouter, Navigate } from 'react-router-dom'
import AppShell            from './layouts_AppShell'
import LandingPage         from './pages_Landing'

// ── Learner PWA (new generic learning PWA) ───────────────────
import LearnerPwa          from './pages_LearnerPwa'

// ── Participant PWA (link-based, legacy) ─────────────────────
import ParticipantSetup    from './pages_JobseekerSetup'
import ParticipantApp      from './pages_JobseekerApp'
import ParticipantPwa      from './pages_JobseekerPwa'

// ── Admin Dashboard pages ─────────────────────────────────────
import Dashboard           from './pages_Dashboard'
import Participants        from './pages_Jobseekers'
import WeeklyActivity      from './pages_WeeklyActivity'
import ActivityRecords     from './pages_Applications'
import ReviewSessions      from './pages_Interviews'
import Evidence            from './pages_Evidence'
import CheckIns            from './pages_CheckIns'
import Tasks               from './pages_Tasks'
import SupportRisks        from './pages_SupportRisks'
import Reports             from './pages_Reports'
import AIPage              from './pages_AI'
import Settings            from './pages_Settings'
import NotFound            from './pages_NotFound'

// ── Auth pages (preserved) ────────────────────────────────────
import Login               from './pages_auth_Login'
import ParticipantLogin    from './pages_auth_JobseekerLogin'
import ResetConfirm        from './pages_auth_ResetConfirm'
import Setup               from './pages_auth_Setup'

export const router = createHashRouter([

  // ── Public home / landing page ─────────────────────────────
  {
    path: '/',
    element: <LandingPage />,
  },

  // ── PRIMARY: Generic Learner PWA ────────────────────────────
  // Route: /#/learner — the correct target for "Open Learner PWA"
  {
    path: '/learner',
    element: <LearnerPwa />,
  },

  // ── Alias: /pwa → /learner (bare /pwa without a linkId) ────
  {
    path: '/pwa',
    element: <Navigate to="/learner" replace />,
  },

  // ── Participant PWA — link-based (per-participant token) ────
  {
    path: '/pwa/:publicLinkId',
    element: <ParticipantPwa />,
  },

  // ── Participant setup (admin creates participant + link) ────
  {
    path: '/participant-setup',
    element: <ParticipantSetup />,
  },

  // ── Legacy PIN-based Participant App (kept for compat) ──────
  {
    path: '/participant-app',
    element: <ParticipantApp />,
  },

  // ── Admin Dashboard via AppShell ────────────────────────────
  {
    element: <AppShell />,
    children: [
      // Primary admin dashboard route
      { path: '/dashboard', element: <Dashboard /> },

      // Alias: /admin → /dashboard
      { path: '/admin', element: <Navigate to="/dashboard" replace /> },

      // Participant management
      { path: '/participants',                      element: <Participants /> },
      { path: '/participants/:participantId',       element: <Participants /> },
      { path: '/participants/:jobseekerId',         element: <Participants /> }, // legacy alias

      // Activity & progress
      { path: '/weekly-activity',                   element: <WeeklyActivity /> },
      { path: '/activity-records',                  element: <ActivityRecords /> },
      { path: '/applications',                      element: <ActivityRecords /> }, // legacy alias

      // Review sessions
      { path: '/review-sessions',                   element: <ReviewSessions /> },
      { path: '/interviews',                        element: <ReviewSessions /> },  // legacy alias

      // Evidence & check-ins
      { path: '/evidence',                          element: <Evidence /> },
      { path: '/check-ins',                         element: <CheckIns /> },

      // Tasks
      { path: '/tasks',                             element: <Tasks /> },

      // AI & risk
      { path: '/ai',                                element: <AIPage /> },
      { path: '/support-risks',                     element: <SupportRisks /> },

      // Reports
      { path: '/reports',                           element: <Reports /> },
      { path: '/reports/:participantId',            element: <Reports /> },
      { path: '/reports/participant/:jobseekerId',  element: <Reports /> }, // legacy alias

      // Settings
      { path: '/settings',                          element: <Settings /> },
      { path: '/settings/:section',                 element: <Settings /> },
    ],
  },

  // ── Auth routes (preserved) ──────────────────────────────────
  { path: '/auth/setup',          element: <Setup /> },
  { path: '/auth/login',          element: <Login /> },
  { path: '/auth/participant',    element: <ParticipantLogin /> },
  { path: '/auth/jobseeker',      element: <ParticipantLogin /> }, // legacy alias
  { path: '/auth/reset-confirm',  element: <ResetConfirm /> },

  // ── 404 ───────────────────────────────────────────────────────
  { path: '*', element: <NotFound /> },

])

export default router
