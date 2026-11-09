"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { MathUtils, PMREMGenerator, type Group } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { SceneMotion, SceneVariant } from "./motion";

function StudioLight() {
  const { gl, scene, invalidate } = useThree();
  useEffect(() => {
    const room = new RoomEnvironment();
    const generator = new PMREMGenerator(gl);
    const target = generator.fromScene(room, 0.035);
    const previous = scene.environment;
    scene.environment = target.texture;
    invalidate();
    return () => { scene.environment = previous; target.dispose(); room.dispose(); generator.dispose(); };
  }, [gl, scene, invalidate]);
  return null;
}

function position(index: number, count: number, progress: number, seed: number) {
  const a = index * 2.39996 + seed * .45;
  const r = 1.1 + (index % 3) * .82;
  const cluster = [Math.cos(a) * r, Math.sin(a) * r * .76, Math.sin(index * 1.7) * 1.2];
  const orbit = [Math.cos(a) * 3.55, Math.sin(a) * 2.3, Math.sin(a * 2) * .65];
  const helix = [Math.sin(index * .85) * 1.9, (index - (count - 1) / 2) * .48, Math.cos(index * .85) * 1.9];
  const t = MathUtils.smootherstep(progress, 0, .5);
  const u = MathUtils.smootherstep(progress, .5, 1);
  return cluster.map((v, axis) => MathUtils.lerp(MathUtils.lerp(v, orbit[axis], t), helix[axis], u));
}

export function OrbitalSculpture({ animate, motion, seed, compact, segments, variant }: {
  animate: boolean; motion: RefObject<SceneMotion>; seed: number; compact: boolean; segments: number; variant: SceneVariant;
}) {
  const invalidate = useThree(s => s.invalidate);
  const group = useRef<Group>(null);
  const objects = useRef<(Group | null)[]>([]);
  const time = useRef(0);
  const lastSeed = useRef<number | null>(null);
  const detail = Math.min(1, segments / 64);
  const radial = Math.max(8, Math.round((compact ? 12 : 20) * detail));
  const tubular = Math.max(48, Math.round((compact ? 80 : 140) * detail));
  const count = variant === "ribbon" ? 3 : variant === "orbit" ? 7 : compact ? 9 : 14;
  const initial = useMemo(() => Array.from({ length: count }, (_, i) => position(i, count, 0, seed)), [count, seed]);
  useEffect(() => { invalidate(); }, [seed, invalidate]);
  useFrame((_, delta) => {
    const recompose = lastSeed.current !== seed;
    lastSeed.current = seed;
    if (!animate && !recompose) return;
    const dt = Math.min(delta, .05);
    if (animate) time.current += dt;
    const t = time.current;
    const p = variant === "journey" ? motion.current.scroll : variant === "orbit" ? .45 : 0;
    if (group.current && animate) {
      group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -.12 + motion.current.y * .12 + p * .3, 3, dt);
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, motion.current.x * .2 + p * .85, 3, dt);
      group.current.rotation.z = Math.sin(t * .12) * .055;
    }
    objects.current.forEach((object, i) => {
      if (!object) return;
      let target = position(i, count, p, seed);
      if (variant === "ribbon") target = [i === 0 ? 0 : i === 1 ? -1.4 : 1.2, i === 0 ? 0 : i === 1 ? .7 : -.8, -i * .55];
      if (variant === "orbit") target = i < 3 ? [0, 0, -i * .4] : [Math.cos(i + t * .14) * 3.1, Math.sin(i + t * .14) * 2.2, Math.sin(i) * 1.2];
      target[0] += (variant === "ribbon" || variant === "orbit") ? Math.sin(seed * .8 + i) * (seed ? .65 : 0) : 0;
      const bob = Math.sin(t * .35 + i) * .12;
      if (animate) {
        object.position.x = MathUtils.damp(object.position.x, target[0], 3.4, dt);
        object.position.y = MathUtils.damp(object.position.y, target[1] + bob, 3.4, dt);
        object.position.z = MathUtils.damp(object.position.z, target[2], 3.4, dt);
        object.rotation.x = i * .63 + seed * .35 + t * (.05 + (i % 3) * .018) + p * .8;
        object.rotation.y = i * .4 + t * .065 - p * .45;
        object.rotation.z = i * .79 + Math.sin(t * .18 + i) * .16;
      } else if (recompose) {
        object.position.set(target[0], target[1] + bob, target[2]);
      }
    });
  });
  return <>
    <StudioLight />
    <group ref={group} rotation={[-.12, 0, 0]}>
      {initial.map((location, i) => {
        const metal = i % 4 === 2;
        const colors = ["#d9202e", "#ff402f", "#a4a0a0", "#460c15"];
        const main = variant === "ribbon";
        const scale = main ? (i === 0 ? 1.55 : .86) : variant === "orbit" && i < 3 ? 1.75 + i * .2 : .65 + (i % 4) * .13;
        return <group key={i} ref={node => { objects.current[i] = node; }} position={[location[0], location[1], location[2]]} rotation={[i * .63, i * .4, i * .79]} scale={scale}>
          <mesh>
            {main ? <torusKnotGeometry args={[1.25, .34, tubular, radial, 2, 3]} />
              : variant === "orbit" && i < 3 ? <torusGeometry args={[1.45, .13 + i * .035, radial, Math.max(24, Math.round((compact ? 60 : 100) * detail))]} />
              : i % 4 === 0 ? <torusKnotGeometry args={[.78, .28, Math.max(40, Math.round((compact ? 64 : 100) * detail)), radial, 2, 3]} />
              : i % 4 === 1 ? <torusGeometry args={[.8, .32, radial, Math.max(24, Math.round((compact ? 48 : 80) * detail))]} />
              : i % 4 === 2 ? <capsuleGeometry args={[.38, .85, Math.max(4, Math.round(8 * detail)), Math.max(8, Math.round((compact ? 16 : 24) * detail))]} />
              : <sphereGeometry args={[.65, Math.max(12, Math.round(segments / 2)), Math.max(8, Math.round(segments * .375))]} />}
            <meshPhysicalMaterial color={colors[i % colors.length]} metalness={metal ? 1 : .65} roughness={metal ? .14 : .22} clearcoat={.65} clearcoatRoughness={.14} envMapIntensity={metal ? 1.6 : 1.15} />
          </mesh>
        </group>;
      })}
    </group>
  </>;
}
