/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — App Configuration
 * Participant PWA + Admin Monitoring Dashboard
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */

export const APP_CONFIG = {
  name:        '4P3X Learning & Monitoring Base OS™',
  shortName:   '4P3X Base OS',
  version:     '1.0.0',
  buildStage:  '4P3X Learning & Monitoring Base OS™ — Reusable Base Platform',
  tagline:     'Participant PWA + Admin Monitoring Dashboard',
  brand:       'Powered by 4P3X Intelligent AI — Created by Kyzel Kreates',

  products: {
    adminDashboard: {
      name:   '4P3X Admin Monitoring Dashboard',
      short:  'Admin Dashboard',
      route:  '/dashboard'
    },
    participantPWA: {
      name:   '4P3X Participant PWA',
      short:  'Participant App',
      route:  '/participant-app'
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
