/**
 * ============================================================
 * 4P3X Refractable Base OS™ — Route Registry
 * Participant PWA + Admin Monitoring Dashboard
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */

export const ROUTES = {
  // ── Core ──────────────────────────────────────────────────
  ROOT:       '/',
  DASHBOARD:  '/dashboard',

  // ── Participants ───────────────────────────────────────────
  PARTICIPANTS:        '/participants',
  PARTICIPANT_PROFILE: '/participants/:participantId',

  // ── Weekly Activity ───────────────────────────────────────
  WEEKLY_ACTIVITY: '/weekly-activity',

  // ── Activity Records ──────────────────────────────────────
  APPLICATIONS: '/activity-records',

  // ── Review Sessions ───────────────────────────────────────
  INTERVIEWS: '/review-sessions',

  // ── Evidence ──────────────────────────────────────────────
  EVIDENCE: '/evidence',

  // ── Check-ins ─────────────────────────────────────────────
  CHECKINS: '/check-ins',

  // ── Tasks ─────────────────────────────────────────────────
  TASKS: '/tasks',

  // ── Support Risks ─────────────────────────────────────────
  SUPPORT_RISKS: '/support-risks',

  // ── 4P3X AI ───────────────────────────────────────────────
  AI: '/ai',

  // ── Reports ───────────────────────────────────────────────
  REPORTS:       '/reports',
  REPORT_DETAIL: '/reports/:participantId',

  // ── Participant Setup / Invite ────────────────────────────
  PARTICIPANT_SETUP: '/participant-setup',

  // ── Participant PWA ───────────────────────────────────────
  PARTICIPANT_APP: '/participant-app',

  // ── Learner PWA — primary learner-facing route ────────────
  LEARNER_PWA: '/learner',

  // ── Admin alias ───────────────────────────────────────────
  ADMIN: '/admin',

  // ── Settings ──────────────────────────────────────────────
  SETTINGS:              '/settings',
  SETTINGS_PROFILE:      '/settings/profile',
  SETTINGS_PROGRAMME:    '/settings/programme',
  SETTINGS_AI:           '/settings/ai',
  SETTINGS_SECURITY:     '/settings/security',
  SETTINGS_DEMO:         '/settings/demo',

  // ── Auth ──────────────────────────────────────────────────
  AUTH_LOGIN:       '/auth/login',
  AUTH_PARTICIPANT: '/auth/participant',

  // ── Error ─────────────────────────────────────────────────
  NOT_FOUND: '*'
}

// ─── Nav structure for sidebar ────────────────────────────────
export const NAV_ITEMS = [
  {
    id:    'dashboard',
    label: 'Overview',
    route: ROUTES.DASHBOARD,
    icon:  'LayoutDashboard',
    group: 'core'
  },
  {
    id:    'participants',
    label: 'Participants',
    route: ROUTES.PARTICIPANTS,
    icon:  'Users',
    group: 'operations',
  },
  {
    id:    'weekly-activity',
    label: 'Weekly Activity',
    route: ROUTES.WEEKLY_ACTIVITY,
    icon:  'Clock',
    group: 'operations'
  },
  {
    id:    'activity-records',
    label: 'Activity Records',
    route: ROUTES.APPLICATIONS,
    icon:  'FileText',
    group: 'operations'
  },
  {
    id:    'review-sessions',
    label: 'Review Sessions',
    route: ROUTES.INTERVIEWS,
    icon:  'CalendarCheck',
    group: 'operations'
  },
  {
    id:    'check-ins',
    label: 'Check-ins',
    route: ROUTES.CHECKINS,
    icon:  'CheckSquare',
    group: 'operations'
  },
  {
    id:    'evidence',
    label: 'Evidence',
    route: ROUTES.EVIDENCE,
    icon:  'Paperclip',
    group: 'operations'
  },
  {
    id:    'tasks',
    label: 'Tasks',
    route: ROUTES.TASKS,
    icon:  'ListChecks',
    group: 'operations'
  },
  {
    id:        'participant-setup',
    label:     'Invite Participant',
    route:     ROUTES.PARTICIPANT_SETUP,
    icon:      'UserPlus',
    group:     'operations',
    highlight: true,
  },
  {
    id:        'ai',
    label:     '4P3X Intelligent AI',
    route:     ROUTES.AI,
    icon:      'Brain',
    group:     'intelligence',
    highlight: true
  },
  {
    id:    'support-risks',
    label: 'Support Risks',
    route: ROUTES.SUPPORT_RISKS,
    icon:  'ShieldAlert',
    group: 'intelligence'
  },
  {
    id:    'reports',
    label: 'Reports',
    route: ROUTES.REPORTS,
    icon:  'BarChart3',
    group: 'reporting'
  },
  {
    id:    'settings',
    label: 'Settings',
    route: ROUTES.SETTINGS,
    icon:  'Settings',
    group: 'system'
  }
]

export const NAV_GROUPS = {
  core:         { label: null,                        order: 0 },
  operations:   { label: 'Participant Management',    order: 1 },
  intelligence: { label: 'AI & Risk',                 order: 2 },
  reporting:    { label: 'Reports & Evidence',        order: 3 },
  system:       { label: 'System',                    order: 4 }
}

export default ROUTES
