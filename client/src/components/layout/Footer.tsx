import { ArrowUp, Terminal, Cpu, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import type { ProfileData } from '../../types/portfolio';

interface FooterProps {
  profile: ProfileData;
  onOpenTerminal: () => void;
}

export function Footer({ profile, onOpenTerminal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(2, 6, 23, 0.95)',
        padding: '64px 0 32px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(0, 240, 255, 0.15)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--cyan-400)',
                }}
              >
                <Cpu size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem' }}>
                VIJAYA <span style={{ color: 'var(--cyan-400)' }}>BANDARU</span>
              </span>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              DevOps Engineer & Full-Stack Developer specializing in CI/CD pipeline automation, containerization, Azure Data Factory ETL, and reliable enterprise systems.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                }}
                title="GitHub"
              >
                <GithubIcon size={16} />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                }}
                title="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>

              <a
                href={`mailto:${profile.email}`}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                }}
                title="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--cyan-400)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.08em' }}>
              Architecture Sitemap
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <a href="#hero" style={{ color: 'var(--text-secondary)' }}>Overview & 3D Core</a>
              <a href="#pipeline" style={{ color: 'var(--text-secondary)' }}>7-Stage CI/CD Simulator</a>
              <a href="#projects" style={{ color: 'var(--text-secondary)' }}>Production Projects</a>
              <a href="#skills" style={{ color: 'var(--text-secondary)' }}>Skill Competencies</a>
              <a href="#experience" style={{ color: 'var(--text-secondary)' }}>Career Milestones</a>
              <a href="#certifications" style={{ color: 'var(--text-secondary)' }}>Certifications</a>
              <a href="#contact" style={{ color: 'var(--text-secondary)' }}>Direct Contact</a>
            </div>
          </div>

          {/* Cloud Stack Info */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--cyan-400)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.08em' }}>
              Application Platform
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
              <span className="tech-tag">React 19</span>
              <span className="tech-tag">Three.js</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">Docker</span>
              <span className="tech-tag">Express.js</span>
              <span className="tech-tag">Vite 8</span>
              <span className="tech-tag">REST API</span>
              <span className="tech-tag">Helmet</span>
            </div>

            <button
              type="button"
              onClick={onOpenTerminal}
              className="btn-outline-terminal"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Terminal size={14} />
              <span>Launch DevOps CLI Console</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Vijaya Bandaru. Engineered with precision.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Deployment Status: STABLE (99.9% Uptime)</span>

            <button
              type="button"
              onClick={scrollToTop}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--cyan-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              title="Return to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
