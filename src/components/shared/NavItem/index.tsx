"use client";

import Link from "next/link";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  isActive: boolean;
  onClick?: () => void; // opcional
}

export const NavItem = ({
  href,
  icon: Icon,
  title,
  isActive,
  onClick,
}: NavItemProps) => {
  return (
    <Link href={href} passHref>
      <div
        onClick={onClick}
        role="link"
        tabIndex={0}
        className={`w-full flex items-center px-3 py-2 rounded-md cursor-pointer ${
          isActive
            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
        }`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick?.();
          }
        }}
      >
        <Icon className="mr-2 h-5 w-5" />
        {title}
      </div>
    </Link>
  );
};
