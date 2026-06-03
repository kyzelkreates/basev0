/**
 * ============================================================
 * 4P3X Refractable Base OS™ — App Configuration
 * Participant PWA + Admin Monitoring Dashboard
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */

export const APP_CONFIG = {
  name:        '4P3X Refractable Base OS™',
  shortName:   '4P3X Base',
  version:     '1.0.0',
  buildStage:  '4P3X Refractable Base OS™ — Refractable Modular Base Platform',
  tagline:     'Refractable Modular Base Structure',
  brand:       'Powered by 4P3X Intelligent AI — Created by Kyzel Kreates',

  products: {
    adminDashboard: {
      name:   '4P3X Refractable Base OS™ — Admin Dashboard',
      short:  'Admin Dashboard',
      route:  '/dashboard'
    },
    participantPWA: {
      name:   '4P3X Refractable Base OS™ — Learner PWA',
      short:  'Learner PWA',
      route:  '/learner'
    }
  },

  defaults: {
    weeklyTargetHours:        35,
    activityTargetWeekly:     5,
    checkInFrequency:         'daily',
    evidenceRequired:         true,
    demoModeEnabled:          true,
    organisationName:         '4P3X Base Organisation'
  },

  theme: {
    default: 'dark',
    options: ['dark']
  },

  features: {
    sidebar:       true,
    topnav:        true,
    pwa:           true,
    routing:       true,
    auth:          true,
    ai:            true,
    offline:       true,
    notifications: true,
    demoToggle:    true,
    reports:       true,
    evidence:      true
  }
}

export default APP_CONFIG
