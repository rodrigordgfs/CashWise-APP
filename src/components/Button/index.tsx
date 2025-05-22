"use client";

import { LucideIcon } from "lucide-react";
import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "emerald" | "blue" | "red";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  children: React.ReactNode;
}

const baseStyles = "flex items-center rounded-md text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer transition duration-200 ease-in-out";

const variants: Record<string, string> = {
  emerald: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600",
  blue: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
  red: "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "emerald",
  size = "md",
  icon: Icon,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
};

// Exemplo de uso
// <Button variant="emerald" size="md" icon={Plus}>Nova Transação</Button>
