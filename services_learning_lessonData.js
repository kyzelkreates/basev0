/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — Lesson Data (SSOT)
 * Generic reusable lesson content for base structure.
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 *
 * SINGLE SOURCE OF TRUTH for all lesson/module content.
 * Do not duplicate this data in UI components.
 * Replace demo content by swapping this file or connecting a backend.
 *
 * Structure:
 *   LESSON_MODULES  — top-level modules (groups of lessons)
 *   LESSONS         — flat lesson array with full content
 *   getLessonById   — safe lookup by id
 *   getModuleById   — safe lookup by id
 *   getLessonsForModule — all lessons belonging to a module
 *   calcLearnerProgress — overall % for a learner's progress map
 * ============================================================
 */

// ─── Modules ─────────────────────────────────────────────────
export const LESSON_MODULES = [
  {
    id: 'lmod_001',
    title: 'System Basics',
    description: 'Learn the core concepts of this system — navigation, dashboard, and lesson flow.',
    order: 1,
    icon: 'BookOpen',
    color: '#d4af37',
  },
  {
    id: 'lmod_002',
    title: 'Workflow Practice',
    description: 'Practice structured workflows, progress tracking, and completing reviews.',
    order: 2,
    icon: 'Workflow',
    color: '#a855f7',
  },
  {
    id: 'lmod_003',
    title: 'Reusable Product Mode',
    description: 'Understand demo mode, live mode, and how this base structure becomes a real product.',
    order: 3,
    icon: 'Layers',
    color: '#22c55e',
  },
]

