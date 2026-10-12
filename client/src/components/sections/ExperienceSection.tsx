import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Building } from 'lucide-react';
import type { ExperienceItem, Education } from '../../types/portfolio';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  education: Education;
}

export function ExperienceSection({ experience, education }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <div className="section-badge-wrap">
            <Briefcase size={14} />
            <span>Career Milestones</span>
          </div>
          <h2 className="section-title">
            Professional <span className="section-title-highlight">Experience</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Proven industry track record building scalable enterprise services, managing Git workflows, automating containerized runtimes, and engineering cloud data ETL pipelines.
          </p>
        </div>

        {/* Experience Timeline */}
        <div style={{ maxWidth: '900px', margin: '0 auto 56px', position: 'relative' }}>
          {/* Vertical Timeline Guide Line */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: '16px',
              bottom: '16px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--cyan-400), var(--purple-400), rgba(255, 255, 255, 0.05))',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {experience.map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  paddingLeft: '56px',
                }}
              >
                {/* Timeline Marker Node */}
                <div
                  style={{
                    position: 'absolute',
                    left: '11px',
                    top: '24px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: item.isCurrent ? '#00f0ff' : '#a855f7',
                    boxShadow: item.isCurrent ? '0 0 16px #00f0ff' : '0 0 16px #a855f7',
                    border: '3px solid #030712',
                    zIndex: 2,
                  }}
                />

                {/* Experience Card */}
                <div className="glass-panel" style={{ padding: '32px' }}>
                  {/* Role Header */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {item.role}
                        </h3>
                        {item.isCurrent && (
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.68rem',
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              background: 'rgba(16, 185, 129, 0.15)',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              color: 'var(--emerald-400)',
                              fontWeight: 700,
                            }}
                          >
                            CURRENT
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: 'var(--cyan-400)',
                          fontSize: '1rem',
                          fontWeight: 600,
                        }}
                      >
                        <Building size={16} />
                        <span>{item.company}</span>
                        {item.projectOrDomain && (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 400 }}>
                            • {item.projectOrDomain}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={13} color="var(--cyan-400)" />
                        <span>{item.period}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={13} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Responsibilities */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      marginBottom: '20px',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '18px',
                    }}
                  >
                    {item.responsibilities.map((resp, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.55,
                        }}
                      >
                        <CheckCircle2 size={15} color="var(--cyan-400)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Card */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            className="glass-panel"
            style={{
              padding: '28px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              background: 'rgba(11, 15, 29, 0.7)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--cyan-400)',
                }}
              >
                <GraduationCap size={24} />
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan-400)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Formal Academic Degree
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {education.degree}
                </h4>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  {education.institution} • {education.location}
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--cyan-400)',
                fontWeight: 600,
              }}
            >
              Class of {education.year}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
