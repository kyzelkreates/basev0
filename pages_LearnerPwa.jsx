/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — Learner PWA
 * Generic Learning Installable PWA — Learner-facing interface.
 * Route: /#/learner
 * Mobile-first. No horizontal overflow. Demo/live mode aware.
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */

import { useState, useEffect, useCallback } from 'react'
import { useNavigate }    from 'react-router-dom'
import Icon               from './components_ui_Icon'
import {
  useDataStore,
  useConfigStore,
  STORAGE_KEYS,
} from './core_storage'
import { jobseekerService } from './services_careerlink_jobseekerService'
import {
  DEMO_PARTICIPANTS,
  DEMO_LEARNING_MODULES,
  DEMO_MODULE_PROGRESS,
  calcModuleProgress,
  CHECK_IN_QUESTIONS_DEFAULT,
} from './services_careerlink_demoData'

// ─── Colours ────────────────────────────────────────────────
const C = {
  gold:   '#d4af37',
  purple: '#a855f7',
  green:  '#22c55e',
  red:    '#ef4444',
  amber:  '#f59e0b',
  silver: '#b0b8c8',
}

// ─── Status config ────────────────────────────────────────────
const MODULE_STATUS = {
  completed: { label: 'Completed', color: C.green,  bg: '#22c55e12', icon: 'CheckCircle2' },
  available: { label: 'Available', color: C.gold,   bg: '#d4af3712', icon: 'PlayCircle'   },
  locked:    { label: 'Locked',    color: '#475569', bg: '#47556912', icon: 'Lock'         },
}