// ─── Lessons ─────────────────────────────────────────────────
// Each lesson has full generic content — safe for any sector refactor.
export const LESSONS = [

  // ── Module 1: System Basics ──────────────────────────────
  {
    id: 'lesson_001',
    moduleId: 'lmod_001',
    order: 1,
    title: 'Getting Started With This System',
    subtitle: 'System overview and first steps',
    estimatedTime: '15 min',
    icon: 'PlayCircle',
    objective: 'Understand the purpose of this system and how to navigate the main areas.',
    overview:
      'This lesson introduces the core structure of the system. You will learn where to find the main sections, what the dashboard shows, and how the lesson flow works from start to completion.',
    sections: [
      {
        id: 's1',
        heading: 'Overview of the System',
        body: 'This system is a modular, reusable base structure designed for learning, monitoring, and progress tracking. It can be adapted for many purposes while keeping the same core layout.',
      },
      {
        id: 's2',
        heading: 'Main Dashboard Areas',
        body: 'The dashboard shows your progress summary, recent activity, and quick access to lessons, check-ins, and evidence. Use the navigation menu or bottom bar to move between areas.',
      },
      {
        id: 's3',
        heading: 'How Lessons and Progress Work',
        body: 'Lessons are organised into modules. Each lesson has content, a checklist, and a review step. Completing a lesson updates your progress. Some lessons unlock after earlier ones are finished.',
      },
      {
        id: 's4',
        heading: 'How to Complete a Review',
        body: 'Open a lesson, read through each section, complete the checklist, answer the reflection question, then press Mark as Reviewed. Your progress will update automatically.',
      },
    ],
    checklist: [
      'I understand the purpose of this system',
      'I can find the main dashboard',
      'I can open a lesson from the modules area',
      'I can return to the dashboard after reviewing a lesson',
    ],
    reflectionQuestions: [
      'What is the main purpose of this system in your own words?',
      'Which area of the dashboard do you expect to use most?',
    ],
    reviewNotes: '',
    completionStatus: 'not_started',
  },

  {
    id: 'lesson_002',
    moduleId: 'lmod_001',
    order: 2,
    title: 'Understanding Your Dashboard',
    subtitle: 'Progress, activity, and review actions',
    estimatedTime: '20 min',
    icon: 'LayoutDashboard',
    objective: 'Learn how the dashboard presents progress, activity, and important information.',
    overview:
      'The dashboard is the central control area. It gives you an at-a-glance view of your progress, recent activity, pending items, and actions to take next. Understanding each area helps you use the system effectively.',
    sections: [
      {
        id: 's1',
        heading: 'Dashboard Summary Cards',
        body: 'Summary cards show key numbers at a glance — total lessons, completed lessons, active modules, and overall progress percentage. These update as you complete reviews.',
      },
      {
        id: 's2',
        heading: 'Progress Indicators',
        body: 'Progress bars and percentage counters show how far through a module or the full programme you are. A higher percentage means more lessons reviewed and confirmed.',
      },
      {
        id: 's3',
        heading: 'Activity Areas',
        body: 'Activity areas show recent actions — lessons opened, reviews completed, check-ins submitted, and evidence recorded. Use these to track what you have done recently.',
      },
      {
        id: 's4',
        heading: 'Review Actions',
        body: 'Review actions are the buttons that let you open lessons, submit check-ins, and confirm progress. They are designed to be simple and accessible from the main dashboard.',
      },
    ],
    checklist: [
      'I can identify the progress summary area on the dashboard',
      'I understand what the progress bar represents',
      'I can find recent activity information',
      'I know where review action buttons are located',
    ],
    reflectionQuestions: [
      'What does the progress indicator tell you about your current status?',
      'How would you use the activity area to track your recent work?',
    ],
    reviewNotes: '',
    completionStatus: 'not_started',
  },

  {
    id: 'lesson_003',
    moduleId: 'lmod_001',
    order: 3,
    title: 'Reviewing Lesson Content',
    subtitle: 'Open, read, and complete a lesson',
    estimatedTime: '15 min',
    icon: 'FileText',
    objective: 'Learn how to open, review, and complete lesson content correctly.',
    overview:
      'Reviewing a lesson is the core action in this system. This lesson walks through the steps of opening a lesson, reading each content section, using the checklist, and confirming your review.',
    sections: [
      {
        id: 's1',
        heading: 'Opening a Lesson',
        body: 'Go to the Modules area and find a lesson with Available status. Press Continue or Review to open it. The lesson detail screen will load with all content sections visible.',
      },
      {
        id: 's2',
        heading: 'Reading Lesson Sections',
        body: 'Each lesson has multiple sections. Read each section carefully. Content is designed to be concise and practical. Take notes or use the reflection question to record your understanding.',
      },
      {
        id: 's3',
        heading: 'Using Checklists',
        body: 'The checklist at the bottom of each lesson helps you confirm you have covered the key points. Tick each item as you go. All items should be ticked before marking the lesson as reviewed.',
      },
      {
        id: 's4',
        heading: 'Completing a Review',
        body: 'Once you have read the content and ticked the checklist, press Mark as Reviewed. This records your completion and may unlock the next lesson in the module.',
      },
    ],
    checklist: [
      'I can open a lesson from the modules list',
      'I have read through all content sections',
      'I can tick checklist items as I confirm each point',
      'I know how to mark a lesson as reviewed',
    ],
    reflectionQuestions: [
      'What is the most important step when completing a lesson review?',
      'What happens to your progress after you mark a lesson as reviewed?',
    ],
    reviewNotes: '',
    completionStatus: 'not_started',
  },

  // ── Module 2: Workflow Practice ──────────────────────────
  {
    id: 'lesson_004',
    moduleId: 'lmod_002',
    order: 1,
    title: 'Following a Simple Workflow',
    subtitle: 'Step-by-step structured activity',
    estimatedTime: '20 min',
    icon: 'ArrowRightCircle',
    objective: 'Understand how to move through a structured workflow step by step.',
    overview:
      'A workflow is a defined sequence of steps designed to achieve a goal. In this system, workflows guide you through lessons, check-ins, and evidence in a logical order. This lesson teaches you how to follow one from start to finish.',
    sections: [
      {
        id: 's1',
        heading: 'Start With the First Available Item',
        body: 'Always begin with the first Available item in your current module. Locked items unlock after earlier ones are complete. Completed items can be reviewed again at any time.',
      },
      {
        id: 's2',
        heading: 'Review the Guidance',
        body: 'Before completing an action, read the guidance for that step. The objective and overview sections of each lesson explain what you are expected to do and why it matters.',
      },
      {
        id: 's3',
        heading: 'Complete the Required Actions',
        body: 'Each workflow step has specific actions — reading content, ticking a checklist, submitting a check-in, or recording evidence. Complete each action before moving forward.',
      },
      {
        id: 's4',
        heading: 'Check Your Progress',
        body: 'After completing a step, return to the dashboard or progress screen to see your updated completion percentage. The next available step will be indicated clearly.',
      },
    ],
    checklist: [
      'I understand how to identify the first available workflow step',
      'I know how to read guidance before starting an action',
      'I have completed all required actions for this lesson',
      'I can check my updated progress after completing a step',
    ],
    reflectionQuestions: [
      'Why is it important to follow a structured workflow instead of skipping ahead?',
      'How does completing each step in order help with overall progress?',
    ],
    reviewNotes: '',
    completionStatus: 'not_started',
  },

  {
    id: 'lesson_005',
    moduleId: 'lmod_002',
    order: 2,
    title: 'Tracking Progress',
    subtitle: 'Progress states, history, and locked items',
    estimatedTime: '20 min',
    icon: 'TrendingUp',
    objective: 'Learn how progress is stored, displayed, and updated throughout the system.',
    overview:
      'Progress tracking is a core feature of this system. Every lesson review, check-in, and evidence record contributes to your overall progress. This lesson explains the different progress states and how to interpret them.',
    sections: [
      {
        id: 's1',
        heading: 'Progress States',
        body: 'Each lesson has one of four states: Not Started, Available, Completed, or Locked. Not Started means not yet opened. Available means ready to review. Completed means reviewed and confirmed. Locked means earlier lessons must be completed first.',
      },
      {
        id: 's2',
        heading: 'Completed and Pending Items',
        body: 'Completed items show a green status badge and count toward your progress percentage. Pending items (Available, Not Started) are still to be done. The dashboard shows a breakdown of both.',
      },
      {
        id: 's3',
        heading: 'Locked and Unlocked Items',
        body: 'Locked items cannot be started until their prerequisites are complete. This ensures you build understanding in the correct order. Unlocking happens automatically when earlier lessons are marked as reviewed.',
      },
      {
        id: 's4',
        heading: 'Review History',
        body: 'Each completed lesson is recorded in your activity history. You can return to completed lessons for reference at any time using the Review button. This does not reset your progress.',
      },
    ],
    checklist: [
      'I understand the four progress states: Not Started, Available, Completed, Locked',
      'I can identify completed and pending items on the dashboard',
      'I understand why some items are locked',
      'I know I can re-review completed lessons without losing progress',
    ],
    reflectionQuestions: [
      'What is the difference between a Locked and a Not Started lesson?',
      'How does completing lessons in order benefit your overall understanding?',
    ],
    reviewNotes: '',
    completionStatus: 'not_started',
  },

  {
    id: 'lesson_006',
    moduleId: 'lmod_002',
    order: 3,
    title: 'Completing a Review',
    subtitle: 'Confirmation, progress update, and return to dashboard',
    estimatedTime: '15 min',
    icon: 'CheckCircle2',
    objective: 'Understand what happens when a review is completed and how to return to the main dashboard.',
    overview:
      'Completing a review is the action that confirms your understanding of a lesson. This lesson explains the review confirmation process, how your progress updates, and how to return smoothly to the dashboard.',
    sections: [
      {
        id: 's1',
        heading: 'Review Confirmation',
        body: 'When you press Mark as Reviewed, the system records your completion for that lesson. A confirmation message appears to acknowledge your action. This cannot be undone but can always be re-reviewed.',
      },
      {
        id: 's2',
        heading: 'Completion Status Update',
        body: 'After confirming, the lesson status changes to Completed. The progress bar on the dashboard updates to reflect the new percentage. Any lessons that were waiting to unlock may now become Available.',
      },
      {
        id: 's3',
        heading: 'Progress Update',
        body: 'Your overall progress percentage increases with each completed lesson. Progress is saved locally in demo mode and can be stored to a backend in live mode. Refreshing or returning to the app will show current progress.',
      },
      {
        id: 's4',
        heading: 'Returning to the Main Dashboard',
        body: 'After completing a review, press Back or the Home button to return to the main area. From there you can check your progress, open the next lesson, or navigate to check-ins and evidence.',
      },
    ],
    checklist: [
      'I understand what Mark as Reviewed does',
      'I know my progress updates automatically after completing a review',
      'I can identify whether a next lesson has unlocked after completion',
      'I know how to return to the main dashboard from the lesson review screen',
    ],
    reflectionQuestions: [
      'What should you do before pressing Mark as Reviewed?',
      'How would you confirm that your progress has updated correctly?',
    ],
    reviewNotes: '',
    completionStatus: 'not_started',
  },

  // ── Module 3: Reusable Product Mode ─────────────────────
  {
    id: 'lesson_007',
    moduleId: 'lmod_003',
    order: 1,
    title: 'Demo Mode and Live Mode',
    subtitle: 'Understanding example data vs real data',
    estimatedTime: '20 min',
    icon: 'FlaskConical',
    objective: 'Understand the difference between demo content and live product data.',
    overview:
      'This system supports two operating modes: Demo Mode and Live Mode. Demo Mode shows example data so you can experience the full product flow without real records. Live Mode connects to real data and supports real users.',
    sections: [
      {
        id: 's1',
        heading: 'What Demo Mode Shows',
        body: 'Demo Mode loads pre-built example records — learners, lessons, progress, check-ins, and evidence. These records demonstrate the full product experience without requiring a backend connection or real user accounts.',
      },
      {
        id: 's2',
        heading: 'What Live Mode Uses',
        body: 'Live Mode connects to real or locally stored data. Records created in live mode represent actual users and actual activity. Switching to live mode requires confirming that real data storage is available.',
      },
      {
        id: 's3',
        heading: 'Why Demo Data Must Stay Separate',
        body: 'Demo data should never mix with live data. Demo records are clearly marked and stored separately. This prevents confusion between example content and real user records when the product is deployed.',
      },
      {
        id: 's4',
        heading: 'How Settings Control Mode Switching',
        body: 'The Settings area contains a Demo / Live Mode toggle. Switching modes reloads the data source. Returning to Demo Mode restores example content without deleting live records.',
      },
    ],
    checklist: [
      'I understand what Demo Mode is and why it exists',
      'I understand what Live Mode requires',
      'I know demo data should never mix with real live data',
      'I can find the mode toggle in the Settings area',
    ],
    reflectionQuestions: [
      'Why is it important to keep demo data separate from live data?',
      'When would you switch from Demo Mode to Live Mode?',
    ],
    reviewNotes: '',
    completionStatus: 'not_started',
  },

  {
    id: 'lesson_008',
    moduleId: 'lmod_003',
    order: 2,
    title: 'Preparing for Real Data',
    subtitle: 'Backend-ready structure and safe migration',
    estimatedTime: '25 min',
    icon: 'Database',
    objective: 'Understand how this system can connect to a backend or live data source.',
    overview:
      'This base structure is designed to be backend-ready. Demo mode works without a backend. When you are ready to deploy for real users, the system can connect to Supabase, Firebase, or any compatible backend. This lesson explains how that transition works.',
    sections: [
      {
        id: 's1',
        heading: 'Local-First Structure',
        body: 'In demo mode, all data is stored locally in memory or localStorage. This means the system works completely offline and without any server. Data resets when demo mode is cleared or the app is reinstalled.',
      },
      {
        id: 's2',
        heading: 'Backend-Ready Planning',
        body: 'Every data record in this system uses consistent field names and IDs. This makes it straightforward to map local records to a backend schema. Planning your data structure now reduces work when connecting a backend later.',
      },
      {
        id: 's3',
        heading: 'Data Fields',
        body: 'Key data fields include: id, createdAt, updatedAt, status, learner reference, module reference, and content fields. Keeping these consistent across all records ensures smooth backend integration.',
      },
      {
        id: 's4',
        heading: 'Safe Migration from Demo to Live',
        body: 'When migrating from demo to live, disable demo mode in settings, confirm your backend connection, and allow users to register or be imported. Demo data should be cleared or kept separate to avoid confusion.',
      },
    ],
    checklist: [
      'I understand how local-first storage works in this system',
      'I know what backend-ready planning means for data fields',
      'I can identify the key data fields used in records',
      'I understand the steps for safe migration from demo to live mode',
    ],
    reflectionQuestions: [
      'What is the main advantage of a local-first structure during development?',
      'What would you need to confirm before switching from demo to live mode?',
    ],
    reviewNotes: '',
    completionStatus: 'not_started',
  },

  {
    id: 'lesson_009',
    moduleId: 'lmod_003',
    order: 3,
    title: 'Final Review',
    subtitle: 'End-to-end system confirmation',
    estimatedTime: '20 min',
    icon: 'Award',
    objective: 'Review the core structure and confirm the system works end to end.',
    overview:
      'This is the final lesson. It brings together everything covered in the previous lessons — opening lessons, reviewing content, tracking progress, and understanding how the system operates in demo and live modes.',
    sections: [
      {
        id: 's1',
        heading: 'Open Lessons and Review Content',
        body: 'By now you should be able to open any available lesson, read through its sections, complete the checklist, and mark it as reviewed. If any step is unclear, return to the relevant earlier lesson for reference.',
      },
      {
        id: 's2',
        heading: 'Track Your Progress',
        body: 'Your progress dashboard should show completed lessons for each module completed so far. Check the progress screen to confirm all completed items are shown correctly with green status badges.',
      },
      {
        id: 's3',
        heading: 'Confirm Reusable Workflow',
        body: 'The lesson-review-progress workflow in this system is reusable across different sectors. Any base structure built on this template follows the same pattern: open, review, confirm, progress.',
      },
      {
        id: 's4',
        heading: 'System Ready for Deployment',
        body: 'If all lessons open correctly, review buttons work, locked lessons display safely, and progress updates as expected — the base structure is functioning correctly and is ready to be adapted for a real product.',
      },
    ],
    checklist: [
      'All lessons open correctly without errors',
      'Review buttons work on all available and completed lessons',
      'Locked lessons display a clear locked message and do not crash',
      'Generic content displays correctly with no sector-specific wording',
      'Progress tracking updates after completing a review',
      'Demo Mode and Live Mode are both understood',
      'The system is confirmed as reusable and backend-ready',
    ],
    reflectionQuestions: [
      'Is there any part of the system that still needs clarification before going live?',
      'What would be the first change you would make when adapting this base for a real product?',
    ],
    reviewNotes: '',
    completionStatus: 'not_started',
  },
]

