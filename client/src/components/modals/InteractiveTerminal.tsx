import { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import { fetchHealth } from '../../services/api';
import type { ProfileData } from '../../types/portfolio';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onTriggerPipeline: () => void;
}

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
}

export function InteractiveTerminal({
  isOpen,
  onClose,
  profile,
  onTriggerPipeline,
}: InteractiveTerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div>
          <div style={{ color: 'var(--cyan-400)', fontWeight: 700 }}>
            ╔══════════════════════════════════════════════════════════════════╗
            <br />
            ║ VIJAYA BANDARU DEVOPS CLI v2.4.0 (x86_64-linux-gnu)            ║
            <br />
            ║ Interactive Cloud & Infrastructure Control Interface            ║
            <br />
            ╚══════════════════════════════════════════════════════════════════╝
          </div>
          <div style={{ marginTop: '8px', color: '#94a3b8' }}>
            Type <span style={{ color: 'var(--cyan-400)', fontWeight: 700 }}>help</span> to inspect available commands. Try running <span style={{ color: 'var(--emerald-400)', fontWeight: 700 }}>health</span> or <span style={{ color: 'var(--purple-400)', fontWeight: 700 }}>pipeline</span>.
          </div>
        </div>
      ),
    },
  ]);

  const [commandList, setCommandList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setCommandList((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmed === '') {
      setHistory((prev) => [...prev, { command: '', output: '' }]);
      return;
    }

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'exit') {
      onClose();
      return;
    }

    let output: string | React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ color: 'var(--cyan-400)', fontWeight: 700 }}>Available Shell Commands:</div>
            <div>• <strong style={{ color: '#00f0ff' }}>help</strong> - List all available commands</div>
            <div>• <strong style={{ color: '#00f0ff' }}>whoami / bio</strong> - Show engineer profile & summary</div>
            <div>• <strong style={{ color: '#00f0ff' }}>skills</strong> - List core DevOps, Cloud & Full-Stack skills</div>
            <div>• <strong style={{ color: '#00f0ff' }}>projects</strong> - View featured architecture projects</div>
            <div>• <strong style={{ color: '#00f0ff' }}>pipeline</strong> - Run the 7-stage CI/CD simulation</div>
            <div>• <strong style={{ color: '#00f0ff' }}>health</strong> - Query live backend telemetry status</div>
            <div>• <strong style={{ color: '#00f0ff' }}>contact</strong> - Display contact coordinates & socials</div>
            <div>• <strong style={{ color: '#00f0ff' }}>clear</strong> - Clear console window</div>
            <div>• <strong style={{ color: '#00f0ff' }}>exit</strong> - Close terminal interface</div>
          </div>
        );
        break;

      case 'whoami':
      case 'bio':
      case 'profile':
        output = (
          <div style={{ color: '#e2e8f0', lineHeight: 1.6 }}>
            <div style={{ color: 'var(--cyan-400)', fontWeight: 700 }}>{profile.name} - {profile.title}</div>
            <div>Location: {profile.location}</div>
            <div>Experience: {profile.experienceYears}+ years in enterprise environments</div>
            <div style={{ marginTop: '6px' }}>{profile.subheadline}</div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div style={{ color: '#e2e8f0' }}>
            <div style={{ color: 'var(--cyan-400)', fontWeight: 700, marginBottom: '4px' }}>Technical Skill Matrix:</div>
            <div>• <span style={{ color: 'var(--emerald-400)' }}>DevOps & Cloud:</span> Git, GitHub Actions, Docker, Docker Compose, Azure DevOps, Azure Data Factory, CI/CD</div>
            <div>• <span style={{ color: 'var(--blue-400)' }}>Backend:</span> Node.js, Express, Core Java, Python, REST & SOAP APIs, JWT Auth</div>
            <div>• <span style={{ color: 'var(--purple-400)' }}>Frontend:</span> React.js, JavaScript (ES6+), HTML5, CSS3, Three.js, Responsive UI</div>
            <div>• <span style={{ color: 'var(--amber-400)' }}>Databases:</span> MySQL, MongoDB, SQL Querying, Relational Schema Modeling</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div style={{ color: '#e2e8f0' }}>
            <div style={{ color: 'var(--cyan-400)', fontWeight: 700, marginBottom: '4px' }}>Featured Projects:</div>
            <div>1. CI/CD Deployment Pipeline for MERN App (Docker, Compose, GitHub Actions)</div>
            <div>2. Task & Project Management App (Django REST, React, MySQL, Docker, JWT)</div>
            <div>3. Kubernetes-Based Microservices Deployment Platform (Helm, K8s, Prometheus)</div>
            <div>4. Terraform Infrastructure Automation Platform (IaC, Azure/AWS, CI Scanning)</div>
            <div>5. DevOps Monitoring & Incident Dashboard (Prometheus, Grafana, Alertmanager)</div>
          </div>
        );
        break;

      case 'pipeline':
        output = (
          <div style={{ color: 'var(--emerald-400)' }}>
            🚀 Triggering full 7-stage CI/CD pipeline simulation on main view...
          </div>
        );
        onTriggerPipeline();
        break;

      case 'health':
        const healthRes = await fetchHealth();
        output = (
          <div style={{ color: '#a7f3d0', fontFamily: 'var(--font-mono)' }}>
            <div>HTTP/1.1 200 OK</div>
            <div>Latency: {healthRes.latencyMs}ms</div>
            <pre style={{ margin: '6px 0 0', color: '#67e8f9' }}>
              {JSON.stringify(healthRes.data, null, 2)}
            </pre>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div style={{ color: '#e2e8f0' }}>
            <div>Email: <a href={`mailto:${profile.email}`} style={{ color: 'var(--cyan-400)' }}>{profile.email}</a></div>
            <div>Phone: <span style={{ color: 'var(--emerald-400)' }}>{profile.phone}</span></div>
            <div>LinkedIn: <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--blue-400)' }}>{profile.linkedin}</a></div>
            <div>Location: {profile.location}</div>
          </div>
        );
        break;

      default:
        output = (
          <div style={{ color: 'var(--rose-400)' }}>
            bash: {cmd}: command not found. Type 'help' to view available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIndex = historyIndex + 1 < commandList.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInputVal(commandList[commandList.length - 1 - nextIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandList[commandList.length - 1 - nextIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMaximized ? '0' : '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel scanline-effect"
        style={{
          width: isMaximized ? '100vw' : '860px',
          height: isMaximized ? '100vh' : '560px',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(2, 6, 23, 0.96)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 240, 255, 0.25)',
          borderRadius: isMaximized ? '0' : '14px',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div
          style={{
            padding: '12px 18px',
            background: 'rgba(15, 23, 42, 0.9)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginLeft: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--cyan-400)',
                fontWeight: 600,
              }}
            >
              <Terminal size={14} />
              <span>vijaya@devops-cluster: ~ (bash)</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
              title="Close Terminal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Console Log Output Scroll Area */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            lineHeight: 1.6,
            color: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, index) => (
            <div key={index}>
              {item.command && (
                <div style={{ display: 'flex', gap: '8px', color: 'var(--cyan-400)', fontWeight: 600 }}>
                  <span style={{ color: 'var(--emerald-400)' }}>vijaya@devops:~$</span>
                  <span>{item.command}</span>
                </div>
              )}
              {item.output && (
                <div style={{ marginTop: '4px', color: '#cbd5e1' }}>
                  {item.output}
                </div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: '12px 18px',
            background: 'rgba(15, 23, 42, 0.8)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--emerald-400)',
              fontWeight: 700,
            }}
          >
            vijaya@devops:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' and press Enter..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--cyan-400)',
            }}
          />
          <CornerDownLeft size={14} color="var(--text-muted)" />
        </div>
      </div>
    </div>
  );
}

export default InteractiveTerminal;
