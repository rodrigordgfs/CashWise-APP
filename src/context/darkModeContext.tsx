"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: () => void;
  setLightMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setIsDarkMode(true);
      }
    }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = "dark"
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = "light"
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const setDarkMode = () => setIsDarkMode(true);
  const setLightMode = () => setIsDarkMode(false);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setDarkMode, setLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
