"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Steam Particle ───────────────────────────────────────────
function SteamParticle({ offset }: { offset: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.y += delta * 0.4;
    ref.current.position.x += Math.sin(Date.now() * 0.001 + offset) * 0.002;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    if (!mat) return;
    mat.opacity = Math.max(0, (mat.opacity ?? 0) - delta * 0.12);
    if (mat.opacity <= 0) {
      ref.current.position.y = 1.4;
      mat.opacity = 0.35;
    }
  });

  return (
    <mesh ref={ref} position={[offset * 0.15, 1.4, 0]}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshStandardMaterial color="white" transparent opacity={0.35} />
    </mesh>
  );
}

// ─── Tiffin Body ─────────────────────────────────────────────
function TiffinModel({ normX, normY }: { normX: number; normY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  // Compartment colors (food)
  const foodColors = {
    dal:    "#F5A623",
    sabzi:  "#4CAF50",
    roti:   "#E8D5B7",
    rice:   "#F5F0E8",
  };

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    // Smooth mouse-driven rotation
    const targetRotY = normX * 0.4;
    const targetRotX = -normY * 0.2;
    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * 0.05;
    // Subtle idle float
    groupRef.current.position.y =
      Math.sin(Date.now() * 0.0008) * 0.06;
  });

  const metalMat = {
    color: "#C8C8C8",
    metalness: 0.9,
    roughness: 0.15,
    envMapIntensity: 1.5,
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ── Handle ─ */}
      <mesh position={[0, 1.55, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.22, 0.03, 8, 24, Math.PI]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* ── Lid ─ */}
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.62, 0.60, 0.14, 40]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* ── Lid rim ─ */}
      <mesh position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.63, 0.63, 0.04, 40]} />
        <meshStandardMaterial {...metalMat} color="#B0B0B0" />
      </mesh>

      {/* ── Compartment 1 (DAL) ─ */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.60, 0.60, 0.50, 40]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.36, 40]} />
        <meshStandardMaterial color={foodColors.dal} roughness={0.7} metalness={0} />
      </mesh>

      {/* ── Separator ring 1 ─ */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.63, 0.63, 0.04, 40]} />
        <meshStandardMaterial {...metalMat} color="#B0B0B0" />
      </mesh>

      {/* ── Compartment 2 (SABZI) ─ */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.60, 0.60, 0.50, 40]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.36, 40]} />
        <meshStandardMaterial color={foodColors.sabzi} roughness={0.7} metalness={0} />
      </mesh>

      {/* ── Separator ring 2 ─ */}
      <mesh position={[0, -0.11, 0]}>
        <cylinderGeometry args={[0.63, 0.63, 0.04, 40]} />
        <meshStandardMaterial {...metalMat} color="#B0B0B0" />
      </mesh>

      {/* ── Compartment 3 (RICE/ROTI) ─ */}
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.60, 0.60, 0.70, 40]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.55, 40]} />
        <meshStandardMaterial color={foodColors.rice} roughness={0.8} metalness={0} />
      </mesh>

      {/* ── Base ─ */}
      <mesh position={[0, -0.92, 0]}>
        <cylinderGeometry args={[0.62, 0.58, 0.08, 40]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* ── Locking clip (decorative) ─ */}
      {[-0.55, 0.55].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.05, 0.3, 0.04]} />
          <meshStandardMaterial {...metalMat} color="#D0D0D0" />
        </mesh>
      ))}

      {/* ── Steam particles ─ */}
      {[-2, -1, 0, 1, 2].map((i) => (
        <SteamParticle key={i} offset={i} />
      ))}
    </group>
  );
}

// ─── Scene Setup ─────────────────────────────────────────────
function Scene({ normX, normY }: { normX: number; normY: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.6} color="#FFF8F0" />
      {/* Key light — warm from top-left */}
      <directionalLight
        position={[-3, 4, 3]}
        intensity={2.5}
        color="#FFE4CC"
        castShadow
      />
      {/* Fill light — cool from right */}
      <directionalLight
        position={[3, 1, -2]}
        intensity={0.8}
        color="#CCE8FF"
      />
      {/* Rim light */}
      <directionalLight
        position={[0, -2, 3]}
        intensity={0.4}
        color="#FFD4AA"
      />

      <Float
        speed={reducedMotion ? 0 : 1.2}
        rotationIntensity={reducedMotion ? 0 : 0.05}
        floatIntensity={reducedMotion ? 0 : 0.3}
      >
        <TiffinModel normX={normX} normY={normY} />
      </Float>
    </>
  );
}

// ─── Public Component ─────────────────────────────────────────
export function TiffinScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { normX, normY } = useMousePosition(containerRef);

  return (
    <div
      ref={containerRef}
      className="three-canvas-container"
      style={{ width: "100%", height: "100%", minHeight: 480 }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 38 }}
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene normX={normX} normY={normY} />
        </Suspense>
      </Canvas>
    </div>
  );
}
