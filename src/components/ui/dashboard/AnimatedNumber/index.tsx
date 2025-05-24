"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  duration?: number; // em milissegundos
  className?: string;
}

export const AnimatedNumber = ({
  value,
  prefix = "",
  duration = 1000,
  className = "",
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimestamp = useRef<number | null>(null);

  useEffect(() => {
    const step = (timestamp: number) => {
      if (!startTimestamp.current) startTimestamp.current = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp.current) / duration,
        1
      );
      const current = value * progress;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    setDisplayValue(0);
    startTimestamp.current = null;
    requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix} {displayValue.toFixed(2)}
    </span>
  );
};
