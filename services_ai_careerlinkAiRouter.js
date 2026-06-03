/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — 4P3X Intelligent AI™
 * AI Router + Assistant Registry
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 *
 * FOUR SEPARATED EMBEDDED AI ASSISTANTS:
 *   AI 1 — 4P3X Intelligent AI 1 — Admin Guide        (dashboard_help)
 *   AI 2 — 4P3X Intelligent AI 2 — Progress Insight   (dashboard_data_insight)
 *   AI 3 — 4P3X Intelligent AI 3 — Participant Guide  (pwa_help)
 *   AI 4 — 4P3X Intelligent AI 4 — Support Assistant  (participant_support)
 *
 * LOCAL / RULE-BASED mode — no API keys required.
 * Advisory only. Human review required for all decisions.
 * The AI assistant is advisory only. It does not replace a
 * qualified professional, manager, clinician, legal adviser,
 * or compliance officer.
 * ============================================================
 */

import { AI_DISCLAIMER, AI_MODES } from './services_ai_aiConfig'

// ─── Assistant Keys (internal routing identifiers) ────────────
export const ASSISTANT_KEYS = {
  AI_1: '4p3x-ai-1-admin-guide',
  AI_2: '4p3x-ai-2-progress-insight',
  AI_3: '4p3x-ai-3-participant-guide',
  AI_4: '4p3x-ai-4-support-assistant',
}

// ─── Extended AI Config Defaults (4-assistant layer) ──────────
export const EXTENDED_AI_CONFIG_DEFAULTS = {
  aiEnabled:                   true,
  aiMode:                      'local',
  providerName:                'local',
  apiEndpoint:                 null,
  maskedApiKeyStatus:          'not_configured',
  lastTestStatus:              'not_tested',
  fourp3xAi1Enabled:           true,
  fourp3xAi2Enabled:           true,
  fourp3xAi3Enabled:           true,
  fourp3xAi4Enabled:           true,
  showConfidence:              true,
  showDataUsed:                true,
  requireHumanReviewNote:      true,
  enforceAssistantSeparation:  true,
  allowCrossAssistantHandoff:  true,
}

