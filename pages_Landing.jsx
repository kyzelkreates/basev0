/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — Public Landing Page
 * Participant PWA + Admin Monitoring Dashboard
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 * Route: /
 * No auth required. Entry point for all visitors.
 * ============================================================
 */

import { useNavigate } from 'react-router-dom'
import { useConfigStore } from './core_storage'
import Icon from './components_ui_Icon'

// ── Visual accent colours ─────────────────────────────────
const GOLD    = '#d4af37'
const SILVER  = '#b0b8c8'
const GREEN   = '#22c55e'
const PURPLE  = '#a855f7'
const BG_DEEP = '#050810'
const BG_CARD = '#0a0f1e'
const BG_CARD2= '#0d1426'
const BORDER  = 'rgba(212,175,55,0.18)'
const BORDER2 = 'rgba(176,184,200,0.12)'

const card = (extra = {}) => ({
  background: BG_CARD2,
  border: `1px solid ${BORDER2}`,
  borderRadius: 16,
  padding: '28px 24px',
  ...extra,
})

const badge = (color, bg) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  background: bg,
  border: `1px solid ${color}33`,
  borderRadius: 999,
  padding: '4px 12px',
  fontSize: 11,
  fontWeight: 700,
  color,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
})

function Pill({ label, icon, color = GOLD }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: color + '12', border: `1px solid ${color}28`,
      borderRadius: 999, padding: '5px 12px',
      fontSize: 12, fontWeight: 600, color,
    }}>
      {icon && <Icon name={icon} size={12} />}
      {label}
    </span>
  )
}

