"use client";

import Link from "next/link";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  isActive: boolean;
}

export const NavItem = ({
  href,
  icon: Icon,
  title,
  isActive,
}: NavItemProps) => {
  return (
    <Link href={href}>
      <div
        className={`w-full flex items-center px-3 py-2 rounded-md ${
          isActive
            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
        }`}
      >
        <Icon className="mr-2 h-5 w-5" />
        {title}
      </div>
    </Link>
  );
};
