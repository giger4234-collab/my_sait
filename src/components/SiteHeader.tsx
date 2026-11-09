"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); button.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("pointerdown", outside); };
  }, [open]);
  return (
    <header ref={header} className={styles.header + " container"}>
      <a className={styles.logo} href="#home" aria-label="ОРБИТА — к началу" onClick={() => setOpen(false)}>
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><ellipse cx="16" cy="16" rx="14" ry="6" stroke="currentColor" strokeWidth="2" transform="rotate(-38 16 16)" /><ellipse cx="16" cy="16" rx="14" ry="6" stroke="currentColor" strokeWidth="2" transform="rotate(38 16 16)" /></svg>
        ОРБИТА
      </a>
      <a href="#studio" className={styles.studioLink}>ВЕБ СТУДИЯ <span /></a>
      <div className={styles.actions}>
        <a className={styles.contact} aria-label="Обсудим идею — написать @webdiz3d в Telegram" href="https://t.me/webdiz3d" target="_blank" rel="noopener noreferrer"><span>Обсудим идею</span><Icon name="arrow" /></a>
        <button ref={button} type="button" className={styles.menuButton} aria-expanded={open} aria-controls="site-nav" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}>
          <span>{open ? "ЗАКРЫТЬ" : "МЕНЮ"}</span><Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <nav id="site-nav" className={styles.nav} data-open={open} aria-label="Главная навигация">
        {[
          ["#studio", "Веб студия"],
          ["#experience", "Форма и движение"],
          ["#experiments", "Эксперименты"],
          ["#solar-system", "Три мира"],
          ["#contact", "Контакт"],
        ].map(([href, text]) => <a href={href} key={href} onClick={() => setOpen(false)}>{text}<Icon name="arrow" /></a>)}
      </nav>
    </header>
  );
}
