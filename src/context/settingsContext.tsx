"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";

type Theme = "light" | "dark" | "system";

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
  theme: Theme;
  isDarkMode: boolean;

  currency: string;
  currencies: Currency[];

  language: string;
  languages: Language[];

  notifications: Notifications;

  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  setCurrency: (value: string) => void;
  setLanguage: (value: string) => void;
  setNotifications: (value: Notifications) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const [theme, setThemeState] = useState<Theme>("system");
  const [currency, setCurrencyState] = useState("BRL");
  const [language, setLanguageState] = useState("pt-BR");
  const [notifications, setNotificationsState] = useState<Notifications>({
    budgetAlerts: true,
    weeklyReports: true,
    tips: false,
  });

  useEffect(() => {
    i18n.changeLanguage(language).then(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("locale", language);
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [language, i18n, router, pathname, searchParams]);

  // Detecta se o usuário prefere dark no sistema
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Decide se o modo dark deve ser aplicado
  const isDarkMode = theme === "dark" || (theme === "system" && prefersDark);

  // Carrega preferências do localStorage no primeiro carregamento
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const storedCurrency = localStorage.getItem("currency");
    const storedLanguage = localStorage.getItem("language");
    const storedNotifications = localStorage.getItem("notifications");

    if (
      storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system"
    ) {
      setThemeState(storedTheme);
    } else {
      setThemeState("system");
    }

    if (storedCurrency) setCurrencyState(storedCurrency);
    if (storedLanguage) setLanguageState(storedLanguage);
    if (storedNotifications)
      setNotificationsState(JSON.parse(storedNotifications));

    setIsLoaded(true);
  }, []);

  // Atualiza a classe "dark" no <html> e salva no localStorage sempre que o tema muda
  useEffect(() => {
    if (!isLoaded) return;

    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("theme", theme);
  }, [isDarkMode, theme, isLoaded]);

  // Sincroniza localStorage para os outros valores
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

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => {
    const currencies: Currency[] = [
      { value: "BRL", label: t("settings.real") },
      { value: "USD", label: t("settings.dollar") },
      { value: "EUR", label: t("settings.euro") },
      { value: "GBP", label: t("settings.libra") },
    ];

    const languages: Language[] = [
      { value: "pt-BR", label: t("settings.portuguese") },
      { value: "en-US", label: t("settings.english") },
      { value: "es", label: t("settings.spanish") },
    ];

    return {
      isDarkMode,
      currency,
      currencies,
      language,
      languages,
      notifications,
      theme,
      setTheme,
      toggleTheme,
      setCurrency: setCurrencyState,
      setLanguage: setLanguageState,
      setNotifications: setNotificationsState,
    };
  }, [isDarkMode, currency, language, notifications, t, theme, toggleTheme]);

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
