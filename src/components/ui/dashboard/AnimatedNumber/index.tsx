"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number; // em milissegundos
  className?: string;
}

export const AnimatedNumber = ({
  value,
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

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(displayValue);

  return <span className={className}>{formattedValue}</span>;
};
