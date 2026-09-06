'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Visible by default: animation is progressive enhancement, never a loading gate. */
export function MotionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const stop = () => cleanup?.();
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (media.matches) return;
      try {
        const { animate, createScope, stagger } = await import('animejs');
        if (disposed || media.matches) return;
        const scope = createScope({ root: element }).add(() => {
          animate(element.children, { translateY: [18, 0], opacity: [0.65, 1], delay: stagger(55), duration: 550, ease: 'out(3)' });
        });
        cleanup = () => scope.revert();
      } catch { /* Keep content usable when the optional animation chunk cannot load. */ }
    }, { threshold: 0.08 });
    observer.observe(element);
    media.addEventListener('change', stop);
    return () => { disposed = true; observer.disconnect(); media.removeEventListener('change', stop); cleanup?.(); };
  }, []);
  return <div ref={root} className={className}>{children}</div>;
}