// ─── Assistant Registry ───────────────────────────────────────
export const ASSISTANT_REGISTRY = {
  '4p3x-ai-1-admin-guide': {
    assistantKey:    '4p3x-ai-1-admin-guide',
    publicName:      '4P3X Intelligent AI 1',
    displaySubtitle: 'Admin Guide',
    number:          1,
    location:        'dashboard',
    category:        'dashboard_help',
    purpose:         'Guides the admin around the dashboard, explains sections, and helps understand how the base system works.',
    forbiddenScope:  ['participant_support','data_correlation','risk_prioritisation','clinical_advice','legal_advice','compliance_decisions'],
    handoffTo: {
      data_insight:      '4p3x-ai-2-progress-insight',
      participant_pwa:   '4p3x-ai-3-participant-guide',
      encouragement:     '4p3x-ai-4-support-assistant',
    },
    enabledConfigKey: 'fourp3xAi1Enabled',
    quickActions: [
      { id:'show_around',          label:'Show me around' },
      { id:'explain_dashboard',    label:'Explain the dashboard' },
      { id:'explain_metrics',      label:'Explain these metrics' },
      { id:'add_participant',      label:'How do I add a participant?' },
      { id:'open_profile',         label:'How do I open a participant profile?' },
      { id:'send_pwa_link',        label:'How do I send the PWA link?' },
      { id:'review_progress',      label:'How do I review weekly progress?' },
      { id:'check_evidence',       label:'How do I check evidence?' },
      { id:'use_reports',          label:'How do I use reports?' },
      { id:'risk_levels',          label:'What do risk levels mean?' },
      { id:'turn_off_demo',        label:'How do I turn demo data off?' },
      { id:'check_first_today',    label:'What should I check first today?' },
    ],
  },

  '4p3x-ai-2-progress-insight': {
    assistantKey:    '4p3x-ai-2-progress-insight',
    publicName:      '4P3X Intelligent AI 2',
    displaySubtitle: 'Progress Insight',
    number:          2,
    location:        'dashboard',
    category:        'dashboard_data_insight',
    purpose:         'Helps interpret participant activity, check-ins, evidence, tasks, milestones, progress patterns, and missing information.',
    forbiddenScope:  ['participant_support','clinical_advice','legal_advice','compliance_decisions','direct_communication'],
    handoffTo: {
      dashboard_help:   '4p3x-ai-1-admin-guide',
      participant_pwa:  '4p3x-ai-3-participant-guide',
      encouragement:    '4p3x-ai-4-support-assistant',
    },
    enabledConfigKey: 'fourp3xAi2Enabled',
    quickActions: [
      { id:'who_needs_attention',   label:'Who needs attention?' },
      { id:'activity_summary',      label:'Summarise recent activity' },
      { id:'evidence_gaps',         label:'Who is missing evidence?' },
      { id:'checkin_summary',       label:'Summarise check-ins' },
      { id:'progress_overview',     label:'Overall progress overview' },
      { id:'upcoming_reviews',      label:'Show upcoming reviewSessions' },
      { id:'summarise_participant', label:'Summarise this participant' },
      { id:'explain_risk_flag',     label:'Explain this risk flag' },
      { id:'what_next_admin',       label:'What should I do next?' },
      { id:'action_summary',        label:'Create admin action summary' },
    ],
  },

  '4p3x-ai-3-participant-guide': {
    assistantKey:    '4p3x-ai-3-participant-guide',
    publicName:      '4P3X Intelligent AI 3',
    displaySubtitle: 'Participant Guide',
    number:          3,
    location:        'participant_pwa',
    category:        'pwa_help',
    purpose:         'Guides the participant around the PWA and explains how to complete tasks, check-ins, evidence uploads, learning items, and progress updates.',
    forbiddenScope:  ['admin_insights','risk_prioritisation','admin_notes','legal_advice','compliance_decisions','deep_clinical_support'],
    handoffTo: {
      support:       '4p3x-ai-4-support-assistant',
      admin_insight: '4p3x-ai-2-progress-insight',
    },
    enabledConfigKey: 'fourp3xAi3Enabled',
    quickActions: [
      { id:'show_around',          label:'Show me around' },
      { id:'log_activity',         label:'How do I log activity time?' },
      { id:'add_task_record',      label:'How do I add a task record?' },
      { id:'add_review_session',   label:'How do I add a review session?' },
      { id:'complete_checkin',     label:'How do I complete my check-in?' },
      { id:'add_evidence',         label:'How do I add evidence?' },
      { id:'request_support',      label:'How do I request support?' },
      { id:'see_progress',         label:'How do I see my progress?' },
      { id:'progress_bar',         label:'What does my progress bar mean?' },
      { id:'install_app',          label:'How do I install this app?' },
    ],
  },

  '4p3x-ai-4-support-assistant': {
    assistantKey:    '4p3x-ai-4-support-assistant',
    publicName:      '4P3X Intelligent AI 4',
    displaySubtitle: 'Support Assistant',
    number:          4,
    location:        'participant_pwa',
    category:        'participant_support',
    purpose:         'Provides neutral, non-clinical, non-legal, non-financial support explanations based on the configured product type. Helps participants with planning, next steps, confidence, and activity reminders.',
    forbiddenScope:  ['admin_dashboard','admin_data_correlation','official_compliance_decisions','legal_advice','medical_advice','other_participants'],
    handoffTo: {
      pwa_help:    '4p3x-ai-3-participant-guide',
      admin_guide: '4p3x-ai-1-admin-guide',
    },
    enabledConfigKey: 'fourp3xAi4Enabled',
    quickActions: [
      { id:'what_next',         label:'What should I do next?' },
      { id:'plan_today',        label:'Help me plan today' },
      { id:'hours_remaining',   label:'How many hours do I still need?' },
      { id:'small_steps',       label:'Break this into small steps' },
      { id:'prepare_review',    label:'Help me prepare for my review session' },
      { id:'improve_task',      label:'Help me improve my task submission' },
      { id:'evidence_advice',   label:'What evidence should I add?' },
      { id:'feel_stuck',        label:'I feel stuck' },
      { id:'need_support',      label:'I need support' },
      { id:'encourage_me',      label:'Encourage me' },
    ],
  },
}

