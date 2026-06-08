/**
 * ============================================================
 * 4P3X Refractable Base OS™ — Learner PWA
 * Generic Learning Installable PWA — Learner-facing interface.
 * Route: /#/learner
 *
 * FIXES (this version):
 *  - Lesson Review button now wired: ModulesScreen passes onOpenLesson
 *  - LessonReview screen added with full content rendering
 *  - Locked lessons show safe locked message (no crash, no blank page)
 *  - All content from services_learning_lessonData.js (SSOT)
 *  - No sector-specific wording
 *  - Mobile-first, safe-area insets, no horizontal overflow
 *
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate }    from 'react-router-dom'
import Icon               from './components_ui_Icon'
import { useDataStore, useConfigStore, STORAGE_KEYS } from './core_storage'
import { jobseekerService } from './services_careerlink_jobseekerService'
import { DEMO_PARTICIPANTS } from './services_careerlink_demoData'
import {
  LESSON_MODULES,
  LESSONS,
  getLessonById,
  getModuleById,
  getLessonsForModule,
  buildProgressMap,
  calcProgress,
  DEFAULT_PROGRESS_MAP,
} from './services_learning_lessonData'

// ─── Colours ────────────────────────────────────────────────
const C = {
  gold:   '#d4af37',
  purple: '#a855f7',
  green:  '#22c55e',
  red:    '#ef4444',
  amber:  '#f59e0b',
  silver: '#b0b8c8',
  blue:   '#3b82f6',
}

// ─── Lesson status config ────────────────────────────────────
const STATUS_CFG = {
  completed:   { label: 'Completed',   color: C.green,  bg: '#22c55e12', icon: 'CheckCircle2' },
  available:   { label: 'Available',   color: C.gold,   bg: '#d4af3712', icon: 'PlayCircle'   },
  not_started: { label: 'Not Started', color: '#64748b', bg: '#64748b12', icon: 'Circle'       },
  locked:      { label: 'Locked',      color: '#475569', bg: '#47556912', icon: 'Lock'         },
}

// ─── Shared helpers ──────────────────────────────────────────
function ProgressBar({ pct, color = C.gold, height = 6 }) {
  // Scroll to top on screen/view change
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [screen])

  return (
    <div style={{ height, borderRadius: height, background: '#1e293b', overflow: 'hidden', width: '100%' }}>
      <div style={{
        height: '100%', width: `${Math.min(100, Math.max(0, pct))}%`,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: height, transition: 'width 0.5s ease',
      }} />
    </div>
  )
}

function ModeBadge({ isDemoMode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
      padding: '3px 10px', borderRadius: 999,
      background: isDemoMode ? '#f59e0b18' : '#22c55e18',
      border: `1px solid ${isDemoMode ? C.amber : C.green}33`,
      color: isDemoMode ? C.amber : C.green,
    }}>
      <Icon name={isDemoMode ? 'FlaskConical' : 'Database'} size={10} />
      {isDemoMode ? 'Demo' : 'Live'}
    </span>
  )
}

function StatusBadge({ status }) {
  const s = STATUS_CFG[status] || STATUS_CFG.locked
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
      background: s.bg, border: `1px solid ${s.color}30`, color: s.color, flexShrink: 0,
    }}>
      <Icon name={s.icon} size={9} />
      {s.label}
    </span>
  )
}

// ─── Learner gate ────────────────────────────────────────────
function LearnerGate({ onAuth, isDemoMode }) {
  const [learnerId, setLearnerId] = useState('')
  const [error, setError]         = useState('')
  const [learners, setLearners]   = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTICIPANT_SESSION) || 'null')
      const sessionId = session?.participantId || session?.jobseekerId
      if (sessionId) {
        const all = jobseekerService.getAll()
        const found = all.find(j => j.id === sessionId)
        if (found) { onAuth(found); return }
      }
    } catch (_) {}

    const all = jobseekerService.getAll()
    // Always show demo participants if no real data — ensures demo works on fresh load
    setLearners(all.length > 0 ? all : DEMO_PARTICIPANTS)
  }, [onAuth, isDemoMode])

  const handleEnter = () => {
    setError('')
    if (!learnerId) { setError('Please select your name.'); return }
    const found = learners.find(j => j.id === learnerId)
    if (!found) { setError('Learner not found.'); return }
    try {
      localStorage.setItem(STORAGE_KEYS.PARTICIPANT_SESSION, JSON.stringify({ participantId: learnerId, jobseekerId: learnerId, ts: Date.now() }))
    } catch (_) {}
    onAuth(found)
  }

  return (
    <div style={{
      minHeight: '100dvh', background: '#050810', color: '#f1f5f9',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: 'clamp(16px, 5vw, 32px)',
      fontFamily: "'Inter', sans-serif", overflowX: 'hidden',
    }}>
      <button onClick={() => navigate('/')} style={{
        position: 'absolute', top: 16, left: 16,
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 12, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer',
      }}>
        <Icon name="ArrowLeft" size={14} /> Home
      </button>

      <div style={{ width: '100%', maxWidth: 'min(360px, calc(100vw - 32px))' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, margin: '0 auto 14px',
            background: `${C.gold}12`, border: `1px solid ${C.gold}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="GraduationCap" size={28} style={{ color: C.gold }} />
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>
            Generic Learning PWA
          </h1>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 6, lineHeight: 1.5 }}>
            Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
          </p>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
            <ModeBadge isDemoMode={isDemoMode} />
          </div>
        </div>

        <div style={{ background: '#0d1426', border: '1px solid #1e293b', borderRadius: 18, padding: 24 }}>
          <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Select your name
          </label>
          <select value={learnerId} onChange={e => setLearnerId(e.target.value)} style={{
            width: '100%', background: '#0f172a', border: '1px solid #334155',
            borderRadius: 10, padding: '12px 14px', fontSize: 14, color: '#fff',
            outline: 'none', cursor: 'pointer', marginBottom: 12, boxSizing: 'border-box',
          }}>
            <option value="">Choose your name…</option>
            {learners.map(l => (
              <option key={l.id} value={l.id}>{l.displayName}</option>
            ))}
          </select>

          {error && <p style={{ fontSize: 12, color: C.red, marginBottom: 10 }}>{error}</p>}

          <button onClick={handleEnter} style={{
            width: '100%', padding: 13, borderRadius: 10, fontSize: 14, fontWeight: 700,
            background: C.gold, color: '#050810', border: 'none', cursor: 'pointer',
          }}>
            Open My Learning App
          </button>

          {learners.length === 0 && (
            <p style={{ fontSize: 11, color: '#475569', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
              No learners set up yet.{isDemoMode ? ' Demo data may still be loading.' : ' Ask your admin to set up your account.'}
            </p>
          )}
        </div>

        <div style={{
          marginTop: 16, padding: '10px 14px', borderRadius: 10,
          background: '#a855f712', border: `1px solid ${C.purple}25`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Icon name="Smartphone" size={14} style={{ color: C.purple, flexShrink: 0 }} />
          <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
            <strong style={{ color: C.purple }}>Installable PWA Ready.</strong>{' '}
            Add to your home screen from your browser menu for the full offline experience.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Lesson card ─────────────────────────────────────────────
function LessonCard({ lesson, status, onOpen }) {
  const s      = STATUS_CFG[status] || STATUS_CFG.locked
  const isLocked   = status === 'locked'
  const isDone     = status === 'completed'
  const isAvail    = status === 'available' || status === 'not_started'
  const mod    = getModuleById(lesson.moduleId)

  return (
    <div style={{
      background: '#0d1426', border: `1px solid ${s.color}22`,
      borderRadius: 14, padding: '16px 18px',
      opacity: isLocked ? 0.65 : 1,
      display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* Icon */}
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: s.bg, border: `1px solid ${s.color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={isLocked ? 'Lock' : (lesson.icon || 'BookOpen')} size={17} style={{ color: s.color }} />
        </div>

        {/* Title area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
            <span style={{
              fontSize: 14, fontWeight: 700, color: '#f1f5f9',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {lesson.title}
            </span>
            <StatusBadge status={status} />
          </div>
          {lesson.subtitle && (
            <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 2px', overflowWrap: 'anywhere' }}>
              {lesson.subtitle}
            </p>
          )}
          {mod && (
            <span style={{ fontSize: 10, color: '#475569', fontWeight: 500 }}>
              {mod.title}
            </span>
          )}
        </div>
      </div>

      {/* Footer row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="Clock" size={11} /> {lesson.estimatedTime || '—'}
        </span>

        {/* Buttons — shown for all statuses */}
        {isLocked ? (
          // Locked: show a visible but disabled-style preview button
          <button
            onClick={() => onOpen(lesson, status)}
            style={{
              padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
              background: '#47556912', border: '1px solid #47556930',
              color: '#64748b', cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: 5,
            }}
          >
            <Icon name="Lock" size={11} /> Preview
          </button>
        ) : (
          <button
            onClick={() => onOpen(lesson, status)}
            style={{
              padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700,
              background: isDone ? '#22c55e18' : `${C.gold}18`,
              border: `1px solid ${isDone ? C.green : C.gold}40`,
              color: isDone ? C.green : C.gold,
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            {isDone ? 'Review' : 'Continue'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Lesson Review screen ────────────────────────────────────
function LessonReview({ lessonId, status, progressMap, onBack, onMarkReviewed }) {
  const lesson = getLessonById(lessonId)
  const [checked,   setChecked]   = useState({})
  const [reflection, setReflection] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const mod     = lesson ? getModuleById(lesson.moduleId) : null
  const s       = STATUS_CFG[status] || STATUS_CFG.locked
  const isLocked = status === 'locked'
  const isDone   = status === 'completed'

  // ── Fallback: lesson not found ───────────────────────────
  if (!lesson) {
    return (
      <div style={{ padding: 'clamp(16px, 5vw, 28px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 13 }}>
          <Icon name="ArrowLeft" size={15} /> Back
        </button>
        <div style={{ background: '#0d1426', border: '1px solid #ef444430', borderRadius: 14, padding: '28px 20px', textAlign: 'center' }}>
          <Icon name="AlertCircle" size={32} style={{ color: '#ef4444', marginBottom: 12 }} />
          <h3 style={{ color: '#fff', fontSize: 16, margin: '0 0 8px' }}>Lesson Not Found</h3>
          <p style={{ fontSize: 13, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            This lesson could not be loaded. Return to the modules list and select another item.
          </p>
          <button onClick={onBack} style={{
            marginTop: 20, padding: '10px 24px', borderRadius: 10,
            background: `${C.gold}15`, border: `1px solid ${C.gold}35`,
            color: C.gold, fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
            Back to Modules
          </button>
        </div>
      </div>
    )
  }

  // ── Confirmed / completed state ──────────────────────────
  if (confirmed) {
    return (
      <div style={{ padding: 'clamp(16px, 5vw, 28px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', margin: '24px auto 0',
          background: '#22c55e12', border: '1px solid #22c55e30',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="CheckCircle2" size={30} style={{ color: C.green }} />
        </div>
        <div>
          <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>Review Complete</h2>
          <p style={{ fontSize: 13, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            "{lesson.title}" has been marked as reviewed. Your progress has been updated.
          </p>
        </div>
        <button onClick={onBack} style={{
          padding: '12px 28px', borderRadius: 12,
          background: C.gold, color: '#050810', fontSize: 14, fontWeight: 700,
          border: 'none', cursor: 'pointer',
        }}>
          Back to Modules
        </button>
      </div>
    )
  }

  const allChecked = lesson.checklist && lesson.checklist.length > 0
    ? lesson.checklist.every((_, i) => checked[i])
    : true

  const handleMark = () => {
    if (onMarkReviewed) onMarkReviewed(lesson.id)
    setConfirmed(true)
  }

  return (
    <div style={{
      padding: 'clamp(12px, 4vw, 24px)',
      display: 'flex', flexDirection: 'column', gap: 20,
      minWidth: 0, overflowX: 'hidden',
    }}>
      {/* Back */}
      <button onClick={onBack} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6,
        color: '#64748b', fontSize: 13, alignSelf: 'flex-start', padding: '4px 0',
      }}>
        <Icon name="ArrowLeft" size={15} /> Back to Modules
      </button>

      {/* Locked notice */}
      {isLocked && (
        <div style={{
          background: '#47556918', border: '1px solid #47556940',
          borderRadius: 12, padding: '14px 16px',
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <Icon name="Lock" size={16} style={{ color: '#64748b', flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', margin: '0 0 4px' }}>This lesson is currently locked</p>
            <p style={{ fontSize: 12, color: '#475569', margin: 0, lineHeight: 1.6 }}>
              Complete the earlier lessons in this module to unlock it. You are viewing a preview — progress cannot be recorded while locked.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: '#0d1426', border: `1px solid ${s.color}20`, borderRadius: 14, padding: '18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: s.bg, border: `1px solid ${s.color}28`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={lesson.icon || 'BookOpen'} size={20} style={{ color: s.color }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
              <h1 style={{ fontSize: 17, fontWeight: 800, color: '#fff', margin: 0, overflowWrap: 'anywhere' }}>
                {lesson.title}
              </h1>
              <StatusBadge status={status} />
            </div>
            {mod && <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 2px' }}>{mod.title}</p>}
            <p style={{ fontSize: 11, color: '#475569', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="Clock" size={11} /> {lesson.estimatedTime || '—'}
            </p>
          </div>
        </div>

        {lesson.objective && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1e293b' }}>
            <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Objective
            </p>
            <p style={{ fontSize: 13, color: '#cbd5e1', margin: 0, lineHeight: 1.6, overflowWrap: 'anywhere' }}>
              {lesson.objective}
            </p>
          </div>
        )}
      </div>

      {/* Overview */}
      {lesson.overview && (
        <div style={{ background: '#0d1426', border: '1px solid #1e293b', borderRadius: 14, padding: '16px 18px' }}>
          <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Overview
          </p>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: 0, lineHeight: 1.7, overflowWrap: 'anywhere' }}>
            {lesson.overview}
          </p>
        </div>
      )}

      {/* Content sections */}
      {(lesson.sections && lesson.sections.length > 0) ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 11, color: '#64748b', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Content
          </p>
          {lesson.sections.map((sec, idx) => (
            <div key={sec.id || idx} style={{
              background: '#0a0f1e', border: '1px solid #1e293b',
              borderRadius: 12, padding: '14px 16px',
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.gold, margin: '0 0 6px', overflowWrap: 'anywhere' }}>
                {sec.heading}
              </p>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: 0, lineHeight: 1.7, overflowWrap: 'anywhere' }}>
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        // Fallback sections if missing
        <div style={{ background: '#0a0f1e', border: '1px solid #1e293b', borderRadius: 12, padding: '14px 16px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.gold, margin: '0 0 6px' }}>Key Concepts</p>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>
            Review the lesson objective above, complete the checklist below, and mark this lesson as reviewed when ready.
          </p>
        </div>
      )}

      {/* Checklist */}
      {(lesson.checklist && lesson.checklist.length > 0) ? (
        <div style={{ background: '#0d1426', border: '1px solid #1e293b', borderRadius: 14, padding: '16px 18px' }}>
          <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Review Checklist
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {lesson.checklist.map((item, i) => (
              <label key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, cursor: isLocked ? 'default' : 'pointer',
              }}>
                <div
                  onClick={() => !isLocked && setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                  style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                    background: checked[i] ? C.green : 'transparent',
                    border: `2px solid ${checked[i] ? C.green : '#334155'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: isLocked ? 'default' : 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {checked[i] && <Icon name="Check" size={12} style={{ color: '#050810' }} />}
                </div>
                <span style={{
                  fontSize: 13, color: checked[i] ? '#94a3b8' : '#e2e8f0',
                  lineHeight: 1.5, overflowWrap: 'anywhere',
                  textDecoration: checked[i] ? 'line-through' : 'none',
                }}>
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        // Default checklist fallback
        <div style={{ background: '#0d1426', border: '1px solid #1e293b', borderRadius: 14, padding: '16px 18px' }}>
          <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Review Checklist
          </p>
          {['I understand the purpose of this lesson',
            'I have reviewed the key points',
            'I am ready to mark this lesson as reviewed'].map((item, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: isLocked ? 'default' : 'pointer', marginBottom: 10 }}>
              <div
                onClick={() => !isLocked && setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                  background: checked[i] ? C.green : 'transparent',
                  border: `2px solid ${checked[i] ? C.green : '#334155'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: isLocked ? 'default' : 'pointer',
                }}
              >
                {checked[i] && <Icon name="Check" size={12} style={{ color: '#050810' }} />}
              </div>
              <span style={{ fontSize: 13, color: checked[i] ? '#94a3b8' : '#e2e8f0', lineHeight: 1.5 }}>
                {item}
              </span>
            </label>
          ))}
        </div>
      )}

      {/* Reflection question */}
      {lesson.reflectionQuestions && lesson.reflectionQuestions.length > 0 && (
        <div style={{ background: '#0d1426', border: '1px solid #1e293b', borderRadius: 14, padding: '16px 18px' }}>
          <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Reflection
          </p>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 10px', lineHeight: 1.6 }}>
            {lesson.reflectionQuestions[0]}
          </p>
          {!isLocked && (
            <textarea
              value={reflection}
              onChange={e => setReflection(e.target.value)}
              placeholder="Your notes here (optional)…"
              rows={3}
              style={{
                width: '100%', background: '#0f172a', border: '1px solid #334155',
                borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#fff',
                outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                placeholder: '#475569',
              }}
            />
          )}
        </div>
      )}

      {/* Mark as reviewed / back buttons */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingBottom: 24 }}>
        <button onClick={onBack} style={{
          flex: 1, minWidth: 120, padding: '12px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: 'transparent', border: '1px solid #334155', color: '#64748b', cursor: 'pointer',
        }}>
          Back
        </button>
        {!isLocked && !isDone && (
          <button
            onClick={handleMark}
            disabled={!allChecked}
            title={!allChecked ? 'Complete all checklist items first' : ''}
            style={{
              flex: 2, minWidth: 180, padding: '12px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700,
              background: allChecked ? C.gold : '#1e293b',
              border: `1px solid ${allChecked ? C.gold : '#334155'}`,
              color: allChecked ? '#050810' : '#475569',
              cursor: allChecked ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            Mark as Reviewed
          </button>
        )}
        {isDone && (
          <div style={{
            flex: 2, minWidth: 180, padding: '12px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700,
            background: '#22c55e12', border: `1px solid ${C.green}30`,
            color: C.green, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Icon name="CheckCircle2" size={14} /> Already Reviewed
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Modules list screen ─────────────────────────────────────
function ModulesScreen({ progressMap, onBack, onOpenLesson }) {
  return (
    <div style={{ padding: 'clamp(12px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <Icon name="ArrowLeft" size={16} style={{ color: '#64748b' }} />
        </button>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>Learning Modules</h2>
      </div>

      {LESSON_MODULES.map(mod => {
        const lessons = getLessonsForModule(mod.id)
        const doneCt  = lessons.filter(l => (progressMap[l.id] || 'locked') === 'completed').length
        const pct     = lessons.length > 0 ? Math.round((doneCt / lessons.length) * 100) : 0

        return (
          <div key={mod.id} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Module header */}
            <div style={{
              background: `${mod.color}08`, border: `1px solid ${mod.color}20`,
              borderRadius: 12, padding: '12px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: `${mod.color}15`, border: `1px solid ${mod.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={mod.icon} size={15} style={{ color: mod.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {mod.title}
                  </p>
                  <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>
                    {doneCt} / {lessons.length} completed
                  </p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: mod.color, fontFamily: 'monospace', flexShrink: 0 }}>
                  {pct}%
                </span>
              </div>
              <ProgressBar pct={pct} color={mod.color} height={4} />
            </div>

            {/* Lessons in this module */}
            {lessons.map(lesson => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                status={progressMap[lesson.id] || 'locked'}
                onOpen={onOpenLesson}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

// ─── Check-in form ────────────────────────────────────────────
function CheckInForm({ learner, onBack }) {
  const [confidence, setConfidence]   = useState(3)
  const [completed, setCompleted]     = useState('')
  const [needSupport, setNeedSupport] = useState(null)
  const [notes, setNotes]             = useState('')
  const [submitted, setSubmitted]     = useState(false)
  const dataStore = useDataStore()

  const handleSubmit = () => {
    if (dataStore?.addCheckIn) {
      dataStore.addCheckIn({
        jobseekerId: learner.id,
        date: new Date().toISOString(),
        confidence, completedThis: completed,
        needsSupport: needSupport, notes,
        isDemo: learner.isDemo || false,
      })
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ padding: 'clamp(16px, 5vw, 28px)', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px', background: '#22c55e12', border: '1px solid #22c55e30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="CheckCircle2" size={26} style={{ color: C.green }} />
        </div>
        <h3 style={{ color: '#fff', fontSize: 17, marginBottom: 8 }}>Check-in recorded</h3>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>Your check-in has been saved.</p>
        <button onClick={onBack} style={{ padding: '10px 24px', borderRadius: 10, background: `${C.gold}15`, border: `1px solid ${C.gold}35`, color: C.gold, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: 'clamp(12px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <Icon name="ArrowLeft" size={16} style={{ color: '#64748b' }} />
        </button>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>Daily Check-in</h2>
      </div>

      <div>
        <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 10 }}>
          How confident do you feel today? <span style={{ color: C.gold }}>{confidence}/5</span>
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setConfidence(n)} style={{
              width: 44, height: 44, borderRadius: '50%',
              border: `1.5px solid ${n <= confidence ? C.gold : '#334155'}`,
              background: n <= confidence ? `${C.gold}18` : 'transparent',
              color: n <= confidence ? C.gold : '#64748b',
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
            }}>{n}</button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 8 }}>
          What did you complete today?
        </label>
        <textarea value={completed} onChange={e => setCompleted(e.target.value)}
          placeholder="e.g. reviewed a lesson, completed a module…" rows={3}
          style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#fff', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 8 }}>
          Do you need any support?
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Yes','No'].map(v => (
            <button key={v} onClick={() => setNeedSupport(v === 'Yes')} style={{
              padding: '8px 22px', borderRadius: 8, fontSize: 13, fontWeight: 700,
              border: `1.5px solid ${needSupport === (v==='Yes') ? C.gold : '#334155'}`,
              background: needSupport === (v==='Yes') ? `${C.gold}15` : 'transparent',
              color: needSupport === (v==='Yes') ? C.gold : '#64748b',
              cursor: 'pointer', minHeight: 40,
            }}>{v}</button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 8 }}>Any other notes?</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)}
          placeholder="Optional…" rows={2}
          style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#fff', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onBack} style={{ flex: 1, padding: 12, borderRadius: 10, fontSize: 13, fontWeight: 600, background: 'transparent', border: '1px solid #334155', color: '#64748b', cursor: 'pointer', minHeight: 44 }}>
          Cancel
        </button>
        <button onClick={handleSubmit} style={{ flex: 2, padding: 12, borderRadius: 10, fontSize: 13, fontWeight: 700, background: C.gold, border: 'none', color: '#050810', cursor: 'pointer', minHeight: 44 }}>
          Submit Check-in
        </button>
      </div>
    </div>
  )
}

