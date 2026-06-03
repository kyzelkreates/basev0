/**
 * ============================================================
 * 4P3X Refractable Base OS™ — Demo Data Service
 * Generates presentation-safe generic demo records.
 * ALL demo records are marked isDemo: true.
 * Demo mode ON/OFF is controlled by useConfigStore.
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */

import { genId } from './core_storage'

const now       = () => new Date().toISOString()
const daysAgo   = (n) => new Date(Date.now() - n * 86400000).toISOString()
const weeksAgo  = (n) => daysAgo(n * 7)
const hoursFromNow = (h) => new Date(Date.now() + h * 3600000).toISOString()

// ─── Demo Participants ─────────────────────────────────────────
export const DEMO_PARTICIPANTS = [
  {
    id: 'demo_p_001',
    displayName: 'Alex Morgan',
    email: 'alex.m@demo.4p3xbase',
    phone: '07700 000001',
    status: 'active',
    programme: 'Foundation Programme',
    weeklyTargetHours: 35,
    riskLevel: 'low',
    notes: 'Strong engagement. Completing assigned activities consistently.',
    isDemo: true,
    createdAt: weeksAgo(6),
    lastActiveAt: daysAgo(1),
  },
  {
    id: 'demo_p_002',
    displayName: 'Jordan Lee',
    email: 'jordan.l@demo.4p3xbase',
    phone: '07700 000002',
    status: 'at_risk',
    programme: 'Support & Progress Programme',
    weeklyTargetHours: 35,
    riskLevel: 'high',
    notes: 'Support barrier flagged. May need adjusted activity schedule.',
    isDemo: true,
    createdAt: weeksAgo(8),
    lastActiveAt: daysAgo(5),
  },
  {
    id: 'demo_p_003',
    displayName: 'Sam Taylor',
    email: 'sam.t@demo.4p3xbase',
    phone: '07700 000003',
    status: 'active',
    programme: 'Foundation Programme',
    weeklyTargetHours: 35,
    riskLevel: 'medium',
    notes: 'Making steady progress. First review session coming up.',
    isDemo: true,
    createdAt: weeksAgo(4),
    lastActiveAt: daysAgo(2),
  },
  {
    id: 'demo_p_004',
    displayName: 'Priya Sharma',
    email: 'priya.s@demo.4p3xbase',
    phone: '07700 000004',
    status: 'active',
    programme: 'Skills Academy Programme',
    weeklyTargetHours: 20,
    riskLevel: 'low',
    notes: 'Enrolled in digital skills training. On track.',
    isDemo: true,
    createdAt: weeksAgo(3),
    lastActiveAt: daysAgo(1),
  },
  {
    id: 'demo_p_005',
    displayName: 'Leon Fraser',
    email: 'leon.f@demo.4p3xbase',
    phone: '07700 000005',
    status: 'inactive',
    programme: 'Local Support Programme',
    weeklyTargetHours: 35,
    riskLevel: 'critical',
    notes: 'No check-in for 10 days. Wellbeing check recommended.',
    isDemo: true,
    createdAt: weeksAgo(10),
    lastActiveAt: daysAgo(10),
  },
]

// Legacy alias — any code referencing DEMO_JOBSEEKERS still works
export const DEMO_JOBSEEKERS = DEMO_PARTICIPANTS

// ─── Demo Activity Logs ───────────────────────────────────────
export const DEMO_ACTIVITY_LOGS = [
  {
    id: 'demo_al_001', participantId: 'demo_p_001',
    // Legacy field alias for backward compat
    jobseekerId: 'demo_p_001',
    date: daysAgo(0), startTime: '09:00', endTime: '12:00', durationMinutes: 180,
    activityType: 'Assigned learning item', description: 'Completed Module 1 of digital skills learning programme.',
    evidenceIds: [], notes: '', createdAt: daysAgo(0), isDemo: true,
  },
  {
    id: 'demo_al_002', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    date: daysAgo(1), startTime: '14:00', endTime: '15:30', durationMinutes: 90,
    activityType: 'Submitted task', description: 'Submitted weekly reflection — progress update submitted.',
    evidenceIds: ['demo_ev_001'], notes: 'Good reflective response.', createdAt: daysAgo(1), isDemo: true,
  },
  {
    id: 'demo_al_003', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    date: daysAgo(2), startTime: '10:00', endTime: '11:00', durationMinutes: 60,
    activityType: 'Progress evidence upload', description: 'Uploaded completion certificate for Module 1.',
    evidenceIds: [], notes: '', createdAt: daysAgo(2), isDemo: true,
  },
  {
    id: 'demo_al_004', participantId: 'demo_p_003', jobseekerId: 'demo_p_003',
    date: daysAgo(0), startTime: '09:30', endTime: '11:30', durationMinutes: 120,
    activityType: 'Review session preparation', description: 'Prepared notes and evidence for upcoming review session.',
    evidenceIds: [], notes: '', createdAt: daysAgo(0), isDemo: true,
  },
  {
    id: 'demo_al_005', participantId: 'demo_p_003', jobseekerId: 'demo_p_003',
    date: daysAgo(1), startTime: '13:00', endTime: '14:00', durationMinutes: 60,
    activityType: 'Assigned learning item', description: 'Completed online learning module on communication skills.',
    evidenceIds: [], notes: '', createdAt: daysAgo(1), isDemo: true,
  },
  {
    id: 'demo_al_006', participantId: 'demo_p_004', jobseekerId: 'demo_p_004',
    date: daysAgo(0), startTime: '08:00', endTime: '16:00', durationMinutes: 480,
    activityType: 'Training / course attendance', description: 'Full day skills training at provider site.',
    evidenceIds: ['demo_ev_002'], notes: 'Excellent attendance.', createdAt: daysAgo(0), isDemo: true,
  },
]

