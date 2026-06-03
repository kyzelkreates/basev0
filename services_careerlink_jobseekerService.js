/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — Participant Service
 * SSOT service for participant CRUD + status management.
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 *
 * Internal file name preserved (jobseekerService) for backward
 * compatibility with import references throughout the codebase.
 * All user-facing labels use "Participant" throughout the UI.
 * ============================================================
 */

import { STORAGE_KEYS, genId } from './core_storage'

const PARTICIPANT_KEY = STORAGE_KEYS.PARTICIPANTS

// ─── Status constants ─────────────────────────────────────────
// Legacy names preserved as values — internal identifiers only.
export const PARTICIPANT_STATUS = {
  ACTIVE:      'active',
  INACTIVE:    'inactive',
  AT_RISK:     'at_risk',
  ON_HOLD:     'on_hold',
  COMPLETED:   'completed',
  ENROLLED:    'enrolled',
}

// Legacy alias — preserved for backward compatibility
export const JOBSEEKER_STATUS = PARTICIPANT_STATUS

export const RISK_LEVEL = {
  LOW:      'low',
  MEDIUM:   'medium',
  HIGH:     'high',
  CRITICAL: 'critical',
}

const persist = {
  get: (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : fallback
    } catch { return fallback }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* silent */ }
  }
}

function getAll() {
  return persist.get(PARTICIPANT_KEY, [])
}

function save(list) {
  persist.set(PARTICIPANT_KEY, list)
}

export const participantService = {
  getAll,

  getById: (id) => getAll().find(p => p.id === id) || null,

  create: (data) => {
    const record = {
      id:               genId(),
      displayName:      data.displayName || 'New Participant',
      email:            data.email || '',
      phone:            data.phone || '',
      status:           data.status || PARTICIPANT_STATUS.ACTIVE,
      programme:        data.programme || '',
      weeklyTargetHours: data.weeklyTargetHours ?? 35,
      riskLevel:        data.riskLevel || RISK_LEVEL.LOW,
      notes:            data.notes || '',
      isDemo:           data.isDemo || false,
      createdAt:        new Date().toISOString(),
      lastActiveAt:     new Date().toISOString(),
    }
    const list = [record, ...getAll()]
    save(list)
    return record
  },

  update: (id, patch) => {
    const list = getAll().map(p => p.id === id ? { ...p, ...patch, lastActiveAt: new Date().toISOString() } : p)
    save(list)
    return list.find(p => p.id === id) || null
  },

  delete: (id) => {
    const list = getAll().filter(p => p.id !== id)
    save(list)
  },

  getRealParticipants:    () => getAll().filter(p => !p.isDemo),
  getDemoParticipants:    () => getAll().filter(p => p.isDemo),

  removeDemoParticipants: () => {
    const list = getAll().filter(p => !p.isDemo)
    save(list)
    return list
  },

  bulkCreate: (list) => {
    const existing = getAll()
    const merged   = [...list, ...existing]
    save(merged)
    return merged
  },
}

// Legacy alias — files that import jobseekerService still work
export const jobseekerService = participantService

export default participantService