// ─── Evidence screen ──────────────────────────────────────────
function EvidenceScreen({ learner, dataStore, onBack }) {
  const evRecords = (dataStore?.evidenceRecords || []).filter(e => e.jobseekerId === learner.id)
  return (
    <div style={{ padding: 'clamp(12px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <Icon name="ArrowLeft" size={16} style={{ color: '#64748b' }} />
        </button>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>Evidence & Completion</h2>
      </div>
      {evRecords.length === 0 ? (
        <div style={{ background: '#0d1426', border: '1px solid #1e293b', borderRadius: 14, padding: '28px 18px', textAlign: 'center' }}>
          <Icon name="Paperclip" size={28} style={{ color: '#334155', marginBottom: 10 }} />
          <p style={{ fontSize: 13, color: '#475569', margin: 0, lineHeight: 1.6 }}>
            No evidence recorded yet. Complete lessons to generate evidence records.
          </p>
        </div>
      ) : evRecords.map(ev => (
        <div key={ev.id} style={{ background: '#0d1426', border: '1px solid #1e293b', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Icon name="FileCheck" size={16} style={{ color: C.green, flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', margin: '0 0 4px', overflowWrap: 'anywhere' }}>{ev.title || 'Evidence item'}</p>
            {ev.provider && <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{ev.provider}</p>}
          </div>
        </div>
      ))}
      <div style={{ background: `linear-gradient(135deg, ${C.gold}06 0%, #0d1426 100%)`, border: `1px solid ${C.gold}20`, borderRadius: 14, padding: '18px 18px', textAlign: 'center' }}>
        <Icon name="Award" size={28} style={{ color: C.gold, marginBottom: 10 }} />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>Certificate Status</h3>
        <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 12px', lineHeight: 1.5 }}>
          Complete all modules and your final review to unlock your completion certificate.
        </p>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, background: '#f59e0b18', border: `1px solid ${C.amber}30`, color: C.amber }}>
          <Icon name="Clock" size={11} /> In Progress
        </span>
      </div>
    </div>
  )
}

// ─── Progress screen ──────────────────────────────────────────
function ProgressScreen({ learner, progressMap, onBack }) {
  const progress  = calcProgress(progressMap)
  const doneCount = Object.values(progressMap).filter(v => v === 'completed').length
  return (
    <div style={{ padding: 'clamp(12px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <Icon name="ArrowLeft" size={16} style={{ color: '#64748b' }} />
        </button>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>My Progress</h2>
      </div>
      <div style={{ background: '#0d1426', border: '1px solid #1e293b', borderRadius: 14, padding: '18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>Overall completion</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: C.gold, fontFamily: 'monospace' }}>{progress}%</span>
        </div>
        <ProgressBar pct={progress} height={8} />
        <p style={{ fontSize: 11, color: '#475569', margin: '10px 0 0' }}>
          {doneCount} of {LESSONS.length} lessons completed
        </p>
      </div>
      {LESSONS.map((lesson, idx) => {
        const s = progressMap[lesson.id] || 'locked'
        const sc = STATUS_CFG[s] || STATUS_CFG.locked
        return (
          <div key={lesson.id} style={{ background: '#0d1426', border: `1px solid ${sc.color}20`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, color: '#334155', fontFamily: 'monospace', flexShrink: 0, width: 18 }}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span style={{ flex: 1, fontSize: 13, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {lesson.title}
            </span>
            <StatusBadge status={s} />
          </div>
        )
      })}
    </div>
  )
}

// ─── Home screen ──────────────────────────────────────────────
function HomeScreen({ learner, progressMap, onNav }) {
  const progress  = calcProgress(progressMap)
  const doneCount = Object.values(progressMap).filter(v => v === 'completed').length
  const nextLesson = LESSONS.find(l => (progressMap[l.id] || 'locked') === 'available')

  return (
    <div style={{ padding: 'clamp(12px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ background: `linear-gradient(135deg, ${C.gold}08 0%, #070d1a 100%)`, border: `1px solid ${C.gold}18`, borderRadius: 14, padding: '18px 18px' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>
          Hi, {learner.displayName.split(' ')[0]} 👋
        </h2>
        <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 14px', overflowWrap: 'anywhere' }}>
          {learner.programme || 'Generic Learning Programme'}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>Overall Progress</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>{progress}%</span>
        </div>
        <ProgressBar pct={progress} />
        <p style={{ fontSize: 11, color: '#475569', margin: '8px 0 0' }}>
          {doneCount} of {LESSONS.length} lessons completed
        </p>
      </div>

      {nextLesson && (
        <button onClick={() => onNav('modules')} style={{
          width: '100%', padding: '14px 18px', borderRadius: 12,
          background: `${C.gold}10`, border: `1px solid ${C.gold}35`,
          display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left',
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: `${C.gold}18`, border: `1px solid ${C.gold}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="PlayCircle" size={18} style={{ color: C.gold }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              Continue where you left off
            </p>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {nextLesson.title}
            </p>
          </div>
          <Icon name="ChevronRight" size={16} style={{ color: C.gold, flexShrink: 0 }} />
        </button>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'Modules',   icon: 'BookOpen',       tab: 'modules',  color: C.gold   },
          { label: 'Check-in',  icon: 'ClipboardCheck', tab: 'checkin',  color: C.green  },
          { label: 'Evidence',  icon: 'Paperclip',      tab: 'evidence', color: C.purple },
          { label: 'Progress',  icon: 'TrendingUp',     tab: 'progress', color: C.amber  },
        ].map(({ label, icon, tab, color }) => (
          <button key={tab} onClick={() => onNav(tab)} style={{
            padding: '14px 12px', borderRadius: 12, textAlign: 'center',
            background: `${color}08`, border: `1px solid ${color}25`, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            minHeight: 80,
          }}>
            <Icon name={icon} size={20} style={{ color }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9' }}>{label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 14px', borderRadius: 10, background: '#0f172a', border: '1px solid #1e293b', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Icon name="Info" size={13} style={{ color: '#475569', flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 11, color: '#475569', margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: '#64748b' }}>Demo mode shows the product. Live mode runs the product.</strong>{' '}
          This app is backend-ready and can connect to Supabase, Firebase or any backend for real learners, persistent records and live progress.
        </p>
      </div>
    </div>
  )
}

// ─── Bottom nav ───────────────────────────────────────────────
function BottomNav({ current, onNav }) {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#090e1c', borderTop: '1px solid #1e293b',
      display: 'flex', justifyContent: 'space-around',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)', zIndex: 50,
    }}>
      {[
        { id: 'home',     icon: 'Home',          label: 'Home'     },
        { id: 'modules',  icon: 'BookOpen',       label: 'Modules'  },
        { id: 'checkin',  icon: 'ClipboardCheck', label: 'Check-in' },
        { id: 'evidence', icon: 'Paperclip',      label: 'Evidence' },
        { id: 'progress', icon: 'TrendingUp',     label: 'Progress' },
      ].map(({ id, icon, label }) => {
        const active = current === id || (current === 'lesson' && id === 'modules')
        return (
          <button key={id} onClick={() => onNav(id)} style={{
            flex: 1, padding: '8px 2px', background: 'none', border: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            cursor: 'pointer', minHeight: 52,
          }}>
            <Icon name={icon} size={18} style={{ color: active ? C.gold : '#475569' }} />
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 500, color: active ? C.gold : '#475569', letterSpacing: '0.04em' }}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

// ─── Main PWA (post-login) ────────────────────────────────────
function LearnerApp({ learner, onSignOut, isDemoMode }) {
  const scrollRef = useRef(null)
  const [screen,         setScreen]         = useState('home')
  const [selectedLesson, setSelectedLesson] = useState(null) // { id, status }
  const [completedIds,   setCompletedIds]   = useState([])

  const dataStore = useDataStore()
  const navigate  = useNavigate()

  // Build progress map from completed lesson IDs
  const progressMap = buildProgressMap(completedIds)

  const handleOpenLesson = useCallback((lesson, status) => {
    if (!lesson?.id) return
    setSelectedLesson({ id: lesson.id, status: status || progressMap[lesson.id] || 'locked' })
    setScreen('lesson')
  }, [progressMap])

  const handleMarkReviewed = useCallback((lessonId) => {
    setCompletedIds(prev => prev.includes(lessonId) ? prev : [...prev, lessonId])
  }, [])

  const handleNav = useCallback((tab) => {
    if (tab !== 'lesson') setSelectedLesson(null)
    setScreen(tab)
  }, [])

  const header = (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(12px, 4vw, 20px)', height: 52,
      background: '#090e1c95', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1e293b', minWidth: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: 1, overflow: 'hidden' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Icon name="Home" size={15} style={{ color: '#475569' }} />
        </button>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.gold, fontFamily: "'Space Grotesk', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Generic Learning PWA
        </span>
        <ModeBadge isDemoMode={isDemoMode} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${C.gold}15`, border: `1px solid ${C.gold}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: C.gold }}>
          {learner.displayName.charAt(0).toUpperCase()}
        </div>
        <button onClick={onSignOut} style={{ fontSize: 10, color: '#475569', background: 'none', border: 'none', cursor: 'pointer' }}>
          Sign out
        </button>
      </div>
    </header>
  )

  const renderScreen = () => {
    switch (screen) {
      case 'lesson':
        if (!selectedLesson?.id) {
          setScreen('modules')
          return null
        }
        return (
          <LessonReview
            lessonId={selectedLesson.id}
            status={progressMap[selectedLesson.id] || selectedLesson.status || 'locked'}
            progressMap={progressMap}
            onBack={() => setScreen('modules')}
            onMarkReviewed={handleMarkReviewed}
          />
        )
      case 'modules':
        return (
          <ModulesScreen
            progressMap={progressMap}
            onBack={() => setScreen('home')}
            onOpenLesson={handleOpenLesson}
          />
        )
      case 'checkin':
        return <CheckInForm learner={learner} onBack={() => setScreen('home')} />
      case 'evidence':
        return <EvidenceScreen learner={learner} dataStore={dataStore} onBack={() => setScreen('home')} />
      case 'progress':
        return <ProgressScreen learner={learner} progressMap={progressMap} onBack={() => setScreen('home')} />
      default:
        return (
          <HomeScreen
            learner={learner}
            progressMap={progressMap}
            onNav={handleNav}
          />
        )
    }
  }

  return (
    <div
      ref={scrollRef}
      style={{
        height: '100dvh', background: '#050810', color: '#f1f5f9',
        fontFamily: "'Inter', sans-serif",
        overflowY: 'auto', overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {header}
      <main style={{ minWidth: 0, width: '100%', overflowX: 'hidden', paddingBottom: 72 }}>
        {renderScreen()}
      </main>
      <BottomNav current={screen} onNav={handleNav} />
    </div>
  )
}

// ─── Root export ─────────────────────────────────────────────
export default function LearnerPwa() {
  const [learner,  setLearner]  = useState(null)
  const config     = useConfigStore(s => s.config)
  const isDemoMode = config?.demoModeEnabled ?? true

  const handleAuth     = useCallback((l) => setLearner(l), [])
  const handleSignOut  = () => {
    try { localStorage.removeItem(STORAGE_KEYS.PARTICIPANT_SESSION) } catch (_) {}
    setLearner(null)
  }

  if (!learner) return <LearnerGate onAuth={handleAuth} isDemoMode={isDemoMode} />
  return <LearnerApp learner={learner} onSignOut={handleSignOut} isDemoMode={isDemoMode} />
}
