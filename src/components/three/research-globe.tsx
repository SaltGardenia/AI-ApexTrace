"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PALETTE = ["#7c5cff", "#38bdf8", "#34d399", "#fbbf24", "#ec4899", "#22d3ee"];

function fibonacciSphere(count: number, radius: number) {
  const positions: number[] = [];
  const colors: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions.push(
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    );
    const c = new THREE.Color(PALETTE[i % PALETTE.length]);
    colors.push(c.r, c.g, c.b);
  }
  return { positions, colors };
}

function Constellation() {
  const group = React.useRef<THREE.Group>(null);
  const count = 260;
  const radius = 2.4;
  const { positions, colors } = React.useMemo(
    () => fibonacciSphere(count, radius),
    [],
  );
  const geometry = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>
      <mesh>
        <icosahedronGeometry args={[radius * 0.72, 1]} />
        <meshBasicMaterial color="#7c5cff" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export default function ResearchGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Constellation />
      </Float>
    </Canvas>
  );
}
