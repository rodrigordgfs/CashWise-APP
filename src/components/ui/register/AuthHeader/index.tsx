"use client";
import Link from "next/link";
import { Wallet, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function AuthHeader() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center justify-between w-[calc(100%-2rem)] md:w-[calc(100%-4rem)]">
      <Link href="/" className="flex items-center">
        <Wallet className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-500" />
        <span className="font-bold">CashWise</span>
      </Link>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
}
