"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

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
  const [isLoaded, setIsLoaded] = useState(false);

  const [theme, setThemeState] = useState<Theme>("system");
  const [currency, setCurrencyState] = useState("BRL");
  const [language, setLanguageState] = useState("pt-BR");
  const [notifications, setNotificationsState] = useState<Notifications>({
    budgetAlerts: true,
    weeklyReports: true,
    tips: false,
  });

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
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
    if (theme === "dark") setThemeState("light");
    else setThemeState("dark");
  }, [theme]);

  const currencies: Currency[] = useMemo(
    () => [
      { value: "BRL", label: "Real" },
      { value: "USD", label: "Dollar" },
      { value: "EUR", label: "Euro" },
      { value: "GBP", label: "Pound" },
    ],
    []
  );

  const languages: Language[] = useMemo(
    () => [
      { value: "pt-BR", label: "Portuguese" },
      { value: "en-US", label: "English" },
      { value: "es", label: "Spanish" },
    ],
    []
  );

  const value = useMemo(
    () => ({
      theme,
      isDarkMode,

      currency,
      currencies,

      language,
      languages,

      notifications,

      setTheme,
      toggleTheme,

      setCurrency: setCurrencyState,
      setLanguage: setLanguageState,
      setNotifications: setNotificationsState,
    }),
    [
      theme,
      isDarkMode,
      currency,
      language,
      notifications,
      currencies,
      languages,
      toggleTheme,
    ]
  );

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
