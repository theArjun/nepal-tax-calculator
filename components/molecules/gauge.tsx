"use client";

import { useEffect, useState } from "react";
import { AnimatedNumber } from "@/components/atoms/animated-number";

interface GaugeProps {
  label: string;
  /** Effective tax rate as a percentage. */
  value: number;
  /** Re-trigger the fill/marker animation when this changes. */
  trigger?: number | string;
}

// Effective-rate gauge: the fill/marker grow from 0 via CSS transition; the percent counts up.
export function Gauge({ label, value, trigger }: GaugeProps) {
  const pct = Math.min(value, 100);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Start at 0, then animate to the target on the next frame (matches the original rAF).
    setWidth(0);
    const id = requestAnimationFrame(() => setWidth(pct));
    return () => cancelAnimationFrame(id);
  }, [pct, trigger]);

  return (
    <div className="gauge">
      <span className="gauge-label">{label}</span>
      <div className="gauge-track">
        <div className="gauge-fill" style={{ width: `${width}%` }} />
        <div className="gauge-marker" style={{ left: `${width}%` }} />
      </div>
      <AnimatedNumber
        className="gauge-percent"
        value={value}
        trigger={trigger}
        durationMs={1200}
        format={(n) => `${n.toFixed(2)}%`}
      />
    </div>
  );
}
