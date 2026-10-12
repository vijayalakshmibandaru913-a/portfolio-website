import { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight, Cpu } from 'lucide-react';
import type { HealthData } from '../../types/portfolio';

interface NavbarProps {
  onOpenTerminal: () => void;
  health: { data: HealthData | null; latencyMs: number; isOnline: boolean };
}

export function Navbar({ onOpenTerminal, health }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'pipeline', 'projects', 'skills', 'experience', 'certifications', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'CI/CD Pipeline', href: '#pipeline', id: 'pipeline' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skill Matrix', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: isScrolled
          ? 'rgba(3, 7, 18, 0.88)'
          : 'rgba(3, 7, 18, 0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled
          ? '1px solid rgba(255, 255, 255, 0.08)'
          : '1px solid rgba(255, 255, 255, 0.03)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 24px',
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(168, 85, 247, 0.2))',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan-400)',
              boxShadow: '0 0 16px rgba(0, 240, 255, 0.2)',
            }}
          >
            <Cpu size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              VIJAYA <span style={{ color: 'var(--cyan-400)' }}>BANDARU</span>
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              DevOps & Full-Stack Eng
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              style={{
                fontSize: '0.9rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                color: activeSection === link.id ? 'var(--cyan-400)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '6px 0',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    borderRadius: '2px',
                    background: 'linear-gradient(90deg, var(--cyan-400), var(--purple-400))',
                    boxShadow: '0 0 8px var(--cyan-400)',
                  }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right Action Widgets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Live Telemetry Ping Pill */}
          <div
            title={`Backend Status: ${health.isOnline ? 'Online' : 'Degraded'} (${health.latencyMs}ms)`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px',
              borderRadius: '9999px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: health.isOnline ? 'var(--emerald-400)' : 'var(--amber-400)',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: health.isOnline ? 'var(--emerald-400)' : 'var(--amber-400)',
                boxShadow: health.isOnline ? '0 0 8px var(--emerald-400)' : '0 0 8px var(--amber-400)',
              }}
            />
            <span style={{ display: 'none' }} className="status-text-full">
              API {health.latencyMs}ms
            </span>
            <span className="status-text-short">API 200 OK</span>
          </div>

          {/* Interactive CLI Trigger */}
          <button
            type="button"
            onClick={onOpenTerminal}
            className="btn-outline-terminal"
            style={{ padding: '7px 13px' }}
            title="Open Interactive DevOps CLI"
          >
            <Terminal size={14} />
            <span style={{ display: 'none' }} className="terminal-btn-label">CLI</span>
          </button>

          {/* Resume / Contact Button */}
          <a
            href="#contact"
            className="btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '0.85rem',
              display: 'none',
            }}
            className-desktop="desktop-cta"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
            className="mobile-menu-trigger"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(3, 7, 18, 0.98)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          className="mobile-drawer"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: activeSection === link.id ? 'var(--cyan-400)' : 'var(--text-secondary)',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ paddingTop: '12px', display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="btn-outline-terminal"
              style={{ flex: 1 }}
            >
              <Terminal size={16} />
              <span>Launch Terminal CLI</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary"
              style={{ flex: 1 }}
            >
              <span>Contact</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}

      {/* Media Query Styles for Navbar */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-trigger {
            display: none !important;
          }
          .status-text-full {
            display: inline !important;
          }
          .status-text-short {
            display: none !important;
          }
          .terminal-btn-label {
            display: inline !important;
          }
          [className-desktop="desktop-cta"] {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;