function SectionHeader({ number, label, color, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: color + '15', border: `1px solid ${color}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, fontWeight: 900, color }}>{number}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name={icon} size={15} style={{ color }} />
        <span style={{ fontSize: 15, fontWeight: 700, color, letterSpacing: '0.02em' }}>{label}</span>
      </div>
    </div>
  )
}

function CTAButton({ label, icon, onClick, primary = false, color = GOLD }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
        padding: primary ? '15px 32px' : '13px 28px',
        borderRadius: 14,
        border: primary ? 'none' : `1.5px solid ${color}55`,
        background: primary
          ? `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`
          : `${color}10`,
        color: primary ? '#050810' : color,
        fontSize: primary ? 15 : 14,
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        letterSpacing: '0.01em',
        flex: 1,
        minWidth: 'min(180px, 45vw)',
        maxWidth: 320,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = `0 8px 24px ${color}30`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <Icon name={icon} size={16} />
      {label}
    </button>
  )
}

export default function LandingPage() {
  const navigate    = useNavigate()
  const config      = useConfigStore(s => s.config)
  const isDemoMode  = config?.demoModeEnabled ?? true

  const goToDashboard      = () => navigate('/dashboard')
  const goToParticipantPWA = () => navigate('/learner')

  return (
    <div style={{
      minHeight: '100dvh',
      background: BG_DEEP,
      color: '#e8eaf0',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      overflowX: 'hidden',
    }}>

      {/* ── TOP NAV ─────────────────────────────────────── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(10px, 3vw, 16px) clamp(12px, 4vw, 24px)',
        flexWrap: 'wrap',
        borderBottom: `1px solid ${BORDER}`,
        background: 'rgba(5,8,16,0.92)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `linear-gradient(135deg, ${GOLD}30 0%, ${GOLD}10 100%)`,
            border: `1px solid ${GOLD}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="Layers" size={16} style={{ color: GOLD }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: GOLD, lineHeight: 1.2 }}>4P3X Base OS™</div>
            <div style={{ fontSize: 9, color: SILVER, opacity: 0.7, letterSpacing: '0.05em' }}>POWERED BY 4P3X INTELLIGENT AI</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button
            onClick={goToDashboard}
            aria-label="Open Admin Dashboard"
            style={{
              padding: '8px 16px', borderRadius: 10,
              border: `1px solid ${GOLD}40`, background: `${GOLD}10`,
              color: GOLD, fontSize: 12, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <Icon name="LayoutDashboard" size={13} /> Admin Dashboard
          </button>
          <button
            onClick={goToParticipantPWA}
            aria-label="Open Learner PWA"
            style={{
              padding: '8px 16px', borderRadius: 10,
              border: `1px solid ${PURPLE}40`, background: `${PURPLE}10`,
              color: PURPLE, fontSize: 12, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <Icon name="Smartphone" size={13} /> Learner PWA
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(32px, 6vw, 80px) clamp(16px, 4vw, 64px) clamp(28px, 5vw, 64px)',
        maxWidth: 1100,
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={badge(isDemoMode ? GREEN : GOLD, isDemoMode ? GREEN + '18' : GOLD + '18')}>
            <Icon name={isDemoMode ? 'FlaskConical' : 'Database'} size={11} />
            {isDemoMode ? 'Demo Mode — Sample Data Active' : 'Live Mode — Real Data'}
          </span>
          <span style={badge(SILVER, SILVER + '14')}>
            <Icon name="Cpu" size={11} />
            4P3X Intelligent AI — 4 Embedded Assistants
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 52px)',
          fontWeight: 900, lineHeight: 1.12, color: '#ffffff',
          marginBottom: 8, letterSpacing: '-0.02em',
        }}>
          <span style={{ color: GOLD }}>4P3X Learning &amp; Monitoring</span>
          <br />
          <span style={{ color: SILVER }}>Base OS</span>
          <sup style={{ fontSize: '0.4em', color: GOLD, verticalAlign: 'super', marginLeft: 2 }}>™</sup>
        </h1>
        <h2 style={{
          fontSize: 'clamp(13px, 2.2vw, 20px)',
          fontWeight: 400, color: SILVER, marginBottom: 28, letterSpacing: '0.01em',
        }}>
          Participant PWA&nbsp;+&nbsp;Admin Monitoring Dashboard
        </h2>

        <p style={{
          fontSize: 'clamp(13px, 1.6vw, 16px)',
          color: '#8b9ab5', maxWidth: 680, margin: '0 auto 40px', lineHeight: 1.75,
        }}>
          A reusable 4P3X-powered base system for building learning, coaching, training,
          monitoring, support, and progress-tracking products. Track participant activities,
          manage evidence, monitor progress, flag support risks, and run check-ins —
          all powered by 4 embedded 4P3X Intelligent AI assistants.
        </p>

        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center',
          flexWrap: 'wrap', padding: '0 8px',
        }}>
          <CTAButton label="Open Admin Dashboard"  icon="LayoutDashboard" onClick={goToDashboard}      primary color={GOLD}   />
          <CTAButton label="Open Learner PWA"   icon="Smartphone"      onClick={goToParticipantPWA}       color={PURPLE} />
        </div>
      </section>

      {/* ── PRODUCT CARDS ────────────────────────────────── */}
      <section style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 48px) clamp(40px, 6vw, 80px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24,
      }}>

        {/* Card 1 — Admin Dashboard */}
        <div style={{
          ...card(),
          border: `1px solid ${GOLD}30`,
          background: `linear-gradient(160deg, #0f1320 0%, #0a0f1e 100%)`,
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          <SectionHeader number="1" label="Admin Monitoring Dashboard" color={GOLD} icon="LayoutDashboard" />
          <p style={{ fontSize: 13, color: '#8b9ab5', lineHeight: 1.65, marginBottom: 16 }}>
            Full monitoring dashboard for admins, mentors, and practitioners.
            Manage participants, review activityRecords, check evidence,
            monitor progress, and act on support risk flags.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {['Participant Management','Activity Tracking','Evidence Review','Progress Monitoring','Risk Flags','Reports & Export','AI Insight'].map(f => (
              <Pill key={f} label={f} color={GOLD} />
            ))}
          </div>
          <button
            onClick={goToDashboard}
            style={{
              marginTop: 'auto', padding: '12px 20px', borderRadius: 10,
              border: `1.5px solid ${GOLD}50`, background: `${GOLD}12`,
              color: GOLD, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Icon name="LayoutDashboard" size={14} /> Open Admin Dashboard
          </button>
        </div>

        {/* Card 2 — Participant App */}
        <div style={{
          ...card(),
          border: `1px solid ${PURPLE}30`,
          background: `linear-gradient(160deg, #100a1e 0%, #0a0f1e 100%)`,
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          <SectionHeader number="2" label="Participant PWA" color={PURPLE} icon="Smartphone" />
          <p style={{ fontSize: 13, color: '#8b9ab5', lineHeight: 1.65, marginBottom: 16 }}>
            Installable mobile-first PWA for participants to log activity,
            complete check-ins, submit evidence, track progress, and connect
            with their assigned mentor or practitioner.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {['Activity Logging','Check-ins','Evidence Upload','Progress View','Task Tracking','AI Support','Offline Mode'].map(f => (
              <Pill key={f} label={f} color={PURPLE} />
            ))}
          </div>
          <button
            onClick={goToParticipantPWA}
            style={{
              marginTop: 'auto', padding: '12px 20px', borderRadius: 10,
              border: `1.5px solid ${PURPLE}50`, background: `${PURPLE}12`,
              color: PURPLE, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Icon name="Smartphone" size={14} /> Open Learner PWA
          </button>
        </div>

      </section>

      {/* ── AI SECTION ───────────────────────────────────── */}
      <section style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 48px) clamp(40px, 6vw, 80px)',
      }}>
        <div style={{
          ...card({ padding: '32px 28px' }),
          border: `1px solid ${SILVER}20`,
        }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span style={badge(SILVER, SILVER + '12')}>
              <Icon name="Cpu" size={11} /> 4P3X Intelligent AI — Embedded Layer
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginTop: 12, marginBottom: 8 }}>
              4 Embedded AI Assistants
            </h3>
            <p style={{ fontSize: 13, color: '#8b9ab5', maxWidth: 520, margin: '0 auto' }}>
              Each assistant has a defined purpose and scope. Advisory only — human review required for all important decisions.
            </p>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16,
          }}>
            {[
              { n:'1', name:'4P3X Intelligent AI 1', sub:'Admin Guide',        icon:'LayoutDashboard', color:GOLD,   desc:'Guides admins around the dashboard, explains sections, and helps understand the base system.' },
              { n:'2', name:'4P3X Intelligent AI 2', sub:'Progress Insight',   icon:'BarChart3',       color:GREEN,  desc:'Helps interpret participant activity, check-ins, evidence, tasks, milestones, and progress patterns.' },
              { n:'3', name:'4P3X Intelligent AI 3', sub:'Participant Guide',  icon:'Smartphone',      color:PURPLE, desc:'Guides participants around the PWA — tasks, check-ins, evidence uploads, and progress updates.' },
              { n:'4', name:'4P3X Intelligent AI 4', sub:'Support Assistant',  icon:'HeartHandshake',  color:SILVER, desc:'Provides neutral, non-clinical support explanations and helps participants with planning and next steps.' },
            ].map(ai => (
              <div key={ai.n} style={{
                background: ai.color + '08', border: `1px solid ${ai.color}20`,
                borderRadius: 12, padding: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: ai.color + '18', border: `1px solid ${ai.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon name={ai.icon} size={13} style={{ color: ai.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: ai.color }}>{ai.name}</div>
                    <div style={{ fontSize: 10, color: SILVER, opacity: 0.7 }}>{ai.sub}</div>
                  </div>
                </div>
                <p style={{ fontSize: 11.5, color: '#8b9ab5', lineHeight: 1.55, margin: 0 }}>{ai.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFACTOR TARGETS ─────────────────────────────── */}
      <section style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 48px) clamp(40px, 6vw, 80px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={badge(GREEN, GREEN + '12')}>
            <Icon name="Repeat" size={11} /> Reusable Base System
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginTop: 12, marginBottom: 6 }}>
            Refactorable Into Any Domain
          </h3>
          <p style={{ fontSize: 12, color: '#8b9ab5', maxWidth: 480, margin: '0 auto' }}>
            This base OS can be refactored into any sector-specific product.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            'Learning Platform','Coaching System','Patient Support System',
            'Employee Onboarding','Training Portal','Wellbeing Tracker',
            'Compliance Learning System','Progress Monitoring Dashboard',
            'Recovery Support Platform','Evidence-Based Progress Tracker',
          ].map(t => (
            <Pill key={t} label={t} color={SILVER} />
          ))}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{
        borderTop: `1px solid ${BORDER2}`,
        padding: '24px clamp(20px, 5vw, 48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: GOLD }}>4P3X Learning &amp; Monitoring Base OS™</div>
          <div style={{ fontSize: 10, color: SILVER, opacity: 0.6, marginTop: 2 }}>
            Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
          </div>
        </div>
        <div style={{ fontSize: 10, color: '#4a5568', textAlign: 'right' }}>
          {isDemoMode
            ? 'Demo Mode Active — sample data only'
            : 'Live Mode — real data'}
        </div>
      </footer>

    </div>
  )
}