// ─── Demo Activity Records (formerly Activity Records) ────────────
export const DEMO_APPLICATIONS = [
  {
    id: 'demo_ar_001', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    title: 'Module 1 Completion', provider: 'Digital Skills Academy', category: 'Learning item',
    source: 'Programme portal', dateSubmitted: daysAgo(1),
    status: 'Awaiting review', evidenceIds: ['demo_ev_001'], notes: 'Strong completion.',
    createdAt: daysAgo(1), isDemo: true,
  },
  {
    id: 'demo_ar_002', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    title: 'Weekly Reflection — Week 3', provider: 'Self-directed', category: 'Reflection',
    source: 'Participant PWA', dateSubmitted: daysAgo(4),
    status: 'Review session offered', evidenceIds: [], notes: 'Review session confirmed.',
    createdAt: daysAgo(4), isDemo: true,
  },
  {
    id: 'demo_ar_003', participantId: 'demo_p_003', jobseekerId: 'demo_p_003',
    title: 'Communication Skills Module', provider: 'Online Learning Portal', category: 'Learning item',
    source: 'Programme portal', dateSubmitted: daysAgo(3),
    status: 'Submitted', evidenceIds: [], notes: '',
    createdAt: daysAgo(3), isDemo: true,
  },
  {
    id: 'demo_ar_004', participantId: 'demo_p_003', jobseekerId: 'demo_p_003',
    title: 'Milestone 1 — Foundation Check', provider: 'Programme Team', category: 'Milestone',
    source: 'Programme portal', dateSubmitted: daysAgo(6),
    status: 'Needs revision', evidenceIds: [], notes: 'Further evidence required.',
    createdAt: daysAgo(6), isDemo: true,
  },
  {
    id: 'demo_ar_005', participantId: 'demo_p_002', jobseekerId: 'demo_p_002',
    title: 'Part-time Activity Session', provider: 'Community Centre', category: 'Attendance',
    source: 'Participant PWA', dateSubmitted: daysAgo(8),
    status: 'Awaiting review', evidenceIds: [], notes: 'Adjusted hours requested.',
    createdAt: daysAgo(8), isDemo: true,
  },
]


// ─── Demo Review Sessions (formerly Review Sessions) ───────────────
export const DEMO_INTERVIEWS = [
  {
    id: 'demo_rs_001', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    organisationOrMentor: 'Programme Team', sessionTitle: 'Progress Review — Week 3',
    dateTime: hoursFromNow(48), locationOrLink: 'Online — Video Call Link',
    preparationTasks: 'Review activity log. Bring evidence portfolio. Prepare milestone update.',
    outcome: '', notes: 'Confirmed via email.',
    createdAt: daysAgo(2), isDemo: true,
  },
  {
    id: 'demo_rs_002', participantId: 'demo_p_003', jobseekerId: 'demo_p_003',
    organisationOrMentor: 'Mentor — Sam Review', sessionTitle: 'Milestone Check-in',
    dateTime: hoursFromNow(72), locationOrLink: 'https://meet.example.com/demo',
    preparationTasks: 'Prepare reflection summary. Review assigned tasks.',
    outcome: '', notes: 'Video session — link sent by mentor.',
    createdAt: daysAgo(1), isDemo: true,
  },
]


