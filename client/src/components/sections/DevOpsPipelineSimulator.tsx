import { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Terminal,
  Activity,
  GitCommit,
  GitPullRequest,
  CheckSquare,
  Box,
  Layers,
  Server,
  Radio,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { DevOpsStage } from '../../types/portfolio';

interface PipelineSimulatorProps {
  stages: DevOpsStage[];
  isTriggeredExternally?: boolean;
}

export function DevOpsPipelineSimulator({ stages, isTriggeredExternally }: PipelineSimulatorProps) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '⚡ DevOps CI/CD Automation Engine Initialized.',
    'System ready. Select a stage or click "Run Pipeline Simulation" to execute the full deployment cycle.',
  ]);

  const logContainerRef = useRef<HTMLDivElement>(null);

  // Trigger external run if triggered from Hero CTA
  useEffect(() => {
    if (isTriggeredExternally && !isRunning) {
      handleRunSimulation();
    }
  }, [isTriggeredExternally]);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const activeStage = stages[activeStageIndex] || stages[0];

  const stageIcons = [
    <GitCommit size={18} key="1" />,
    <GitPullRequest size={18} key="2" />,
    <CheckSquare size={18} key="3" />,
    <Box size={18} key="4" />,
    <Layers size={18} key="5" />,
    <Server size={18} key="6" />,
    <Radio size={18} key="7" />,
  ];

  const handleRunSimulation = () => {
    if (isRunning) return;

    setIsRunning(true);
    setCompletedStages([]);
    setCurrentProgress(0);
    setActiveStageIndex(0);

    const simulationLogs: { stageIndex: number; messages: string[]; progress: number }[] = [
      {
        stageIndex: 0,
        progress: 14,
        messages: [
          '🚀 [Stage 1] Initializing Git Feature Branch...',
          'git checkout -b feature/erp-salary-computation',
          'git commit -m "feat(erp): automated employee salary calculation"',
          '✔ Commit verified with pre-commit hook (No hardcoded secrets detected)',
        ],
      },
      {
        stageIndex: 1,
        progress: 28,
        messages: [
          '🔀 [Stage 2] Opening Pull Request #42 against main...',
          'Evaluating branch protection policies...',
          '✔ Required review checks passed (1 Senior Approver)',
          '✔ Branch is up-to-date with base branch',
        ],
      },
      {
        stageIndex: 2,
        progress: 43,
        messages: [
          '🧪 [Stage 3] Spawning isolated CI container runner...',
          'Running test suites: npm test -- --coverage',
          '✔ 14/14 unit tests passed (0 failures, 100% assertions)',
          '✔ Integration test suite passed against ERP mock service',
        ],
      },
      {
        stageIndex: 3,
        progress: 57,
        messages: [
          '🐳 [Stage 4] Starting Docker Multi-Stage Build...',
          'Step 1/8: FROM node:22-alpine AS builder',
          'Step 2/8: Cached layers utilized for npm dependencies',
          'Step 6/8: COPY --from=builder /app/dist ./dist',
          '✔ Minified production image created: 64MB (Distroless non-root user)',
        ],
      },
      {
        stageIndex: 4,
        progress: 71,
        messages: [
          '📦 [Stage 5] Authenticating with Container Registry...',
          'Tagging image: ghcr.io/vijayabandaru/erp-backend:sha-7a8f9b',
          'Pushing layers to Container Registry...',
          '✔ Cryptographic digest sha256:d8a93... successfully verified',
        ],
      },
      {
        stageIndex: 5,
        progress: 86,
        messages: [
          '🌐 [Stage 6] Initiating Zero-Downtime Rolling Update on Kubernetes...',
          'kubectl apply -f k8s/deployment.yaml',
          'Spawning Replica 1/3 with readiness probe check (/api/health)...',
          'Readiness HTTP 200 OK received! Terminating old replica...',
          '✔ All 3 replicas transitioned with 0% downtime and 0 dropped connections!',
        ],
      },
      {
        stageIndex: 6,
        progress: 100,
        messages: [
          '📊 [Stage 7] Activating Live Observability & Telemetry...',
          'Prometheus metric scrapers active on /api/health',
          'P99 Latency: 18ms | Error Rate: 0.00% | CPU: 12% | RAM: 58MB',
          '🎉 CI/CD Pipeline Executed Successfully! Production is Healthy and Stable.',
        ],
      },
    ];

    setLogs(['⚡ Starting Live CI/CD Pipeline Simulation...']);

    let step = 0;
    const interval = setInterval(() => {
      if (step < simulationLogs.length) {
        const currentSim = simulationLogs[step];
        setActiveStageIndex(currentSim.stageIndex);
        setCurrentProgress(currentSim.progress);
        setCompletedStages((prev) => [...prev, currentSim.stageIndex]);
        setLogs((prev) => [...prev, ...currentSim.messages]);
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#00f0ff', '#a855f7', '#10b981'],
          });
        } catch {
          // ignore confetti if unsupported
        }
      }
    }, 1200);
  };

  const handleCopyCode = () => {
    if (activeStage?.codeSnippet) {
      navigator.clipboard.writeText(activeStage.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <section id="pipeline" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <div className="section-badge-wrap">
            <Activity size={14} />
            <span>Interactive Architecture Simulation</span>
          </div>
          <h2 className="section-title">
            Automated <span className="section-title-highlight">CI/CD Pipeline</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Experience the 7-stage automated deployment workflow engineered for high reliability, zero-downtime rollouts, and container security.
          </p>
        </div>

        {/* Pipeline Controls & Execution Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '20px 24px',
            marginBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="btn-primary"
              style={{
                opacity: isRunning ? 0.7 : 1,
                cursor: isRunning ? 'not-allowed' : 'pointer',
              }}
            >
              {isRunning ? (
                <>
                  <RotateCcw size={16} className="spin-animation" />
                  <span>Simulating ({currentProgress}%)</span>
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" />
                  <span>Run Pipeline Simulation</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setCompletedStages([]);
                setCurrentProgress(0);
                setActiveStageIndex(0);
                setLogs(['⚡ Pipeline status reset. Ready for simulation.']);
              }}
              disabled={isRunning}
              className="btn-secondary"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>

          {/* Progress Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '240px' }}>
            <div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${currentProgress}%`,
                  background: 'linear-gradient(90deg, var(--cyan-400), var(--emerald-400))',
                  boxShadow: '0 0 10px var(--cyan-400)',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--cyan-400)', fontWeight: 600 }}>
              {currentProgress}%
            </span>
          </div>
        </div>

        {/* 7-Stage Stepper Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {stages.map((stage, idx) => {
            const isCompleted = completedStages.includes(idx);
            const isCurrent = activeStageIndex === idx;

            return (
              <button
                type="button"
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                style={{
                  padding: '16px 12px',
                  borderRadius: '12px',
                  background: isCurrent
                    ? 'rgba(0, 240, 255, 0.12)'
                    : isCompleted
                    ? 'rgba(16, 185, 129, 0.08)'
                    : 'rgba(15, 23, 42, 0.6)',
                  border: isCurrent
                    ? '1px solid var(--cyan-400)'
                    : isCompleted
                    ? '1px solid rgba(16, 185, 129, 0.4)'
                    : '1px solid var(--border-subtle)',
                  boxShadow: isCurrent ? '0 0 16px rgba(0, 240, 255, 0.2)' : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      color: isCurrent
                        ? 'var(--cyan-400)'
                        : isCompleted
                        ? 'var(--emerald-400)'
                        : 'var(--text-muted)',
                    }}
                  >
                    {stageIcons[idx]}
                  </div>

                  {isCompleted ? (
                    <CheckCircle2 size={16} color="var(--emerald-400)" />
                  ) : (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      #{idx + 1}
                    </span>
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      color: isCurrent ? 'var(--text-primary)' : 'var(--text-secondary)',
                      lineHeight: 1.3,
                    }}
                  >
                    {stage.name.replace(/^\d+\.\s*/, '')}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: isCompleted
                        ? 'var(--emerald-400)'
                        : isCurrent
                        ? 'var(--cyan-400)'
                        : 'var(--text-muted)',
                      marginTop: '4px',
                    }}
                  >
                    {isCompleted ? 'VERIFIED' : isCurrent ? 'ACTIVE' : 'READY'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Detailed Inspector Panel + Live Terminal Logs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Left Panel: Selected Stage Specs & Production Details */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: 'rgba(0, 240, 255, 0.1)',
                  color: 'var(--cyan-400)',
                  fontWeight: 600,
                }}
              >
                STAGE {activeStageIndex + 1} OF {stages.length}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Production Standards
              </span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>
              {activeStage.name}
            </h3>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
              {activeStage.shortDescription}
            </p>

            {/* Importance Alert */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '8px',
                background: 'rgba(168, 85, 247, 0.08)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                marginBottom: '24px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--purple-400)', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>
                Why This Matters in Enterprise DevOps:
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {activeStage.importance}
              </div>
            </div>

            {/* Tools Used */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Core Tooling & Technologies:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {activeStage.tools.map((tool) => (
                  <span key={tool} className="tech-tag">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Common Failures & Remediation */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: 'var(--amber-400)' }}>
                <AlertTriangle size={15} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Failure Scenarios & Troubleshooting
                </span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {activeStage.commonFailures.map((fail, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--rose-400)' }}>✖</span>
                    <span>{fail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel: Production Code Snippet & Live Build Logs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Production Code Snippet Box */}
            <div className="glass-panel" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  padding: '12px 18px',
                  background: 'rgba(3, 7, 18, 0.7)',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--cyan-400)',
                      marginLeft: '8px',
                      fontWeight: 600,
                    }}
                  >
                    {activeStage.codeSnippetTitle}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: copiedCode ? 'var(--emerald-400)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                  }}
                >
                  {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied' : 'Copy Spec'}</span>
                </button>
              </div>

              <pre
                style={{
                  padding: '18px',
                  margin: 0,
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  color: '#e2e8f0',
                  background: 'rgba(2, 6, 23, 0.95)',
                  overflowX: 'auto',
                  maxHeight: '260px',
                }}
              >
                <code>{activeStage.codeSnippet}</code>
              </pre>
            </div>

            {/* Simulated Live Console Logs */}
            <div
              className="glass-panel scanline-effect"
              style={{
                flex: 1,
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(2, 6, 23, 0.92)',
              }}
            >
              <div
                style={{
                  padding: '10px 16px',
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Terminal size={14} color="var(--cyan-400)" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em',
                  }}
                >
                  LIVE CI/CD RUNNER CONSOLE STREAM
                </span>
              </div>

              <div
                ref={logContainerRef}
                style={{
                  padding: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  color: '#a7f3d0',
                  lineHeight: 1.6,
                  maxHeight: '220px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                {logs.map((log, index) => (
                  <div key={index} style={{ wordBreak: 'break-all' }}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default DevOpsPipelineSimulator;
