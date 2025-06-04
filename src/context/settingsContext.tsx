"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";

import { useTranslation } from "next-i18next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Notifications {
  budgetAlerts: boolean;
  weeklyReports: boolean;
  tips: boolean;
}

interface Currency {
  value: string;
  label: string;
}

interface Language {
  value: string;
  label: string;
}

interface SettingsContextProps {
  isDarkMode: boolean;
  currency: string;
  currencies: Currency[];
  language: string;
  languages: Language[];
  notifications: Notifications;

  toggleTheme: () => void;
  setDarkMode: () => void;
  setLightMode: () => void;

  setCurrency: (value: string) => void;
  setLanguage: (value: string) => void;
  setNotifications: (value: Notifications) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrencyState] = useState("BRL");
  const [language, setLanguageState] = useState("pt-BR");
  const [notifications, setNotificationsState] = useState<Notifications>({
    budgetAlerts: true,
    weeklyReports: true,
    tips: false,
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const storedCurrency = localStorage.getItem("currency");
    const storedLanguage = localStorage.getItem("language");
    const storedNotifications = localStorage.getItem("notifications");

    setIsDarkMode(
      theme === "dark" ||
        (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    if (storedCurrency) setCurrencyState(storedCurrency);
    if (storedLanguage) setLanguageState(storedLanguage);
    if (storedNotifications)
      setNotificationsState(JSON.parse(storedNotifications));

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, isLoaded]);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("currency", currency);
  }, [currency, isLoaded]);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("language", language);
  }, [language, isLoaded]);

  useEffect(() => {
    if (isLoaded)
      localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications, isLoaded]);

  useEffect(() => {
    i18n.changeLanguage(language).then(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("locale", language);
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [language, i18n, router, pathname, searchParams]);

  const value = useMemo(() => {
    const currencies: Currency[] = [
      { value: "BRL", label: "Real (R$)" },
      { value: "USD", label: "Dólar ($)" },
      { value: "EUR", label: "Euro (€)" },
      { value: "GBP", label: "Libra (£)" },
    ];

    const languages: Language[] = [
      { value: "pt-BR", label: "Português (Brasil)" },
      { value: "en-US", label: "English (US)" },
      { value: "es", label: "Español" },
    ];

    return {
      isDarkMode,
      currency,
      currencies,
      language,
      languages,
      notifications,
      toggleTheme: () => setIsDarkMode((prev) => !prev),
      setDarkMode: () => setIsDarkMode(true),
      setLightMode: () => setIsDarkMode(false),
      setCurrency: setCurrencyState,
      setLanguage: setLanguageState,
      setNotifications: setNotificationsState,
    };
  }, [isDarkMode, currency, language, notifications]);

  if (!isLoaded) return null;

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