// ─── Helpers ──────────────────────────────────────────────────
function ProgressBar({ pct, color = C.gold, height = 6 }) {
  return (
    <div style={{ height, borderRadius: height, background: '#1e293b', overflow: 'hidden', width: '100%' }}>
      <div style={{
        height: '100%',
        width: `${Math.min(100, Math.max(0, pct))}%`,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: height,
        transition: 'width 0.5s ease',
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
      {isDemoMode ? 'Demo Mode' : 'Live Mode'}
    </span>
  )
}

// ─── Learner select gate ──────────────────────────────────────
function LearnerGate({ onAuth, isDemoMode }) {
  const [learnerId, setLearnerId] = useState('')
  const [error, setError]         = useState('')
  const [learners, setLearners]   = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Try session restore first
    try {
      const session = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBSEEKER_SESSION) || 'null')
      if (session?.jobseekerId) {
        const all = jobseekerService.getAll()
        const found = all.find(j => j.id === session.jobseekerId)
        if (found) { onAuth(found); return }
      }
    } catch (_) {}

    // Load from service (includes demo data if seeded)
    const all = jobseekerService.getAll()
    if (all.length > 0) {
      setLearners(all)
    } else if (isDemoMode) {
      // Fallback: use raw demo data if service hasn't seeded yet
      setLearners(DEMO_PARTICIPANTS)
    }
  }, [onAuth, isDemoMode])

  const handleEnter = () => {
    setError('')
    if (!learnerId) { setError('Please select your name.'); return }
    const found = learners.find(j => j.id === learnerId)
    if (!found) { setError('Learner not found.'); return }
    try {
      localStorage.setItem(STORAGE_KEYS.JOBSEEKER_SESSION, JSON.stringify({ jobseekerId: learnerId, ts: Date.now() }))
    } catch (_) {}
    onAuth(found)
  }

  return (
    <div style={{
      minHeight: '100dvh', background: '#050810',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: 'clamp(16px, 5vw, 32px)',
    }}>
      {/* Back to home */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: 16, left: 16,
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <Icon name="ArrowLeft" size={14} /> Home
      </button>

      <div style={{ width: '100%', maxWidth: 360 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: `${C.gold}12`, border: `1px solid ${C.gold}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
          }}>
            <Icon name="GraduationCap" size={28} style={{ color: C.gold }} />
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>
            Generic Learning PWA
          </h1>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>
            Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
          </p>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
            <ModeBadge isDemoMode={isDemoMode} />
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#0d1426', border: '1px solid #1e293b',
          borderRadius: 18, padding: 24,
        }}>
          <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Select your name
          </label>
          <select
            value={learnerId}
            onChange={e => setLearnerId(e.target.value)}
            style={{
              width: '100%', background: '#0f172a', border: '1px solid #334155',
              borderRadius: 10, padding: '12px 14px', fontSize: 14, color: '#fff',
              outline: 'none', cursor: 'pointer', marginBottom: 12,
            }}
          >
            <option value="">Choose your name…</option>
            {learners.map(l => (
              <option key={l.id} value={l.id}>{l.displayName}</option>
            ))}
          </select>

          {error && <p style={{ fontSize: 12, color: C.red, marginBottom: 10 }}>{error}</p>}

          <button
            onClick={handleEnter}
            style={{
              width: '100%', padding: '13px', borderRadius: 10,
              background: C.gold, color: '#050810', fontSize: 14, fontWeight: 700,
              border: 'none', cursor: 'pointer',
            }}
          >
            Open My Learning App
          </button>

          {learners.length === 0 && (
            <p style={{ fontSize: 11, color: '#475569', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
              No learners set up yet.{isDemoMode ? ' Demo data may still be loading.' : ' Ask your trainer to set up your account.'}
            </p>
          )}
        </div>

        {/* PWA install hint */}
        <div style={{
          marginTop: 16, padding: '10px 14px', borderRadius: 10,
          background: '#a855f712', border: `1px solid ${C.purple}25`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Icon name="Smartphone" size={14} style={{ color: C.purple, flexShrink: 0 }} />
          <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
            <strong style={{ color: C.purple }}>Installable PWA Ready.</strong>{' '}
            Add to your home screen from your browser menu for the full app experience.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Module Card ──────────────────────────────────────────────
function ModuleCard({ mod, status, onContinue }) {
  const s = MODULE_STATUS[status] || MODULE_STATUS.locked
  const isLocked = status === 'locked'
  return (
    <div style={{
      background: '#0d1426', border: `1px solid ${s.color}25`,
      borderRadius: 14, padding: '16px 18px',
      opacity: isLocked ? 0.6 : 1,
      display: 'flex', flexDirection: 'column', gap: 10,
      minWidth: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: s.bg, border: `1px solid ${s.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={mod.icon} size={17} style={{ color: s.color }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {mod.title}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
              background: s.bg, border: `1px solid ${s.color}30`, color: s.color,
              flexShrink: 0,
            }}>
              {s.label}
            </span>
          </div>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0, lineHeight: 1.5, overflowWrap: 'anywhere' }}>
            {mod.description}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="Clock" size={11} /> {mod.duration}
          {mod.evidenceRequired && (
            <span style={{ marginLeft: 8, color: C.amber }}>
              <Icon name="Paperclip" size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> Evidence required
            </span>
          )}
        </span>
        {!isLocked && (
          <button
            onClick={() => onContinue && onContinue(mod)}
            style={{
              padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700,
              background: status === 'completed' ? '#22c55e18' : `${C.gold}18`,
              border: `1px solid ${status === 'completed' ? C.green : C.gold}40`,
              color: status === 'completed' ? C.green : C.gold,
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            {status === 'completed' ? 'Review' : 'Continue'}
          </button>
        )}
      </div>
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
        confidence,
        completedThis: completed,
        needsSupport: needSupport,
        notes,
        isDemo: learner.isDemo || false,
      })
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ padding: 'clamp(16px, 5vw, 28px)', textAlign: 'center' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
          background: '#22c55e12', border: '1px solid #22c55e30',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="CheckCircle2" size={26} style={{ color: C.green }} />
        </div>
        <h3 style={{ color: '#fff', fontSize: 17, marginBottom: 8 }}>Check-in recorded</h3>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>Thank you. Your check-in has been saved.</p>
        <button onClick={onBack} style={{
          padding: '10px 24px', borderRadius: 10,
          background: `${C.gold}15`, border: `1px solid ${C.gold}35`,
          color: C.gold, fontSize: 13, fontWeight: 700, cursor: 'pointer',
        }}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: 'clamp(12px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="ClipboardCheck" size={17} style={{ color: C.gold }} /> Daily Check-in
      </h2>

      {/* Confidence */}
      <div>
        <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 10 }}>
          How confident do you feel today? <span style={{ color: C.gold }}>{confidence}/5</span>
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setConfidence(n)} style={{
              width: 40, height: 40, borderRadius: '50%', border: `1.5px solid ${n <= confidence ? C.gold : '#334155'}`,
              background: n <= confidence ? `${C.gold}18` : 'transparent',
              color: n <= confidence ? C.gold : '#64748b',
              fontSize: 14, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
            }}>{n}</button>
          ))}
        </div>
      </div>

      {/* What did you complete */}
      <div>
        <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 8 }}>
          What did you complete today?
        </label>
        <textarea
          value={completed}
          onChange={e => setCompleted(e.target.value)}
          placeholder="e.g. Core module, practice activity, reading…"
          rows={3}
          style={{
            width: '100%', background: '#0f172a', border: '1px solid #334155',
            borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#fff',
            outline: 'none', resize: 'vertical', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Need support */}
      <div>
        <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 8 }}>
          Do you need any support?
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Yes', 'No'].map(v => (
            <button key={v} onClick={() => setNeedSupport(v === 'Yes')} style={{
              padding: '8px 22px', borderRadius: 8, fontSize: 13, fontWeight: 700,
              border: `1.5px solid ${needSupport === (v === 'Yes') ? C.gold : '#334155'}`,
              background: needSupport === (v === 'Yes') ? `${C.gold}15` : 'transparent',
              color: needSupport === (v === 'Yes') ? C.gold : '#64748b',
              cursor: 'pointer',
            }}>{v}</button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 8 }}>
          Any other notes?
        </label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Optional comments…"
          rows={2}
          style={{
            width: '100%', background: '#0f172a', border: '1px solid #334155',
            borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#fff',
            outline: 'none', resize: 'vertical', boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onBack} style={{
          flex: 1, padding: '11px', borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: 'transparent', border: '1px solid #334155', color: '#64748b', cursor: 'pointer',
        }}>Cancel</button>
        <button onClick={handleSubmit} style={{
          flex: 2, padding: '11px', borderRadius: 10, fontSize: 13, fontWeight: 700,
          background: C.gold, border: 'none', color: '#050810', cursor: 'pointer',
        }}>Submit Check-in</button>
      </div>
    </div>
  )
}

