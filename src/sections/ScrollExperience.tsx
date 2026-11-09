"use client";
import { useEffect, useRef, useState } from "react";
import { SpaceScene } from "@/scene/SpaceScene";
import type { SceneMotion } from "@/scene/motion";
import { Icon } from "@/components/Icon";
import styles from "./ScrollExperience.module.css";

const chapters = [
  { title: "Сначала — форма.", text: "Идея собирается из отдельных деталей. Меняй ракурс: даже знакомые объекты могут выглядеть неожиданно.", word: "ФОРМА" },
  { title: "Потом — движение.", text: "Формы выходят на орбиту. Прокрутка задаёт ритм, а композиция отвечает на каждое движение.", word: "ДВИЖЕНИЕ" },
  { title: "И совершенно новый взгляд.", text: "Объекты выстраиваются в пространстве. Сайт становится опытом, внутри которого хочется задержаться.", word: "ПРОСТРАНСТВО" },
];
export function ScrollExperience() {
  const root = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const motion = useRef<SceneMotion>({ x: 0, y: 0, scroll: 0 });
  const [chapter, setChapter] = useState(0);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const element = root.current;
        if (!element) return;
        const box = element.getBoundingClientRect();
        const progress = reduced.matches ? 0 : Math.max(0, Math.min(1, -box.top / Math.max(1, box.height - (sticky.current?.getBoundingClientRect().height || innerHeight))));
        motion.current.scroll = progress;
        element.style.setProperty("--journey-progress", String(progress));
        setChapter(Math.min(2, Math.floor(progress * 3)));
      });
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    reduced.addEventListener("change", update);
    update();
    return () => { removeEventListener("scroll", update); removeEventListener("resize", update); reduced.removeEventListener("change", update); cancelAnimationFrame(frame); };
  }, []);
  const jump = (index: number) => {
    const element = root.current;
    if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = element.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(0, element.offsetHeight - (sticky.current?.offsetHeight || innerHeight));
    scrollTo({ top: top + distance * (index / 3 + .025), behavior: reduced ? "instant" : "smooth" });
  };
  return <section ref={root} className={styles.journey} id="experience" aria-label="Три главы: форма, движение и пространство">
    <div ref={sticky} className={styles.sticky}>
      <div className={styles.stage}><SpaceScene variant="journey" externalMotion={motion} label="Три главы одной композиции" /></div>
      <div className={styles.topbar + " container"}>
        <span>Прокрутка меняет всё</span>
        <div className={styles.steps} aria-label="Перейти к главе">
          {chapters.map((item, index) => <button type="button" key={item.word} aria-label={"0" + (index + 1) + " — " + item.word} aria-current={chapter === index ? "step" : undefined} onClick={() => jump(index)}><span>0{index + 1}</span></button>)}
        </div>
      </div>
      <div className={styles.copy + " container"}>
        {chapters.map((item, index) => <div key={item.word} hidden={chapter !== index} className={styles.chapter}>
          <h2>{item.title}</h2><p>{item.text}</p>
        </div>)}
        <div className={styles.hint}><Icon name="down" /><span>Продолжай листать</span></div>
      </div>
      <div className={styles.progress} aria-hidden="true" />
    </div>
    <ol className={styles.reducedCopy}>{chapters.map(item => <li key={item.word}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>
  </section>;
}
