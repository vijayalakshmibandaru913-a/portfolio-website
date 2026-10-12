import React, { useRef, useMemo, Component } from 'react';
import type { ErrorInfo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Particle Field surrounding the core
function ParticleField({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00f0ff');
    const violet = new THREE.Color('#a855f7');
    const emerald = new THREE.Color('#10b981');

    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random();
      const c = mixed < 0.4 ? cyan : mixed < 0.75 ? violet : emerald;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Orbiting Ring with Pulsing Data Nodes
function OrbitRing({
  radius,
  tiltX = 0,
  tiltZ = 0,
  speed = 0.5,
  color = '#00f0ff',
}: {
  radius: number;
  tiltX?: number;
  tiltZ?: number;
  speed?: number;
  color?: string;
}) {
  const ringRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() * speed;
    if (ringRef.current) {
      ringRef.current.rotation.y = elapsed;
    }
    if (satelliteRef.current) {
      const angle = elapsed * 1.5;
      satelliteRef.current.position.x = Math.cos(angle) * radius;
      satelliteRef.current.position.z = Math.sin(angle) * radius;
    }
  });

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      {/* Outer Ring Line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbiting Satellite Data Node */}
      <group ref={ringRef}>
        <mesh ref={satelliteRef}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </group>
  );
}

// Central Core Sphere & Icosahedron Wireframe
function CoreNexus() {
  const outerWireRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerWireRef.current) {
      outerWireRef.current.rotation.x = t * 0.2;
      outerWireRef.current.rotation.y = t * 0.35;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -t * 0.3;
      innerMeshRef.current.rotation.z = t * 0.25;
    }
    if (innerCoreRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.08;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Glowing Inner Energy Sphere */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#3b82f6"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Middle Holographic Dodecahedron */}
      <mesh ref={innerMeshRef}>
        <dodecahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          emissive="#9333ea"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Outer Cybernetic Icosahedron Wireframe */}
      <mesh ref={outerWireRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// Floating Scene Container
function DevOpsScene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, -4, -3]} intensity={2.5} color="#a855f7" />
      <pointLight position={[4, 4, 3]} intensity={3} color="#00f0ff" />

      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        <CoreNexus />
        <OrbitRing radius={2.4} tiltX={0.4} tiltZ={0.2} speed={0.8} color="#00f0ff" />
        <OrbitRing radius={3.1} tiltX={-0.6} tiltZ={-0.4} speed={0.5} color="#a855f7" />
        <OrbitRing radius={3.8} tiltX={0.2} tiltZ={0.7} speed={0.35} color="#10b981" />
        <ParticleField count={260} />
      </Float>
    </>
  );
}

// Graceful WebGL Error Boundary
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Context Warning:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Pure CSS Holographic Fallback Sphere
export function CSSHolographicSphere() {
  return (
    <div className="css-holo-core-container">
      <div className="css-holo-sphere">
        <div className="css-holo-ring css-holo-ring-1"></div>
        <div className="css-holo-ring css-holo-ring-2"></div>
        <div className="css-holo-ring css-holo-ring-3"></div>
        <div className="css-holo-inner-glow"></div>
      </div>
    </div>
  );
}

export function DevOpsCore3D() {
  return (
    <div className="devops-3d-canvas-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <WebGLErrorBoundary fallback={<CSSHolographicSphere />}>
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          <DevOpsScene />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}

export default DevOpsCore3D;