// ─── Home screen ──────────────────────────────────────────────
function HomeScreen({ learner, progress, modules, progressMap, onNav }) {
  const doneCount = Object.values(progressMap).filter(v => v === 'completed').length
  const totalMods = modules.length
  const nextMod   = modules.find(m => (progressMap[m.id] || 'locked') === 'available')

  return (
    <div style={{ padding: 'clamp(12px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Greeting */}
      <div style={{
        background: `linear-gradient(135deg, ${C.gold}08 0%, #070d1a 100%)`,
        border: `1px solid ${C.gold}18`, borderRadius: 14, padding: '18px 18px',
      }}>
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
          {doneCount} of {totalMods} modules completed
        </p>
      </div>

      {/* Next module CTA */}
      {nextMod && (
        <button
          onClick={() => onNav('modules')}
          style={{
            width: '100%', padding: '14px 18px', borderRadius: 12,
            background: `${C.gold}10`, border: `1px solid ${C.gold}35`,
            display: 'flex', alignItems: 'center', gap: 12,
            cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: `${C.gold}18`, border: `1px solid ${C.gold}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="PlayCircle" size={18} style={{ color: C.gold }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              Continue where you left off
            </p>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {nextMod.title}
            </p>
          </div>
          <Icon name="ChevronRight" size={16} style={{ color: C.gold, flexShrink: 0 }} />
        </button>
      )}

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'Modules',   icon: 'BookOpen',       tab: 'modules',  color: C.gold },
          { label: 'Check-in',  icon: 'ClipboardCheck', tab: 'checkin',  color: C.green },
          { label: 'Evidence',  icon: 'Paperclip',      tab: 'evidence', color: C.purple },
          { label: 'Progress',  icon: 'TrendingUp',     tab: 'progress', color: C.amber },
        ].map(({ label, icon, tab, color }) => (
          <button key={tab} onClick={() => onNav(tab)} style={{
            padding: '14px 12px', borderRadius: 12, textAlign: 'center',
            background: `${color}08`, border: `1px solid ${color}25`,
            cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}>
            <Icon name={icon} size={20} style={{ color }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9' }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Backend-ready notice */}
      <div style={{
        padding: '12px 14px', borderRadius: 10,
        background: '#0f172a', border: '1px solid #1e293b',
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <Icon name="Info" size={13} style={{ color: '#475569', flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 11, color: '#475569', margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: '#64748b' }}>Demo mode shows the product. Live mode runs the product.</strong>{' '}
          This app is backend-ready and can connect to Supabase, Firebase or any backend for real learners, persistent records and live progress.
        </p>
      </div>
    </div>
  )
}

// ─── Modules screen ───────────────────────────────────────────
function ModulesScreen({ modules, progressMap, onBack }) {
  return (
    <div style={{ padding: 'clamp(12px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <Icon name="ArrowLeft" size={16} style={{ color: '#64748b' }} />
        </button>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>Learning Modules</h2>
      </div>
      {modules.map(mod => (
        <ModuleCard
          key={mod.id}
          mod={mod}
          status={progressMap[mod.id] || 'locked'}
        />
      ))}
    </div>
  )
}

// ─── Evidence screen ──────────────────────────────────────────
function EvidenceScreen({ learner, dataStore, onBack }) {
  const evRecords = (dataStore?.evidenceRecords || []).filter(e => e.jobseekerId === learner.id)

  return (
    <div style={{ padding: 'clamp(12px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <Icon name="ArrowLeft" size={16} style={{ color: '#64748b' }} />
        </button>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>Evidence & Completion</h2>
      </div>

      {evRecords.length === 0 ? (
        <div style={{
          background: '#0d1426', border: '1px solid #1e293b', borderRadius: 14, padding: '28px 18px',
          textAlign: 'center',
        }}>
          <Icon name="Paperclip" size={28} style={{ color: '#334155', marginBottom: 10 }} />
          <p style={{ fontSize: 13, color: '#475569', margin: 0, lineHeight: 1.6 }}>
            No evidence recorded yet.<br />Complete modules to generate evidence records.
          </p>
        </div>
      ) : (
        evRecords.map(ev => (
          <div key={ev.id} style={{
            background: '#0d1426', border: '1px solid #1e293b', borderRadius: 12, padding: '14px 16px',
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <Icon name="FileCheck" size={16} style={{ color: C.green, flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', margin: '0 0 4px', overflowWrap: 'anywhere' }}>
                {ev.title || 'Evidence item'}
              </p>
              {ev.provider && (
                <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{ev.provider}</p>
              )}
            </div>
          </div>
        ))
      )}

      {/* Certificate panel */}
      <div style={{
        background: `linear-gradient(135deg, ${C.gold}06 0%, #0d1426 100%)`,
        border: `1px solid ${C.gold}20`, borderRadius: 14, padding: '18px 18px',
        textAlign: 'center',
      }}>
        <Icon name="Award" size={28} style={{ color: C.gold, marginBottom: 10 }} />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>Certificate Status</h3>
        <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 12px', lineHeight: 1.5 }}>
          Complete all 5 modules and your final review session to unlock your completion certificate.
        </p>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999,
          background: '#f59e0b18', border: `1px solid ${C.amber}30`, color: C.amber,
        }}>
          <Icon name="Clock" size={11} /> In Progress
        </span>
      </div>
    </div>
  )
}

// ─── Progress screen ──────────────────────────────────────────
function ProgressScreen({ learner, progress, modules, progressMap, onBack }) {
  const doneCount = Object.values(progressMap).filter(v => v === 'completed').length
  return (
    <div style={{ padding: 'clamp(12px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <Icon name="ArrowLeft" size={16} style={{ color: '#64748b' }} />
        </button>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>My Progress</h2>
      </div>

      {/* Summary card */}
      <div style={{
        background: '#0d1426', border: '1px solid #1e293b', borderRadius: 14, padding: '18px 18px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>Overall completion</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: C.gold, fontFamily: 'monospace' }}>{progress}%</span>
        </div>
        <ProgressBar pct={progress} height={8} />
        <p style={{ fontSize: 11, color: '#475569', margin: '10px 0 0' }}>
          {doneCount} of {modules.length} modules completed
        </p>
      </div>

      {/* Per-module breakdown */}
      {modules.map((mod, idx) => {
        const s = progressMap[mod.id] || 'locked'
        const sc = MODULE_STATUS[s] || MODULE_STATUS.locked
        return (
          <div key={mod.id} style={{
            background: '#0d1426', border: `1px solid ${sc.color}20`,
            borderRadius: 10, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 11, color: '#334155', fontFamily: 'monospace', flexShrink: 0, width: 18 }}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span style={{ flex: 1, fontSize: 13, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {mod.title}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
              background: sc.bg, color: sc.color, flexShrink: 0,
            }}>
              {sc.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Bottom nav ───────────────────────────────────────────────
function BottomNav({ current, onNav }) {
  const items = [
    { id: 'home',     icon: 'Home',          label: 'Home'    },
    { id: 'modules',  icon: 'BookOpen',       label: 'Modules' },
    { id: 'checkin',  icon: 'ClipboardCheck', label: 'Check-in'},
    { id: 'evidence', icon: 'Paperclip',      label: 'Evidence'},
    { id: 'progress', icon: 'TrendingUp',     label: 'Progress'},
  ]
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#090e1c', borderTop: '1px solid #1e293b',
      display: 'flex', justifyContent: 'space-around',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      zIndex: 50,
    }}>
      {items.map(({ id, icon, label }) => {
        const active = current === id
        return (
          <button
            key={id}
            onClick={() => onNav(id)}
            style={{
              flex: 1, padding: '8px 2px', background: 'none', border: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              cursor: 'pointer', minHeight: 52,
            }}
          >
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

// ─── Main PWA component (post-login) ─────────────────────────
function LearnerApp({ learner, onSignOut, isDemoMode }) {
  const [screen, setScreen] = useState('home')
  const dataStore = useDataStore()
  const navigate  = useNavigate()

  // Get per-learner module progress
  const progressMap = DEMO_MODULE_PROGRESS[learner.id] || {}
  const progress    = calcModuleProgress(progressMap)

  const header = (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(12px, 4vw, 20px)',
      height: 52, background: '#090e1c95', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1e293b',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          display: 'flex', alignItems: 'center',
        }}>
          <Icon name="Home" size={15} style={{ color: '#475569' }} />
        </button>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.gold, fontFamily: "'Space Grotesk', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Generic Learning PWA
        </span>
        <ModeBadge isDemoMode={isDemoMode} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: `${C.gold}15`, border: `1px solid ${C.gold}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: C.gold, flexShrink: 0,
        }}>
          {learner.displayName.charAt(0).toUpperCase()}
        </div>
        <button onClick={onSignOut} style={{
          fontSize: 10, color: '#475569', background: 'none', border: 'none', cursor: 'pointer',
        }}>
          Sign out
        </button>
      </div>
    </header>
  )

  const renderScreen = () => {
    switch (screen) {
      case 'modules':  return <ModulesScreen  modules={DEMO_LEARNING_MODULES} progressMap={progressMap} onBack={() => setScreen('home')} />
      case 'checkin':  return <CheckInForm    learner={learner} onBack={() => setScreen('home')} />
      case 'evidence': return <EvidenceScreen learner={learner} dataStore={dataStore} onBack={() => setScreen('home')} />
      case 'progress': return <ProgressScreen learner={learner} progress={progress} modules={DEMO_LEARNING_MODULES} progressMap={progressMap} onBack={() => setScreen('home')} />
      default: return (
        <HomeScreen
          learner={learner}
          progress={progress}
          modules={DEMO_LEARNING_MODULES}
          progressMap={progressMap}
          onNav={setScreen}
        />
      )
    }
  }

  return (
    <div style={{
      minHeight: '100dvh', background: '#050810', color: '#f1f5f9',
      fontFamily: "'Inter', sans-serif",
      paddingBottom: 64, // space for bottom nav
      overflowX: 'hidden',
    }}>
      {header}
      <main style={{ minWidth: 0, width: '100%', overflowX: 'hidden' }}>
        {renderScreen()}
      </main>
      <BottomNav current={screen} onNav={setScreen} />
    </div>
  )
}

// ─── Root export ─────────────────────────────────────────────
export default function LearnerPwa() {
  const [learner, setLearner]     = useState(null)
  const config = useConfigStore(s => s.config)
  const isDemoMode = config?.demoModeEnabled ?? true

  const handleAuth = useCallback((l) => setLearner(l), [])
  const handleSignOut = () => {
    try { localStorage.removeItem(STORAGE_KEYS.JOBSEEKER_SESSION) } catch (_) {}
    setLearner(null)
  }

  if (!learner) {
    return <LearnerGate onAuth={handleAuth} isDemoMode={isDemoMode} />
  }

  return <LearnerApp learner={learner} onSignOut={handleSignOut} isDemoMode={isDemoMode} />
}
