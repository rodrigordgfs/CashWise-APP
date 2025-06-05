"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface FilterCardProps {
  title?: string;
  children?: ReactNode;
}

export const FilterCard = ({ children, title = "Filtros" }: FilterCardProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState<number | "auto">(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
      const timeout = setTimeout(() => setHeight("auto"), 300);
      return () => clearTimeout(timeout);
    } else if (!isOpen) {
      setHeight(contentRef.current?.scrollHeight || 0);
      requestAnimationFrame(() => {
        setHeight(0);
      });
    }
  }, [isOpen]);

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6 pb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer p-2 rounded-full"
          aria-label={isOpen ? "Ocultar filtros" : "Mostrar filtros"}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <div
        ref={contentRef}
        style={{
          height: height === "auto" ? "auto" : `${height}px`,
          overflow: "hidden",
          transition: "height 300ms ease",
        }}
      >
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
};
