"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";
import { qualityProfiles } from "@/quality/profiles";
import { useSceneActivity } from "@/quality/use-scene-activity";
import { assetPath } from "@/content/assets";
import { Icon } from "@/components/Icon";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import type { SceneMotion, SceneVariant } from "./motion";
import styles from "./SpaceScene.module.css";
const SpaceCanvas = dynamic(() => import("./SpaceCanvas"), { ssr: false });

function supportsWebGL2() {
  try {
    const context = document.createElement("canvas").getContext("webgl2");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch { return false; }
}
export function SpaceScene({ variant = "field", externalMotion, label = "Абстрактная 3D-композиция" }: { variant?: SceneVariant; externalMotion?: RefObject<SceneMotion>; label?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const ownMotion = useRef<SceneMotion>({ x: 0, y: 0, scroll: 0 });
  const motion = externalMotion || ownMotion;
  const active = useSceneActivity(container);
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [paused, setPaused] = useState(false);
  const [requested, setRequested] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const [seed, setSeed] = useState(0);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setReady(false); setCanAnimate(false); }, []);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const small = matchMedia("(max-width: 800px)");
    const supported = supportsWebGL2();
    const update = () => { setMobile(small.matches); setCanAnimate(supported && !reduced.matches); };
    update();
    reduced.addEventListener("change", update); small.addEventListener("change", update);
    return () => { reduced.removeEventListener("change", update); small.removeEventListener("change", update); };
  }, []);
  const enabled = canAnimate && active && (!mobile || requested);
  useEffect(() => { if (!enabled) setReady(false); }, [enabled]);
  const pointer = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled || paused || event.pointerType === "touch") return;
    const box = event.currentTarget.getBoundingClientRect();
    motion.current.x = ((event.clientX - box.left) / box.width) * 2 - 1;
    motion.current.y = ((event.clientY - box.top) / box.height) * 2 - 1;
  };
  return <div className={styles.scene} ref={container} data-ready={enabled && ready} data-variant={variant} data-motion={enabled && !paused ? "running" : "paused"} onPointerMove={pointer} onPointerLeave={() => { motion.current.x = 0; motion.current.y = 0; }}>
    <img className={styles.fallback} src={assetPath("/assets/images/abstract-studio.webp")} alt="" aria-hidden="true" width={1586} height={992} loading={variant === "field" ? "eager" : "lazy"} fetchPriority={variant === "field" ? "high" : "auto"} decoding="async" />
    {enabled && <SceneErrorBoundary onFailure={onFailure}>
      <div className={styles.canvas} aria-hidden="true"><SpaceCanvas active={active} paused={paused} quality={mobile ? qualityProfiles.mobile : qualityProfiles.desktop} motion={motion} seed={seed} variant={variant} onReady={onReady} onFailure={onFailure} /></div>
    </SceneErrorBoundary>}
    <span className={styles.label}>{label}</span>
    <div className={styles.controls}>
      {canAnimate && <>
        <button type="button" disabled={enabled && !ready} onClick={() => { if (!enabled) { setRequested(true); setPaused(false); } else setPaused(!paused); }} aria-label={enabled && !ready ? "Загрузка 3D-сцены" : !enabled ? "Включить 3D-анимацию" : paused ? "Продолжить анимацию" : "Пауза анимации"}>
          <Icon name={!enabled || paused ? "play" : "pause"} /><span>{enabled && !ready ? "Загрузка…" : !enabled ? "Включить 3D" : paused ? "Продолжить" : "Пауза"}</span>
        </button>
        {enabled && ready && <button type="button" className={styles.shuffle} onClick={() => setSeed(s => s + 1)} aria-label="Изменить форму"><Icon name="reload" /><span>Изменить форму</span></button>}
      </>}
    </div>
  </div>;
}
