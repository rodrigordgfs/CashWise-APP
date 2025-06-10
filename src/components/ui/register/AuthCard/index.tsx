import React from "react";

export function AuthCard({
  title,
  description,
  children,
  centerContent = false,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  centerContent?: boolean;
}) {
  return (
    <div className="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div
        className={`p-6 space-y-1 ${
          centerContent ? "text-center" : "text-left"
        }`}
      >
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
