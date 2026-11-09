import type { CSSProperties } from "react";

type IconName = "arrow" | "down" | "up" | "menu" | "close" | "telegram" | "play" | "pause" | "reload" | "plus";
export function Icon({ name, className, style }: { name: IconName; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className} style={style}>
      {name === "arrow" && <path d="M5 19 19 5M5 5h14v14" />}
      {name === "down" && <path d="M12 4v16m-7-7 7 7 7-7" />}
      {name === "up" && <path d="M12 20V4m-7 7 7-7 7 7" />}
      {name === "menu" && <><path d="M5 8h14M5 16h14" /><circle cx="17" cy="8" r="1.5" fill="currentColor" stroke="none" /></>}
      {name === "close" && <path d="m6 6 12 12M18 6 6 18" />}
      {name === "telegram" && <path d="m21 4-4 17-6-5-4 3v-6L21 4ZM7 13l10-6M3 10l18-6-14 9-4-3Z" />}
      {name === "play" && <path d="m8 5 11 7-11 7V5Z" />}
      {name === "pause" && <path d="M8 5v14M16 5v14" />}
      {name === "reload" && <><path d="M20 10a8 8 0 1 0-1 7M20 4v6h-6" /></>}
      {name === "plus" && <path d="M12 4v16M4 12h16" />}
    </svg>
  );
}
