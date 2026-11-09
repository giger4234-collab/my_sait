"use client";

import { useEffect, useState, type RefObject } from "react";

export function useSceneActivity(element: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const target = element.current;
    if (!target) return;

    let inView = false;
    const update = () =>
      setActive(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });

    observer.observe(target);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [element]);

  return active;
}
