"use client";

import { useSettings } from "@/context/settingsContext";
import { Menu, Moon, Sun } from "lucide-react";
import { useMenu } from "@/context/menuContext";
import { useSidebar } from "@/context/sidebarContext";
import { IconButton } from "@/components/shared/IconButton";
import { LogoButton } from "../LogoButton";

export const Header = () => {
  const { isDarkMode, toggleTheme } = useSettings();
  const { toggleMobileMenu } = useMenu();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
      <div className="flex h-14 items-center pl-4 pr-6">
        <div className="space-x-2 flex items-center">
          <div className="hidden md:block">
            <IconButton icon={Menu} name="Menu" onClick={toggleSidebar} />
          </div>
          <div className="md:hidden">
            <IconButton icon={Menu} name="Menu" onClick={toggleMobileMenu} />
          </div>
          <LogoButton />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <IconButton
            onClick={toggleTheme}
            icon={isDarkMode ? Sun : Moon}
            name="Toggle theme"
          />
        </div>
      </div>
    </header>
  );
};
