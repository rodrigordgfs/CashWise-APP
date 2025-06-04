"use client";

import { useSettings } from "@/context/settingsContext";
import { formatCurrency } from "@/utils/formatConvertCurrency";
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
  const { currency, language } = useSettings();
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
      {formatCurrency(displayValue, currency, language)}
    </span>
  );
};
