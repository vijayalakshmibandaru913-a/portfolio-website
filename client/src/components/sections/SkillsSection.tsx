import { useState } from 'react';
import {
  Cpu,
  Cloud,
  Layout,
  Server,
  Database,
  GitBranch,
  Search,
  CheckCircle,
  Compass,
} from 'lucide-react';
import type { SkillCategory, RoadmapItem } from '../../types/portfolio';

interface SkillsSectionProps {
  categories: SkillCategory[];
  roadmap: RoadmapItem[];
}

export function SkillsSection({ categories, roadmap }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    'devops-cloud': <Cloud size={18} />,
    'frontend': <Layout size={18} />,
    'backend': <Server size={18} />,
    'databases': <Database size={18} />,
    'software-engineering': <GitBranch size={18} />,
  };

  const filteredCategories = categories.filter((cat) => {
    if (selectedCategory === 'all') return true;
    return cat.id === selectedCategory;
  });

  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <div className="section-badge-wrap">
            <Cpu size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="section-title-highlight">Cloud Competencies</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Production-tested expertise spanning source control, container orchestration, cloud ETL pipelines, scalable backend microservices, and modern frontend architecture.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {/* Quick Search */}
          <div
            style={{
              maxWidth: '460px',
              margin: '0 auto',
              width: '100%',
              position: 'relative',
            }}
          >
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Docker, Azure, Java, React, SQL)..."
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                borderRadius: '9999px',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                outline: 'none',
                boxShadow: 'var(--shadow-sm)',
              }}
            />
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedCategory === 'all' ? '1px solid var(--cyan-400)' : '1px solid var(--border-subtle)',
                background: selectedCategory === 'all' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                color: selectedCategory === 'all' ? 'var(--cyan-400)' : 'var(--text-secondary)',
                boxShadow: selectedCategory === 'all' ? '0 0 12px rgba(0, 240, 255, 0.2)' : 'none',
              }}
            >
              <span>All Categories</span>
            </button>

            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedCategory === cat.id ? '1px solid var(--cyan-400)' : '1px solid var(--border-subtle)',
                  background: selectedCategory === cat.id ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                  color: selectedCategory === cat.id ? 'var(--cyan-400)' : 'var(--text-secondary)',
                  boxShadow: selectedCategory === cat.id ? '0 0 12px rgba(0, 240, 255, 0.2)' : 'none',
                }}
              >
                {categoryIcons[cat.id] || <Cpu size={16} />}
                <span>{cat.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '28px',
            marginBottom: '64px',
          }}
        >
          {filteredCategories.map((category) => {
            const visibleSkills = category.skills.filter((s) =>
              searchQuery.trim() === ''
                ? true
                : s.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery.trim() !== '' && visibleSkills.length === 0) {
              return null;
            }

            return (
              <div
                key={category.id}
                className="glass-panel"
                style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}
              >
                {/* Category Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--cyan-400)',
                    }}
                  >
                    {categoryIcons[category.id] || <Cpu size={18} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{category.category}</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {visibleSkills.length} Verified Competencies
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                  {category.description}
                </p>

                {/* Skills Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
                  {visibleSkills.map((skill) => {
                    const isProf = skill.level === 'Professional Experience';

                    return (
                      <div
                        key={skill.name}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: isProf ? 'rgba(0, 240, 255, 0.08)' : 'rgba(168, 85, 247, 0.08)',
                          border: isProf ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid rgba(168, 85, 247, 0.25)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          color: isProf ? 'var(--text-primary)' : '#e9d5ff',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <CheckCircle
                          size={12}
                          color={isProf ? 'var(--cyan-400)' : 'var(--purple-400)'}
                        />
                        <span style={{ fontWeight: 600 }}>{skill.name}</span>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            color: isProf ? 'var(--cyan-400)' : 'var(--purple-400)',
                            marginLeft: '4px',
                          }}
                        >
                          {isProf ? 'PRO' : 'EXP'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* DevOps Learning Roadmap Section */}
        <div
          className="glass-panel"
          style={{
            padding: '36px',
            background: 'rgba(11, 15, 29, 0.75)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--purple-400)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                <Compass size={14} />
                <span>Active Exploration & Engineering Roadmap</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                Continuous Growth in Cloud & Observability
              </h3>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
              }}
            >
              8 Cloud Technologies In Progress
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {roadmap.map((item) => (
              <div
                key={item.name}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '2px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {item.category}
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(168, 85, 247, 0.12)',
                    border: '1px solid rgba(168, 85, 247, 0.25)',
                    color: 'var(--purple-400)',
                    fontWeight: 600,
                  }}
                >
                  {item.status.includes('Lab') ? 'LAB' : 'LEARNING'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
