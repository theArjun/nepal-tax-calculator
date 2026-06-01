"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  /** Format the (eased) number for display. */
  format: (n: number) => string;
  durationMs?: number;
  /** Animation key — re-trigger the count-up when this changes (e.g. each calculation). */
  trigger?: number | string;
  className?: string;
}

// Cubic ease-out count-up — mirrors the original countUp()/gauge animation.
export function AnimatedNumber({
  value,
  format,
  durationMs = 1000,
  trigger,
  className,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value);
  const raf = useRef<number>();

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf.current = requestAnimationFrame(animate);
      else setDisplay(value);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, trigger, durationMs]);

  return <span className={className}>{format(display)}</span>;
}