// ─── Demo Check-in Questions ──────────────────────────────────
const CHECK_IN_QUESTIONS = [
  'Did you complete any assigned activities today?',
  'How many hours did you spend on assigned activities?',
  'Did you submit any progress records today?',
  'Did you contact your mentor or practitioner?',
  'Did you update your evidence portfolio?',
  'Do you have any reviewSessions coming up?',
  'Are there any barriers stopping you from completing activities?',
  'Do you need support from your mentor or practitioner?',
  'How confident do you feel about your progress today?',
  'What is your priority for tomorrow?',
]
export { CHECK_IN_QUESTIONS }

export const DEMO_CHECKINS = [
  {
    id: 'demo_ci_001', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    date: daysAgo(0),
    answers: {
      0: 'Yes', 1: '3', 2: 'No', 3: 'No', 4: 'Yes',
      5: 'Yes', 6: 'No', 7: 'No', 8: '8/10', 9: 'Complete 2 more learning items.'
    },
    hoursReported: 3, supportNeeded: false, confidenceScore: 8,
    barrierFlags: [], notes: 'Good day overall.',
    createdAt: daysAgo(0), isDemo: true,
  },
  {
    id: 'demo_ci_002', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    date: daysAgo(1),
    answers: {
      0: 'Yes', 1: '2.5', 2: 'Yes', 3: 'No', 4: 'No',
      5: 'Yes', 6: 'No', 7: 'No', 8: '7/10', 9: 'Prepare for review session.'
    },
    hoursReported: 2.5, supportNeeded: false, confidenceScore: 7,
    barrierFlags: [], notes: '',
    createdAt: daysAgo(1), isDemo: true,
  },
  {
    id: 'demo_ci_003', participantId: 'demo_p_002', jobseekerId: 'demo_p_002',
    date: daysAgo(5),
    answers: {
      0: 'Partially', 1: '1', 2: 'No', 3: 'No', 4: 'No',
      5: 'No', 6: 'Yes — support barrier flagged', 7: 'Yes', 8: '4/10', 9: 'Speak to mentor about support.'
    },
    hoursReported: 1, supportNeeded: true, confidenceScore: 4,
    barrierFlags: ['support_barrier', 'confidence_issue'],
    notes: 'Struggling this week. Needs support contact.',
    createdAt: daysAgo(5), isDemo: true,
  },
  {
    id: 'demo_ci_004', participantId: 'demo_p_003', jobseekerId: 'demo_p_003',
    date: daysAgo(0),
    answers: {
      0: 'Yes', 1: '2', 2: 'Yes', 3: 'No', 4: 'No',
      5: 'Yes', 6: 'No', 7: 'No', 8: '7/10', 9: 'Review session prep — milestone check.'
    },
    hoursReported: 2, supportNeeded: false, confidenceScore: 7,
    barrierFlags: [], notes: '',
    createdAt: daysAgo(0), isDemo: true,
  },
]

// ─── Demo Evidence ────────────────────────────────────────────
export const DEMO_EVIDENCE = [
  {
    id: 'demo_ev_001', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    title: 'Module 1 Completion Certificate',
    evidenceType: 'Completion certificate',
    linkedRecordType: 'activity_record', linkedRecordId: 'demo_ar_001',
    date: daysAgo(1), notes: 'Certificate downloaded and saved.',
    filePlaceholderName: 'module1_completion_certificate.pdf',
    createdAt: daysAgo(1), isDemo: true,
  },
  {
    id: 'demo_ev_002', participantId: 'demo_p_004', jobseekerId: 'demo_p_004',
    title: 'Training Attendance Record',
    evidenceType: 'Attendance record',
    linkedRecordType: 'activity_log', linkedRecordId: 'demo_al_006',
    date: daysAgo(0), notes: 'Signed attendance sheet from provider.',
    filePlaceholderName: 'training_attendance_record.jpg',
    createdAt: daysAgo(0), isDemo: true,
  },
  {
    id: 'demo_ev_003', participantId: 'demo_p_003', jobseekerId: 'demo_p_003',
    title: 'Milestone 1 Progress Summary',
    evidenceType: 'Progress summary',
    linkedRecordType: 'activity_record', linkedRecordId: 'demo_ar_004',
    date: daysAgo(6), notes: 'Self-written progress summary submitted.',
    filePlaceholderName: 'milestone1_progress_summary.pdf',
    createdAt: daysAgo(6), isDemo: true,
  },
]

