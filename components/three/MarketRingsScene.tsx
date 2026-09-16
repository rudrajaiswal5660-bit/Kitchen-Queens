"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RingProps {
  radius: number;
  tube: number;
  color: string;
  label: string;
  value: string;
  yPos: number;
  rotSpeed: number;
}

function Ring({ radius, tube, color, label, value, yPos, rotSpeed }: RingProps) {
  const ref = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * rotSpeed;
    ref.current.rotation.x += delta * rotSpeed * 0.3;
  });

  return (
    <group position={[0, yPos, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, tube, 32, 100]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.2}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Label text */}
      <Text
        position={[0, radius + tube + 0.15, 0]}
        fontSize={0.18}
        color={color}
        anchorX="center"
        anchorY="bottom"
      >
        {label}
      </Text>
      <Text
        position={[0, radius + tube + 0.35, 0]}
        fontSize={0.26}
        color={color}
        anchorX="center"
        anchorY="bottom"
      >
        {value}
      </Text>
    </group>
  );
}

function MarketScene() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.8} color="#FFF8F0" />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FFE4CC" />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#CCE8FF" />

      <group ref={groupRef}>
        {/* TAM — outermost */}
        <Ring
          radius={2.2}
          tube={0.06}
          color="#C0392B"
          label="TAM"
          value="$6.2B"
          yPos={0}
          rotSpeed={0.3}
        />
        {/* SAM */}
        <Ring
          radius={1.5}
          tube={0.07}
          color="#E67E22"
          label="SAM"
          value="$1.8B"
          yPos={0}
          rotSpeed={-0.4}
        />
        {/* SOM — innermost */}
        <Ring
          radius={0.8}
          tube={0.09}
          color="#27AE60"
          label="SOM"
          value="$120M"
          yPos={0}
          rotSpeed={0.5}
        />
        {/* Center glow sphere */}
        <mesh>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial
            color="#F39C12"
            emissive="#F39C12"
            emissiveIntensity={0.8}
            metalness={0}
            roughness={0.3}
          />
        </mesh>
      </group>
    </>
  );
}

export function MarketRingsScene() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <MarketScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