// ─── Helpers ─────────────────────────────────────────────────

/** Safe lookup — never throws, returns null if not found */
export function getLessonById(id) {
  if (!id) return null
  return LESSONS.find(l => l.id === id) || null
}

export function getModuleById(id) {
  if (!id) return null
  return LESSON_MODULES.find(m => m.id === id) || null
}

export function getLessonsForModule(moduleId) {
  if (!moduleId) return []
  return LESSONS.filter(l => l.moduleId === moduleId).sort((a, b) => a.order - b.order)
}

/**
 * Build a per-learner progress map from saved completions.
 * completedIds: Set or array of lesson IDs the learner has completed.
 * Returns: { [lessonId]: 'completed'|'available'|'locked' }
 */
export function buildProgressMap(completedIds = []) {
  const done = new Set(completedIds)
  const map  = {}

  LESSONS.forEach((lesson, idx) => {
    if (done.has(lesson.id)) {
      map[lesson.id] = 'completed'
      return
    }
    // A lesson is available if all lessons before it in the same module are done,
    // OR if it is the first lesson in any module.
    const moduleLessons = getLessonsForModule(lesson.moduleId)
    const lessonIndexInModule = moduleLessons.findIndex(l => l.id === lesson.id)
    if (lessonIndexInModule === 0) {
      map[lesson.id] = 'available'
    } else {
      const prev = moduleLessons[lessonIndexInModule - 1]
      map[lesson.id] = done.has(prev.id) ? 'available' : 'locked'
    }
  })

  return map
}

/** Overall progress % from a progressMap */
export function calcProgress(progressMap = {}) {
  const total = LESSONS.length
  if (!total) return 0
  const done = Object.values(progressMap).filter(v => v === 'completed').length
  return Math.round((done / total) * 100)
}

// Default progress map for a new learner (demo — first lesson of each module available)
export const DEFAULT_PROGRESS_MAP = buildProgressMap([])