// ─── Demo Tasks ───────────────────────────────────────────────
export const DEMO_TASKS = [
  {
    id: 'demo_task_001', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    title: 'Complete Module 2 learning item',
    description: 'Access online portal and complete Module 2 — due end of week.',
    status: 'In Progress', priority: 'high', dueDate: daysAgo(-3),
    createdAt: daysAgo(3), isDemo: true,
  },
  {
    id: 'demo_task_002', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    title: 'Submit weekly reflection',
    description: 'Complete the weekly reflection form in your Participant App.',
    status: 'Completed', priority: 'medium', dueDate: daysAgo(0),
    createdAt: daysAgo(5), isDemo: true,
  },
  {
    id: 'demo_task_003', participantId: 'demo_p_002', jobseekerId: 'demo_p_002',
    title: 'Upload progress evidence',
    description: 'Upload any evidence of activity completed this week.',
    status: 'Overdue', priority: 'high', dueDate: daysAgo(3),
    createdAt: daysAgo(7), isDemo: true,
  },
  {
    id: 'demo_task_004', participantId: 'demo_p_003', jobseekerId: 'demo_p_003',
    title: 'Prepare for review session',
    description: 'Review progress notes and prepare a brief milestone update.',
    status: 'In Progress', priority: 'high', dueDate: daysAgo(-1),
    createdAt: daysAgo(2), isDemo: true,
  },
  {
    id: 'demo_task_005', participantId: 'demo_p_004', jobseekerId: 'demo_p_004',
    title: 'Attend training session',
    description: 'Full-day training at provider site — attendance required.',
    status: 'Completed', priority: 'high', dueDate: daysAgo(0),
    createdAt: daysAgo(4), isDemo: true,
  },
]

// ─── Demo Support Flags ───────────────────────────────────────
export const DEMO_SUPPORT_FLAGS = [
  {
    id: 'demo_sf_001', participantId: 'demo_p_002', jobseekerId: 'demo_p_002',
    flagType: 'Support barrier', severity: 'high',
    description: 'Support barrier flagged — may affect ability to complete activities on schedule.',
    resolved: false, createdAt: daysAgo(5), isDemo: true,
  },
  {
    id: 'demo_sf_002', participantId: 'demo_p_005', jobseekerId: 'demo_p_005',
    flagType: 'Wellbeing check', severity: 'critical',
    description: 'No activity or check-in recorded for 10 days. Wellbeing check recommended.',
    resolved: false, createdAt: daysAgo(10), isDemo: true,
  },
]

// ─── Demo Mentor Notes (formerly Mentor Notes) ─────────────────
export const DEMO_MENTOR_NOTES = [
  {
    id: 'demo_mn_001', participantId: 'demo_p_001', jobseekerId: 'demo_p_001',
    content: 'Alex is making strong progress. Completing assigned activities consistently. No support needs identified at this stage.',
    createdAt: daysAgo(2), isDemo: true,
  },
  {
    id: 'demo_mn_002', participantId: 'demo_p_002', jobseekerId: 'demo_p_002',
    content: 'Jordan has flagged a support barrier. Adjusted activity schedule discussed. Follow-up contact scheduled.',
    createdAt: daysAgo(5), isDemo: true,
  },
]

// Legacy alias
export const DEMO_COACH_NOTES = DEMO_MENTOR_NOTES

// ─── Seed / Load Demo Data ────────────────────────────────────
export function loadDemoData(participantSvc, dataStore) {
  // Only seed if no participants exist yet
  const existing = participantSvc.getAll()
  if (existing.some(p => p.isDemo)) return

  // Seed participants
  participantSvc.bulkCreate(DEMO_PARTICIPANTS)

  // Seed data records
  const addIfEmpty = (storeArr, records, addFn) => {
    if (!storeArr || storeArr.length === 0) {
      records.forEach(r => addFn(r))
    }
  }

  addIfEmpty(dataStore.activityLogs,    DEMO_ACTIVITY_LOGS,    dataStore.addActivityLog)
  addIfEmpty(dataStore.activityRecords, DEMO_APPLICATIONS, dataStore.addActivityRecord)
  addIfEmpty(dataStore.reviewSessions,  DEMO_INTERVIEWS,  dataStore.addReviewSession)
  addIfEmpty(dataStore.checkIns,        DEMO_CHECKINS,         dataStore.addCheckIn)
  addIfEmpty(dataStore.evidenceRecords, DEMO_EVIDENCE,         dataStore.addEvidence)
  addIfEmpty(dataStore.tasks,           DEMO_TASKS,            dataStore.addTask)
  addIfEmpty(dataStore.supportFlags,    DEMO_SUPPORT_FLAGS,    dataStore.addSupportFlag)
  addIfEmpty(dataStore.mentorNotes,     DEMO_MENTOR_NOTES,     dataStore.addMentorNote)
}

