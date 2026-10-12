import { ArrowRight, Terminal, Cloud, Layers, ShieldCheck, Play } from 'lucide-react';
import { DevOpsCore3D } from '../3d/DevOpsCore3D';
import type { ProfileData } from '../../types/portfolio';

interface HeroSectionProps {
  profile: ProfileData;
  onOpenTerminal: () => void;
  onTriggerPipeline: () => void;
}

export function HeroSection({ profile, onOpenTerminal, onTriggerPipeline }: HeroSectionProps) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--header-height) + 40px)',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '48px',
          }}
        >
          {/* Left Column: Hero Copy & Actions */}
          <div style={{ zIndex: 10 }}>
            {/* Status Radar Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 16px',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                marginBottom: '24px',
              }}
            >
              <span className="pulse-dot" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--emerald-400)',
                  letterSpacing: '0.04em',
                }}
              >
                AVAILABLE FOR DEVOPS & FULL-STACK ROLES
              </span>
            </div>

            {/* Main Heading */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: '16px',
              }}
            >
              Building Resilient <br />
              <span className="section-title-highlight">Cloud Systems.</span>
            </h1>

            {/* Role Title */}
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                fontWeight: 500,
                color: 'var(--cyan-400)',
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}
            >
              &gt; {profile.title}
            </h2>

            {/* Narrative Subheadline */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.15vw, 1.15rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                maxWidth: '560px',
                marginBottom: '36px',
              }}
            >
              Specialized in Git workflows, multi-stage Docker containerization, Azure Data Factory pipelines, and zero-downtime deployment automation. Bridging software engineering with production infrastructure.
            </p>

            {/* Interactive CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                marginBottom: '48px',
              }}
            >
              <button
                type="button"
                onClick={onTriggerPipeline}
                className="btn-primary"
              >
                <Play size={16} fill="currentColor" />
                <span>Simulate CI/CD Pipeline</span>
              </button>

              <a href="#projects" className="btn-secondary">
                <span>View Projects</span>
                <ArrowRight size={16} />
              </a>

              <button
                type="button"
                onClick={onOpenTerminal}
                className="btn-outline-terminal"
              >
                <Terminal size={15} />
                <span>CLI Terminal</span>
              </button>
            </div>

            {/* Core Metrics Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
                maxWidth: '580px',
              }}
            >
              <div
                className="glass-panel"
                style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.55)' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--cyan-400)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  2+ Yrs
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Enterprise Exp
                </div>
              </div>

              <div
                className="glass-panel"
                style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.55)' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--emerald-400)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  7-Stage
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Automated CI/CD
                </div>
              </div>

              <div
                className="glass-panel"
                style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.55)' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--purple-400)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  100%
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Container Parity
                </div>
              </div>

              <div
                className="glass-panel"
                style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.55)' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--amber-400)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  Azure
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Data Pipelines
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D DevOps Cyber Core Canvas & Interactive HUD Overlay */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '520px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 3D WebGL Canvas */}
            <DevOpsCore3D />

            {/* Floating Cyber Holographic Pill 1: Docker */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '12%',
                left: '4%',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(3, 7, 18, 0.75)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 240, 255, 0.15)',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'rgba(0, 240, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--cyan-400)',
                }}
              >
                <Layers size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  CONTAINERIZATION
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Docker Multi-Stage
                </div>
              </div>
            </div>

            {/* Floating Cyber Holographic Pill 2: Azure Data Factory */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                bottom: '14%',
                right: '4%',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(3, 7, 18, 0.75)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(168, 85, 247, 0.15)',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'rgba(168, 85, 247, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--purple-400)',
                }}
              >
                <Cloud size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  DATA PIPELINES
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Azure Data Factory
                </div>
              </div>
            </div>

            {/* Floating Cyber Holographic Pill 3: Zero Downtime */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '72%',
                left: '6%',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(3, 7, 18, 0.75)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                pointerEvents: 'none',
              }}
            >
              <ShieldCheck size={16} color="var(--emerald-400)" />
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--emerald-400)', fontWeight: 600 }}>
                Zero-Downtime Rollouts
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
