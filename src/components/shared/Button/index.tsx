"use client";

import { LucideIcon, Loader } from "lucide-react";
import React, { FC } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "emerald" | "blue" | "red" | "neutral";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  loading?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

const baseStyles =
  "flex items-center h-10 justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out cursor-pointer";

const variants: Record<string, string> = {
  emerald:
    "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white dark:text-white",
  blue: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white dark:text-white",
  red: "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white dark:text-white",
  neutral:
    "border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export const Button: FC<ButtonProps> = ({
  variant = "emerald",
  size = "md",
  icon: Icon,
  loading = false,
  children,
  disabled = false,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const hasIcon = Boolean(Icon) || loading;

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        isDisabled && "opacity-50 cursor-not-allowed focus:ring-0",
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {children && (
        <span className={hasIcon ? "ml-2" : ""}>{children}</span>
      )}
    </button>
  );
};