// ─── Response builder ─────────────────────────────────────────
export function buildAIResponse({
  assistantKey, title, summary, suggestion, reason,
  dataUsed, confidence = 'Medium', urgency = null,
  handoffTarget = null, nextActions = [],
}) {
  const assistant = ASSISTANT_REGISTRY[assistantKey]
  return {
    assistantKey,
    assistantName:       assistant ? assistant.publicName    : assistantKey,
    displaySubtitle:     assistant ? assistant.displaySubtitle : '',
    title:               title      || '',
    summary:             summary    || '',
    suggestion:          suggestion || '',
    reason:              reason     || '',
    dataUsed:            dataUsed   || 'Stored 4P3X Base OS activity data.',
    confidence,
    urgency,
    humanReviewRequired: true,
    humanReviewNote:     'The AI assistant is advisory only. It does not replace a qualified professional, manager, clinician, legal adviser, or compliance officer. All important decisions should be reviewed by an appropriate human support person.',
    disclaimer:          AI_DISCLAIMER || 'Advisory only. Human review required.',
    handoffTarget,
    nextActions,
    generatedAt:         new Date().toISOString(),
  }
}

// ─── Scope guard ──────────────────────────────────────────────
export function validateAssistantScope(assistantKey, actionCategory) {
  const assistant = ASSISTANT_REGISTRY[assistantKey]
  if (!assistant) return { allowed: false, reason: 'Unknown assistant.' }
  if (assistant.forbiddenScope.includes(actionCategory)) {
    return { allowed: false, reason: `Outside ${assistant.publicName} scope.` }
  }
  return { allowed: true }
}

// ─── Handoff message ──────────────────────────────────────────
export function buildHandoffMessage(fromKey, toKey, reason) {
  const from = ASSISTANT_REGISTRY[fromKey]
  const to   = ASSISTANT_REGISTRY[toKey]
  if (!from || !to) return buildAIResponse({
    assistantKey: fromKey || ASSISTANT_KEYS.AI_1,
    title: 'Handoff', summary: 'Please use the correct assistant.',
    suggestion: '', reason: '', dataUsed: 'None.', confidence: 'High',
  })
  return buildAIResponse({
    assistantKey: fromKey,
    title:        'Outside My Area',
    summary:      `That question is better handled by ${to.publicName} — ${to.displaySubtitle}.`,
    suggestion:   `Please ask ${to.publicName} — ${to.displaySubtitle}${to.location === 'participant_pwa' ? ' in the Participant App' : ' on the Admin Dashboard'}.`,
    reason:       reason || `${from.publicName} handles ${from.purpose.split('.')[0].toLowerCase()} only.`,
    dataUsed:     'None — scope guard triggered.',
    confidence:   'High',
    handoffTarget: toKey,
    nextActions:  [`Switch to ${to.publicName}`],
  })
}

// ─── Utility functions ────────────────────────────────────────
export function getAssistantByKey(assistantKey) {
  return ASSISTANT_REGISTRY[assistantKey] || null
}

export function getHandoffTarget(assistantKey, targetCategory) {
  const assistant = ASSISTANT_REGISTRY[assistantKey]
  if (!assistant) return null
  return assistant.handoffTo ? assistant.handoffTo[targetCategory] : null
}

export function isAssistantEnabled(assistantKey, aiConfig) {
  const assistant = ASSISTANT_REGISTRY[assistantKey]
  if (!assistant) return false
  const mode = (aiConfig && aiConfig.aiMode) ? aiConfig.aiMode : 'local'
  if (mode === 'off') return false
  if (aiConfig && aiConfig.aiEnabled === false) return false
  const configKey = assistant.enabledConfigKey
  return !(aiConfig && aiConfig[configKey] === false)
}

export default {
  ASSISTANT_KEYS, ASSISTANT_REGISTRY, EXTENDED_AI_CONFIG_DEFAULTS,
  buildAIResponse, validateAssistantScope, buildHandoffMessage,
  getAssistantByKey, getHandoffTarget, isAssistantEnabled,
}