// ─── Check-in question defaults ───────────────────────────────────────────────
export const CHECK_IN_QUESTIONS_DEFAULT = [
  { id: 'q1', text: 'How are you feeling about your progress this week?', type: 'scale', min: 1, max: 5 },
  { id: 'q2', text: 'Did you complete your planned activities this week?', type: 'yesno' },
  { id: 'q3', text: 'Have you faced any barriers or challenges?', type: 'yesno' },
  { id: 'q4', text: 'Do you need any additional support?', type: 'yesno' },
  { id: 'q5', text: 'Any other comments or notes?', type: 'text' },
]

// ─── Remove demo data ─────────────────────────────────────────────────────────
export function removeDemoData(dataStore) {
  if (!dataStore) return
  const clear = (arr, fn) => {
    const demos = (arr || []).filter(r => r.isDemo)
    demos.forEach(r => fn && fn(r.id))
  }
  try {
    clear(dataStore.activityLogs,    dataStore.deleteActivityLog)
    clear(dataStore.activityRecords, dataStore.deleteActivityRecord)
    clear(dataStore.reviewSessions,  dataStore.deleteReviewSession)
    clear(dataStore.checkIns,        dataStore.deleteCheckIn)
    clear(dataStore.evidenceRecords, dataStore.deleteEvidence)
    clear(dataStore.tasks,           dataStore.deleteTask)
    clear(dataStore.supportFlags,    dataStore.deleteSupportFlag)
    clear(dataStore.mentorNotes,     dataStore.deleteMentorNote)
  } catch (e) {
    console.warn('[4P3X] removeDemoData error:', e)
  }
}

// ─── Learning Modules Demo Data ───────────────────────────────
// Used by the Learner PWA and Admin Dashboard learning view.
// Isolated and replaceable with live backend data.

export const DEMO_LEARNING_MODULES = [
  {
    id: 'mod_001',
    title: 'Welcome & Orientation',
    description: 'Introduction to your programme, expectations, and how to use the platform.',
    order: 1,
    status: 'completed',
    completionCount: 4,
    evidenceRequired: false,
    duration: '30 min',
    icon: 'BookOpen',
  },
  {
    id: 'mod_002',
    title: 'Core Learning Module',
    description: 'Core skills and knowledge required for your programme.',
    order: 2,
    status: 'available',
    completionCount: 2,
    evidenceRequired: true,
    duration: '90 min',
    icon: 'GraduationCap',
  },
  {
    id: 'mod_003',
    title: 'Practical Task',
    description: 'Apply your learning with a structured practical activity.',
    order: 3,
    status: 'available',
    completionCount: 1,
    evidenceRequired: true,
    duration: '60 min',
    icon: 'Wrench',
  },
  {
    id: 'mod_004',
    title: 'Knowledge Check',
    description: 'A short assessment to confirm your understanding of the core content.',
    order: 4,
    status: 'locked',
    completionCount: 0,
    evidenceRequired: false,
    duration: '20 min',
    icon: 'ClipboardCheck',
  },
  {
    id: 'mod_005',
    title: 'Completion Review',
    description: 'Final review with your coach/trainer before certificate issuance.',
    order: 5,
    status: 'locked',
    completionCount: 0,
    evidenceRequired: true,
    duration: '45 min',
    icon: 'Award',
  },
]

// Per-participant module progress (demo)
export const DEMO_MODULE_PROGRESS = {
  demo_p_001: { mod_001: 'completed', mod_002: 'completed', mod_003: 'available', mod_004: 'locked', mod_005: 'locked' },
  demo_p_002: { mod_001: 'completed', mod_002: 'available', mod_003: 'locked',    mod_004: 'locked', mod_005: 'locked' },
  demo_p_003: { mod_001: 'completed', mod_002: 'available', mod_003: 'locked',    mod_004: 'locked', mod_005: 'locked' },
  demo_p_004: { mod_001: 'completed', mod_002: 'completed', mod_003: 'completed', mod_004: 'available', mod_005: 'locked' },
  demo_p_005: { mod_001: 'completed', mod_002: 'locked',    mod_003: 'locked',    mod_004: 'locked', mod_005: 'locked' },
}

// Derive overall progress % from module progress map
export function calcModuleProgress(progressMap = {}) {
  const total = DEMO_LEARNING_MODULES.length
  if (!total) return 0
  const done = Object.values(progressMap).filter(v => v === 'completed').length
  return Math.round((done / total) * 100)
}
