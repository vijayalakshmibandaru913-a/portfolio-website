import { Award, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import type { CertificationItem } from '../../types/portfolio';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <div className="section-badge-wrap">
            <Award size={14} />
            <span>Verified Credentials</span>
          </div>
          <h2 className="section-title">
            Certifications & <span className="section-title-highlight">Accreditations</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Validated industry knowledge in cloud data architecture, Azure fundamentals, and full-stack software development.
          </p>
        </div>

        {/* Certifications Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {certifications.map((cert) => {
            const isCompleted = cert.status === 'Completed';

            return (
              <div
                key={cert.id}
                className="glass-panel"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isCompleted
                    ? '1px solid rgba(16, 185, 129, 0.35)'
                    : '1px solid var(--border-subtle)',
                  boxShadow: isCompleted
                    ? 'var(--shadow-md), 0 0 20px rgba(16, 185, 129, 0.12)'
                    : 'var(--shadow-md)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: isCompleted ? 'rgba(16, 185, 129, 0.12)' : 'rgba(168, 85, 247, 0.12)',
                        border: isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(168, 85, 247, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isCompleted ? 'var(--emerald-400)' : 'var(--purple-400)',
                      }}
                    >
                      {isCompleted ? <ShieldCheck size={20} /> : <Clock size={20} />}
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        background: isCompleted ? 'rgba(16, 185, 129, 0.12)' : 'rgba(168, 85, 247, 0.12)',
                        color: isCompleted ? 'var(--emerald-400)' : 'var(--purple-400)',
                        border: isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(168, 85, 247, 0.3)',
                        fontWeight: 700,
                      }}
                    >
                      {cert.status.toUpperCase()}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                      color: 'var(--text-primary)',
                      lineHeight: 1.35,
                    }}
                  >
                    {cert.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--cyan-400)',
                      marginBottom: '16px',
                      fontWeight: 500,
                    }}
                  >
                    Issuer: {cert.issuer}
                  </div>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                    }}
                  >
                    {cert.description}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '16px',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: isCompleted ? 'var(--emerald-400)' : 'var(--text-muted)',
                  }}
                >
                  <CheckCircle2 size={14} />
                  <span>{isCompleted ? 'Verified Professional Accreditation' : 'Target Completion: In Progress'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CertificationsSection;
