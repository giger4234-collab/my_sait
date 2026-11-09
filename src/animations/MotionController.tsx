"use client";
import { useEffect } from "react";
export function MotionController() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in-view", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > innerHeight)
        element.dataset.inView = "false";
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.removeAttribute("data-in-view"));
    };
  }, []);
  return null;
}
