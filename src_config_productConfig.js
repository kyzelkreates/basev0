/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — Product Config
 * Central label + identity configuration layer.
 * Update this file to refactor into any sector-specific product.
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */

export const PRODUCT_CONFIG = {
  // ── Identity ──────────────────────────────────────────────
  productName:       '4P3X Learning & Monitoring Base OS™',
  productSubtitle:   'Participant PWA + Admin Monitoring Dashboard',
  brandLine:         'Powered by 4P3X Intelligent AI — Created by Kyzel Kreates',
  shortName:         '4P3X Base OS',
  version:           '1.0.0',

  // ── Mode ──────────────────────────────────────────────────
  productMode:       'generic-base',
  demoModeEnabled:   true,  // overridden by useConfigStore at runtime

  // ── Labels (change here to refactor into any domain) ──────
  defaultParticipantLabel:   'Participant',
  defaultAdminLabel:         'Admin',
  defaultMentorLabel:        'Mentor / Practitioner',
  defaultActivityLabel:      'Activity',
  defaultEvidenceLabel:      'Evidence',
  defaultProgressLabel:      'Progress',
  defaultWeeklyTargetLabel:  'Weekly Target Hours',
  defaultTaskLabel:          'Task',
  defaultCheckInLabel:       'Check-in',
  defaultReviewSessionLabel: 'Review Session',
  defaultMilestoneLabel:     'Milestone',

  // ── Refactor targets (documentation only — for future use) ─
  supportedRefactorTargets: [
    'Learning Platform',
    'Coaching System',
    'Patient Support System',
    'Employee Onboarding',
    'Training Portal',
    'Wellbeing Tracker',
    'Compliance Learning System',
    'Progress Monitoring Dashboard',
    'Recovery Support Platform',
    'Evidence-Based Progress Tracker',
  ],

  // ── AI Layer ──────────────────────────────────────────────
  ai: {
    ai1Name:    '4P3X Intelligent AI 1 — Admin Guide',
    ai2Name:    '4P3X Intelligent AI 2 — Progress Insight',
    ai3Name:    '4P3X Intelligent AI 3 — Participant Guide',
    ai4Name:    '4P3X Intelligent AI 4 — Support Assistant',
    disclaimer: 'The AI assistant is advisory only. It does not replace a qualified professional, manager, clinician, legal adviser, or compliance officer.',
  },
}

export default PRODUCT_CONFIG
