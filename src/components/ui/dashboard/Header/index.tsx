"use client"

import { useMenu } from "@/context/menuContext";
import { Menu, Moon, Settings, Sun, User, Wallet } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
   const [darkMode, setDarkMode] = useState(false)

  const { toggleMenu } = useMenu();

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
    } else {
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
    }
    setDarkMode(!darkMode)
  }

  useEffect(() => {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setDarkMode(true)
      }
    }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
      <div className="flex h-14 items-center pl-4 pr-6">
        <div className="mr-4 flex items-center">
          <button
            onClick={() => toggleMenu()}
            className="mr-2 p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <Link href="/" className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            <span className="font-bold">CashWise</span>
          </Link>
        </div>
        <div className="flex md:hidden">
          {/* Mobile menu button */}
          <button
            onClick={() => toggleMenu()}
            className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
          <button className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            <User className="h-5 w-5" />
            <span className="sr-only">Perfil</span>
          </button>
          <button className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Configurações</span>
          </button>
        </div>
      </div>
    </header>
  );
};
