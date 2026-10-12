import { useState } from 'react';
import {
  FolderGit2,
  Layers,
  CheckCircle2,
  ExternalLink,
  Workflow,
  Info,
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import type { ProjectItem } from '../../types/portfolio';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Resume Featured' | 'DevOps Lab Project'>('all');
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <div className="section-badge-wrap">
            <FolderGit2 size={14} />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="section-title">
            DevOps & Full-Stack <span className="section-title-highlight">Projects</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Production-grade systems demonstrating containerization, automated CI/CD workflows, Infrastructure as Code, and resilient microservices architecture.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: selectedFilter === 'all' ? '1px solid var(--cyan-400)' : '1px solid var(--border-subtle)',
              background: selectedFilter === 'all' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedFilter === 'all' ? 'var(--cyan-400)' : 'var(--text-secondary)',
              boxShadow: selectedFilter === 'all' ? '0 0 12px rgba(0, 240, 255, 0.2)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            All Projects ({projects.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('Resume Featured')}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: selectedFilter === 'Resume Featured' ? '1px solid var(--emerald-400)' : '1px solid var(--border-subtle)',
              background: selectedFilter === 'Resume Featured' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedFilter === 'Resume Featured' ? 'var(--emerald-400)' : 'var(--text-secondary)',
              boxShadow: selectedFilter === 'Resume Featured' ? '0 0 12px rgba(16, 185, 129, 0.2)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Resume Featured (Production)
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('DevOps Lab Project')}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: selectedFilter === 'DevOps Lab Project' ? '1px solid var(--purple-400)' : '1px solid var(--border-subtle)',
              background: selectedFilter === 'DevOps Lab Project' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedFilter === 'DevOps Lab Project' ? 'var(--purple-400)' : 'var(--text-secondary)',
              boxShadow: selectedFilter === 'DevOps Lab Project' ? '0 0 12px rgba(168, 85, 247, 0.2)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            DevOps Architecture Labs
          </button>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredProjects.map((project) => {
            const isResumeFeatured = project.category.includes('Resume');

            return (
              <div
                key={project.id}
                className="glass-panel"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                <div>
                  {/* Status & Pipeline Badges */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        background: isResumeFeatured
                          ? 'rgba(16, 185, 129, 0.12)'
                          : 'rgba(168, 85, 247, 0.12)',
                        border: isResumeFeatured
                          ? '1px solid rgba(16, 185, 129, 0.3)'
                          : '1px solid rgba(168, 85, 247, 0.3)',
                        color: isResumeFeatured
                          ? 'var(--emerald-400)'
                          : 'var(--purple-400)',
                        fontWeight: 600,
                      }}
                    >
                      {project.status}
                    </span>

                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--cyan-400)',
                      }}
                    >
                      <Layers size={14} />
                      <span>Docker Ready</span>
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '12px',
                      color: 'var(--text-primary)',
                      lineHeight: 1.35,
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '18px',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Key Highlights Checklist */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '20px',
                    }}
                  >
                    {project.features.slice(0, 3).map((feature, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '0.82rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4,
                        }}
                      >
                        <CheckCircle2 size={14} color="var(--cyan-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '18px',
                    }}
                  >
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setModalProject(project)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--cyan-400)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    <Info size={14} />
                    <span>View Architecture</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-primary)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <GithubIcon size={14} />
                    <span>Repository</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Specs Modal */}
        {modalProject && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(3, 7, 18, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setModalProject(null)}
          >
            <div
              className="glass-panel"
              style={{
                maxWidth: '680px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                padding: '32px',
                background: 'rgba(11, 15, 29, 0.96)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Workflow size={18} color="var(--cyan-400)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--cyan-400)', fontWeight: 600 }}>
                    SYSTEM ARCHITECTURE BREAKDOWN
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setModalProject(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>
                {modalProject.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px' }}>
                {modalProject.description}
              </p>

              {/* Architecture Blueprint Card */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '10px',
                  background: 'rgba(0, 240, 255, 0.05)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  marginBottom: '24px',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan-400)', fontWeight: 700, marginBottom: '8px' }}>
                  TOPOLOGY & DATA FLOW:
                </div>
                <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                  {modalProject.architectureSummary}
                </p>
              </div>

              {/* CI/CD Pipeline Configuration */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Continuous Integration Strategy:
                </div>
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: 'var(--emerald-400)',
                  }}
                >
                  {modalProject.ciPipeline}
                </div>
              </div>

              {/* All Features Checklist */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase' }}>
                  All Architectural Features:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {modalProject.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={16} color="var(--emerald-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalProject(null)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Close
                </button>
                <a
                  href={modalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  <GithubIcon size={14} />
                  <span>Open Repo</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
