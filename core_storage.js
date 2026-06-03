/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — SINGLE SOURCE OF TRUTH
 * Participant PWA + Admin Monitoring Dashboard
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 *
 * ALL system state reads and writes go through this module.
 * NO secondary state engines.
 * NO duplicate localStorage keys.
 * NO hard-coded UI state outside this file.
 *
 * STORAGE KEY MIGRATION NOTE:
 * Legacy 'cl:' prefix keys are read on first load and migrated
 * to '4p3x:' prefix keys automatically to preserve existing data.
 * ============================================================
 */

import { create } from 'zustand'

// ─── Storage Key Migration ─────────────────────────────────────
// Runs once on module load — copies cl: keys to 4p3x: keys if present.
;(function migrateStorageKeys() {
  const MAP = {
    'cl:app:theme':          '4p3x:app:theme',
    'cl:app:sidebar':        '4p3x:app:sidebar',
    'cl:app:locale':         '4p3x:app:locale',
    'cl:auth:session':       '4p3x:auth:session',
    'cl:auth:user':          '4p3x:auth:user',
    'cl:auth:role':          '4p3x:auth:role',
    'cl:config:app':         '4p3x:config:app',
    'cl:ai:provider':        '4p3x:ai:provider',
    'cl:ai:model':           '4p3x:ai:model',
    'cl:ai:config':          '4p3x:ai:config',
    'cl:participant:session':  '4p3x:participant:session',
    'cl:participant:selected': '4p3x:participant:selected',
    'cl:data:participants':    '4p3x:data:participants',
    'cl:data:activityLogs':  '4p3x:data:activityLogs',
    'cl:data:activityRecords':  '4p3x:data:activityRecords',
    'cl:data:reviewSessions':    '4p3x:data:reviewSessions',
    'cl:data:checkIns':      '4p3x:data:checkIns',
    'cl:data:evidenceRecords':'4p3x:data:evidenceRecords',
    'cl:data:tasks':         '4p3x:data:tasks',
    'cl:data:supportFlags':  '4p3x:data:supportFlags',
    'cl:data:coachNotes':    '4p3x:data:mentorNotes',
    'cl:notif:queue':        '4p3x:notif:queue',
    'cl:notif:prefs':        '4p3x:notif:prefs',
  }
  try {
    Object.entries(MAP).forEach(([oldKey, newKey]) => {
      if (localStorage.getItem(oldKey) !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, localStorage.getItem(oldKey))
        // Keep old key in place — do not remove (rollback safety)
      }
    })
  } catch { /* silent — storage may be unavailable */ }
})()

// ─── Storage Keys ─────────────────────────────────────────────
export const STORAGE_KEYS = {
  // App
  APP_THEME:             '4p3x:app:theme',
  APP_SIDEBAR:           '4p3x:app:sidebar',
  APP_LOCALE:            '4p3x:app:locale',

  // Auth
  AUTH_SESSION:          '4p3x:auth:session',
  AUTH_USER:             '4p3x:auth:user',
  AUTH_ROLE:             '4p3x:auth:role',

  // Config
  APP_CONFIG:            '4p3x:config:app',

  // AI
  AI_PROVIDER:           '4p3x:ai:provider',
  AI_MODEL:              '4p3x:ai:model',
  AI_CONFIG:             '4p3x:ai:config',

  // Participant (PWA)
  PARTICIPANT_SESSION:   '4p3x:participant:session',
  PARTICIPANT_SELECTED:  '4p3x:participant:selected',

  // Data
  PARTICIPANTS:          '4p3x:data:participants',
  ACTIVITY_LOGS:         '4p3x:data:activityLogs',
  APPLICATIONS:      '4p3x:data:activityRecords',
  INTERVIEWS:       '4p3x:data:reviewSessions',
  CHECKINS:              '4p3x:data:checkIns',
  EVIDENCE:              '4p3x:data:evidenceRecords',
  TASKS:                 '4p3x:data:tasks',
  SUPPORT_FLAGS:         '4p3x:data:supportFlags',
  MENTOR_NOTES:          '4p3x:data:mentorNotes',

  // Notifications
  NOTIF_QUEUE:           '4p3x:notif:queue',
  NOTIF_PREFS:           '4p3x:notif:prefs',
}

