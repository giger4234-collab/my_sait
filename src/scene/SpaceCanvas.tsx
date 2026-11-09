"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { QualityProfile } from "@/quality/profiles";
import type { SceneMotion, SceneVariant } from "./motion";
import { OrbitalSculpture } from "./OrbitalSculpture";
type Props = { active: boolean; paused: boolean; quality: QualityProfile; motion: RefObject<SceneMotion>; seed: number; variant: SceneVariant; onReady: () => void; onFailure: () => void };

function Monitor({ onReady, onLow, onFailure }: { onReady: () => void; onLow: () => void; onFailure: () => void }) {
  const canvas = useThree(s => s.gl.domElement);
  const sample = useRef({ reported: false, elapsed: 0, frames: 0, finished: false });
  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [canvas, onFailure]);
  useFrame((_, delta) => {
    const s = sample.current;
    if (!s.reported) { s.reported = true; onReady(); }
    if (s.finished || delta > .2) return;
    s.elapsed += delta; s.frames++;
    if (s.elapsed > 3) { s.finished = true; if (s.elapsed / s.frames > 1 / 30) onLow(); }
  });
  return null;
}
export default function SpaceCanvas({ active, paused, quality, motion, seed, variant, onReady, onFailure }: Props) {
  const [low, setLow] = useState(false);
  const compact = quality.maxDpr <= 1.25;
  return <Canvas camera={{ position: [0, 0, compact ? 12 : 10.7], fov: 40 }} dpr={[1, low ? 1 : quality.maxDpr]} frameloop={active && !paused ? "always" : "demand"} gl={{ alpha: false, antialias: !compact, powerPreference: "low-power" }} fallback={null}>
    <color attach="background" args={["#0b0b0d"]} />
    <ambientLight intensity={.6} />
    <directionalLight position={[-4, 6, 6]} intensity={3.2} color="#fff0e8" />
    <directionalLight position={[5, -2, 3]} intensity={2.5} color="#ff2638" />
    <pointLight position={[-5, 0, -2]} intensity={24} color="#ff1833" />
    <OrbitalSculpture animate={active && !paused} motion={motion} seed={seed} compact={compact} variant={variant} segments={low ? 32 : quality.segments} />
    <Monitor onReady={onReady} onFailure={onFailure} onLow={() => setLow(true)} />
  </Canvas>;
}