// ─── Persist Helpers ──────────────────────────────────────────
const persist = {
  get: (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn('[4P3X:Storage] persist.set failed:', key, e)
    }
  },
  remove: (key) => {
    try { localStorage.removeItem(key) } catch { /* silent */ }
  },
  clear: (prefix = '4p3x:') => {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(prefix))
        .forEach(k => localStorage.removeItem(k))
    } catch { /* silent */ }
  }
}

// ─── ID Generator ─────────────────────────────────────────────
export const genId = () => `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

// ─── App Config Store ─────────────────────────────────────────
const DEFAULT_APP_CONFIG = {
  appName:                   '4P3X Learning & Monitoring Base OS™',
  brandLine:                 'Powered by 4P3X Intelligent AI — Created by Kyzel Kreates',
  organisationName:          '4P3X Base Organisation',
  weeklyTargetHoursDefault:  35,
  activityTargetDefault:     5,
  checkInFrequency:          'daily',
  evidenceRequired:          true,
  demoModeEnabled:           true,
  pwaInstallEnabled:         true,
}

export const useConfigStore = create((set, get) => ({
  config: persist.get(STORAGE_KEYS.APP_CONFIG, DEFAULT_APP_CONFIG),

  getConfig: () => get().config,

  updateConfig: (patch) => {
    const next = { ...get().config, ...patch }
    persist.set(STORAGE_KEYS.APP_CONFIG, next)
    set({ config: next })
  },

  setDemoMode: (enabled) => {
    const next = { ...get().config, demoModeEnabled: enabled }
    persist.set(STORAGE_KEYS.APP_CONFIG, next)
    set({ config: next })
  },

  isDemoMode: () => get().config.demoModeEnabled,

  getWeeklyTarget: () => get().config.weeklyTargetHoursDefault ?? 35,

  resetConfig: () => {
    persist.set(STORAGE_KEYS.APP_CONFIG, DEFAULT_APP_CONFIG)
    set({ config: DEFAULT_APP_CONFIG })
  }
}))

// ─── App Store ────────────────────────────────────────────────
export const useAppStore = create((set, get) => ({
  theme:           persist.get(STORAGE_KEYS.APP_THEME, 'dark'),
  sidebarExpanded: false,
  locale:          persist.get(STORAGE_KEYS.APP_LOCALE, 'en'),
  systemStatus:    'online',
  notifications:   [],
  alerts:          [],

  setTheme: (theme) => {
    persist.set(STORAGE_KEYS.APP_THEME, theme)
    set({ theme })
  },
  toggleSidebar: () => {
    const next = !get().sidebarExpanded
    persist.set(STORAGE_KEYS.APP_SIDEBAR, next)
    set({ sidebarExpanded: next })
  },
  setSidebarExpanded: (val) => {
    persist.set(STORAGE_KEYS.APP_SIDEBAR, val)
    set({ sidebarExpanded: val })
  },
  closeSidebar: () => set({ sidebarExpanded: false }),
  openSidebar:  () => set({ sidebarExpanded: true }),
  setSystemStatus: (status) => set({ systemStatus: status }),
  addNotification: (notif) => set(s => ({
    notifications: [{ id: Date.now(), ...notif }, ...s.notifications].slice(0, 50)
  })),
  clearNotifications: () => set({ notifications: [] }),
  addAlert: (alert) => set(s => ({
    alerts: [{ id: Date.now(), ...alert }, ...s.alerts].slice(0, 20)
  })),
  dismissAlert: (id) => set(s => ({
    alerts: s.alerts.filter(a => a.id !== id)
  })),
}))

// ─── Auth Store ───────────────────────────────────────────────
export const useAuthStore = create((set) => ({
  session:         persist.get(STORAGE_KEYS.AUTH_SESSION, null),
  user:            persist.get(STORAGE_KEYS.AUTH_USER, null),
  role:            persist.get(STORAGE_KEYS.AUTH_ROLE, null),
  isLoading:       false,
  isAuthenticated: false,

  setSession: (session) => {
    persist.set(STORAGE_KEYS.AUTH_SESSION, session)
    set({ session, isAuthenticated: !!session })
  },
  setUser: (user) => {
    persist.set(STORAGE_KEYS.AUTH_USER, user)
    set({ user })
  },
  setRole: (role) => {
    persist.set(STORAGE_KEYS.AUTH_ROLE, role)
    set({ role })
  },
  setLoading: (isLoading) => set({ isLoading }),
  clearAuth: () => {
    persist.remove(STORAGE_KEYS.AUTH_SESSION)
    persist.remove(STORAGE_KEYS.AUTH_USER)
    persist.remove(STORAGE_KEYS.AUTH_ROLE)
    set({ session: null, user: null, role: null, isAuthenticated: false })
  }
}))

// ─── AI Store ─────────────────────────────────────────────────
export const useAIStore = create((set) => ({
  provider:       persist.get(STORAGE_KEYS.AI_PROVIDER, 'openai'),
  model:          persist.get(STORAGE_KEYS.AI_MODEL, null),
  config:         persist.get(STORAGE_KEYS.AI_CONFIG, {}),
  status:         'idle',
  activeModule:   null,
  tokenUsage:     { prompt: 0, completion: 0, total: 0 },
  costEstimate:   0,
  fallbackActive: false,

  setProvider: (provider) => {
    persist.set(STORAGE_KEYS.AI_PROVIDER, provider)
    set({ provider })
  },
  setModel: (model) => {
    persist.set(STORAGE_KEYS.AI_MODEL, model)
    set({ model })
  },
  setConfig: (config) => {
    persist.set(STORAGE_KEYS.AI_CONFIG, config)
    set({ config })
  },
  setStatus:         (status) => set({ status }),
  setActiveModule:   (module) => set({ activeModule: module }),
  setFallbackActive: (val)    => set({ fallbackActive: val }),
  updateTokenUsage:  (usage)  => set(s => ({
    tokenUsage: {
      prompt:     s.tokenUsage.prompt + (usage.prompt || 0),
      completion: s.tokenUsage.completion + (usage.completion || 0),
      total:      s.tokenUsage.total + (usage.total || 0)
    }
  })),
}))

// ─── Participant Store ────────────────────────────────────────
// NOTE: internal store variable kept as 'jobseekerStore' reference
// for backward compat with any remaining references — user-facing
// labels are 'participant' throughout the UI.
export const useParticipantStore = create((set) => ({
  participants:          [],
  activeParticipant:     persist.get(STORAGE_KEYS.PARTICIPANT_SELECTED, null),
  participantSession:    persist.get(STORAGE_KEYS.PARTICIPANT_SESSION, null),
  isLoading:             false,

  setParticipants:      (participants)    => set({ participants }),
  setActiveParticipant: (participant) => {
    persist.set(STORAGE_KEYS.PARTICIPANT_SELECTED, participant)
    set({ activeParticipant: participant })
  },
  setParticipantSession: (session) => {
    persist.set(STORAGE_KEYS.PARTICIPANT_SESSION, session)
    set({ participantSession: session })
  },
  setLoading: (isLoading) => set({ isLoading })
}))

// Legacy alias — preserves backward compatibility with any files that
// still reference useJobseekerStore (TODO: migrate all references)
export const useJobseekerStore = useParticipantStore

// ─── Data Store — all 4P3X Base OS records ────────────────────
export const useDataStore = create((set, get) => ({
  activityLogs:    persist.get(STORAGE_KEYS.ACTIVITY_LOGS, []),
  activityRecords: persist.get(STORAGE_KEYS.APPLICATIONS, []),
  reviewSessions:  persist.get(STORAGE_KEYS.INTERVIEWS, []),
  checkIns:        persist.get(STORAGE_KEYS.CHECKINS, []),
  evidenceRecords: persist.get(STORAGE_KEYS.EVIDENCE, []),
  tasks:           persist.get(STORAGE_KEYS.TASKS, []),
  supportFlags:    persist.get(STORAGE_KEYS.SUPPORT_FLAGS, []),
  mentorNotes:     persist.get(STORAGE_KEYS.MENTOR_NOTES, []),

  // Legacy aliases (TODO: migrate all component references)
  get activityRecordsAlias() { return this.activityRecords },
  get reviewSessionsAlias()  { return this.reviewSessions },
  get coachNotes()    { return this.mentorNotes },

  // ── Activity Logs ──
  addActivityLog: (log) => {
    const next = [{ id: genId(), createdAt: new Date().toISOString(), ...log }, ...get().activityLogs]
    persist.set(STORAGE_KEYS.ACTIVITY_LOGS, next)
    set({ activityLogs: next })
  },
  updateActivityLog: (id, patch) => {
    const next = get().activityLogs.map(r => r.id === id ? { ...r, ...patch } : r)
    persist.set(STORAGE_KEYS.ACTIVITY_LOGS, next)
    set({ activityLogs: next })
  },
  deleteActivityLog: (id) => {
    const next = get().activityLogs.filter(r => r.id !== id)
    persist.set(STORAGE_KEYS.ACTIVITY_LOGS, next)
    set({ activityLogs: next })
  },

  // ── Activity Records (formerly Activity Records) ──
  addActivityRecord: (rec) => {
    const next = [{ id: genId(), createdAt: new Date().toISOString(), ...rec }, ...get().activityRecords]
    persist.set(STORAGE_KEYS.APPLICATIONS, next)
    set({ activityRecords: next })
  },
  updateActivityRecord: (id, patch) => {
    const next = get().activityRecords.map(r => r.id === id ? { ...r, ...patch } : r)
    persist.set(STORAGE_KEYS.APPLICATIONS, next)
    set({ activityRecords: next })
  },
  deleteActivityRecord: (id) => {
    const next = get().activityRecords.filter(r => r.id !== id)
    persist.set(STORAGE_KEYS.APPLICATIONS, next)
    set({ activityRecords: next })
  },
  // Legacy aliases
  addApplication:    function(a)    { return this.addActivityRecord(a) },
  updateApplication: function(i, p) { return this.updateActivityRecord(i, p) },
  deleteApplication: function(i)    { return this.deleteActivityRecord(i) },

  // ── Review Sessions (formerly Review Sessions) ──
  addReviewSession: (sess) => {
    const next = [{ id: genId(), createdAt: new Date().toISOString(), ...sess }, ...get().reviewSessions]
    persist.set(STORAGE_KEYS.INTERVIEWS, next)
    set({ reviewSessions: next })
  },
  updateReviewSession: (id, patch) => {
    const next = get().reviewSessions.map(r => r.id === id ? { ...r, ...patch } : r)
    persist.set(STORAGE_KEYS.INTERVIEWS, next)
    set({ reviewSessions: next })
  },
  deleteReviewSession: (id) => {
    const next = get().reviewSessions.filter(r => r.id !== id)
    persist.set(STORAGE_KEYS.INTERVIEWS, next)
    set({ reviewSessions: next })
  },
  // Legacy aliases
  addInterview:    function(a)    { return this.addReviewSession(a) },
  updateInterview: function(i, p) { return this.updateReviewSession(i, p) },
  deleteInterview: function(i)    { return this.deleteReviewSession(i) },

  // ── Check-ins ──
  addCheckIn: (ci) => {
    const next = [{ id: genId(), createdAt: new Date().toISOString(), ...ci }, ...get().checkIns]
    persist.set(STORAGE_KEYS.CHECKINS, next)
    set({ checkIns: next })
  },
  updateCheckIn: (id, patch) => {
    const next = get().checkIns.map(r => r.id === id ? { ...r, ...patch } : r)
    persist.set(STORAGE_KEYS.CHECKINS, next)
    set({ checkIns: next })
  },
  deleteCheckIn: (id) => {
    const next = get().checkIns.filter(r => r.id !== id)
    persist.set(STORAGE_KEYS.CHECKINS, next)
    set({ checkIns: next })
  },

  // ── Evidence ──
  addEvidence: (ev) => {
    const next = [{ id: genId(), createdAt: new Date().toISOString(), ...ev }, ...get().evidenceRecords]
    persist.set(STORAGE_KEYS.EVIDENCE, next)
    set({ evidenceRecords: next })
  },
  updateEvidence: (id, patch) => {
    const next = get().evidenceRecords.map(r => r.id === id ? { ...r, ...patch } : r)
    persist.set(STORAGE_KEYS.EVIDENCE, next)
    set({ evidenceRecords: next })
  },
  deleteEvidence: (id) => {
    const next = get().evidenceRecords.filter(r => r.id !== id)
    persist.set(STORAGE_KEYS.EVIDENCE, next)
    set({ evidenceRecords: next })
  },

  // ── Tasks ──
  addTask: (task) => {
    const next = [{ id: genId(), createdAt: new Date().toISOString(), ...task }, ...get().tasks]
    persist.set(STORAGE_KEYS.TASKS, next)
    set({ tasks: next })
  },
  updateTask: (id, patch) => {
    const next = get().tasks.map(r => r.id === id ? { ...r, ...patch } : r)
    persist.set(STORAGE_KEYS.TASKS, next)
    set({ tasks: next })
  },
  deleteTask: (id) => {
    const next = get().tasks.filter(r => r.id !== id)
    persist.set(STORAGE_KEYS.TASKS, next)
    set({ tasks: next })
  },

  // ── Support Flags ──
  addSupportFlag: (flag) => {
    const next = [{ id: genId(), createdAt: new Date().toISOString(), ...flag }, ...get().supportFlags]
    persist.set(STORAGE_KEYS.SUPPORT_FLAGS, next)
    set({ supportFlags: next })
  },
  updateSupportFlag: (id, patch) => {
    const next = get().supportFlags.map(r => r.id === id ? { ...r, ...patch } : r)
    persist.set(STORAGE_KEYS.SUPPORT_FLAGS, next)
    set({ supportFlags: next })
  },
  deleteSupportFlag: (id) => {
    const next = get().supportFlags.filter(r => r.id !== id)
    persist.set(STORAGE_KEYS.SUPPORT_FLAGS, next)
    set({ supportFlags: next })
  },

  // ── Mentor Notes (formerly Mentor Notes) ──
  addMentorNote: (note) => {
    const next = [{ id: genId(), createdAt: new Date().toISOString(), ...note }, ...get().mentorNotes]
    persist.set(STORAGE_KEYS.MENTOR_NOTES, next)
    set({ mentorNotes: next })
  },
  updateMentorNote: (id, patch) => {
    const next = get().mentorNotes.map(r => r.id === id ? { ...r, ...patch } : r)
    persist.set(STORAGE_KEYS.MENTOR_NOTES, next)
    set({ mentorNotes: next })
  },
  deleteMentorNote: (id) => {
    const next = get().mentorNotes.filter(r => r.id !== id)
    persist.set(STORAGE_KEYS.MENTOR_NOTES, next)
    set({ mentorNotes: next })
  },
  // Legacy alias
  addCoachNote:    function(a)    { return this.addMentorNote(a) },
  updateCoachNote: function(i, p) { return this.updateMentorNote(i, p) },
  deleteCoachNote: function(i)    { return this.deleteMentorNote(i) },

  // ── Reset All Data ──
  resetAllData: () => {
    Object.values(STORAGE_KEYS).forEach(k => {
      if (k.startsWith('4p3x:data:')) persist.remove(k)
    })
    set({
      activityLogs: [], activityRecords: [], reviewSessions: [],
      checkIns: [], evidenceRecords: [], tasks: [], supportFlags: [], mentorNotes: [],
    })
  },
}))

// ─── Derived Metrics Helper ────────────────────────────────────
export function deriveParticipantMetrics(participant, dataStore, weeklyTargetHours = 35) {
  if (!participant) return null
  const pid = participant.id
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay())
  weekStart.setHours(0, 0, 0, 0)

  const thisWeekLogs = (dataStore.activityLogs || []).filter(l =>
    l.participantId === pid && new Date(l.date) >= weekStart
  )
  const weeklyMinutes   = thisWeekLogs.reduce((s, l) => s + (l.durationMinutes || 0), 0)
  const weeklyHours     = weeklyMinutes / 60
  const target          = participant.weeklyTargetHours ?? weeklyTargetHours
  const weeklyTargetPct = target > 0 ? Math.min(100, Math.round((weeklyHours / target) * 100)) : 0

  const allRecords     = (dataStore.activityRecords || []).filter(r => r.participantId === pid)
  const allReviews     = (dataStore.reviewSessions  || []).filter(r => r.participantId === pid)
  const allCheckIns    = (dataStore.checkIns         || []).filter(r => r.participantId === pid)
  const allEvidence    = (dataStore.evidenceRecords  || []).filter(r => r.participantId === pid)
  const allFlags       = (dataStore.supportFlags     || []).filter(r => r.participantId === pid)

  const recentCheckIn  = allCheckIns[0] || null
  const confidenceScore = recentCheckIn?.confidenceScore ?? null

  return {
    weeklyHours:         Math.round(weeklyHours * 10) / 10,
    weeklyTargetHours:   target,
    weeklyTargetPercent: weeklyTargetPct,
    totalActivityLogs:   (dataStore.activityLogs || []).filter(l => l.participantId === pid).length,
    totalActivityRecords: allRecords.length,
    totalReviewSessions: allReviews.length,
    totalCheckIns:       allCheckIns.length,
    totalEvidence:       allEvidence.length,
    openSupportFlags:    allFlags.filter(f => !f.resolved).length,
    confidenceScore,
    lastCheckIn:         recentCheckIn?.date || null,
  }
}

// Legacy alias — components that import deriveJobseekerMetrics still work
export const deriveJobseekerMetrics = deriveParticipantMetrics
