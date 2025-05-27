"use client";

import { Button } from "@/components/shared/Button";
import { PageHeader } from "@/components/shared/PageHeader";
import { RadioGroupField } from "@/components/shared/RadioGroupField";
import { SelectField } from "@/components/shared/SelectField";
import { ToggleSwitchField } from "@/components/shared/ToggleSwitchField";
import { SettingCard } from "@/components/ui/settings/SettingsCard";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("BRL");
  const [language, setLanguage] = useState("pt-BR");
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    weeklyReports: true,
    tips: false,
  });

  const currencies = [
    { value: "BRL", label: "Real (R$)" },
    { value: "USD", label: "Dólar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "Libra (£)" },
  ];

  const languages = [
    { value: "pt-BR", label: "Português (Brasil)" },
    { value: "en-US", label: "English (US)" },
    { value: "es", label: "Español" },
  ];

  useEffect(() => {
    // Check if dark mode is enabled on initial load
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
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Configurações" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Aparência */}
        <SettingCard
          title="Aparência"
          description="Personalize a aparência do aplicativo"
        >
          <div className="space-y-3">
            <RadioGroupField
              name="theme"
              value={darkMode ? "dark" : "light"}
              onChange={(theme) => {
                if (theme === "light" && darkMode) toggleDarkMode();
                if (theme === "dark" && !darkMode) toggleDarkMode();
              }}
              options={[
                { value: "light", label: "Claro" },
                { value: "dark", label: "Escuro" },
                { value: "system", label: "Sistema" },
              ]}
            />
          </div>
        </SettingCard>

        {/* Moeda */}
        <SettingCard title="Moeda" description="Defina a moeda padrão">
          <SelectField
            label="Moeda"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            options={currencies}
          />
        </SettingCard>

        {/* Idioma */}
        <SettingCard title="Idioma" description="Defina o idioma do aplicativo">
          <SelectField
            label="Idioma"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={languages}
          />
        </SettingCard>

        {/* Notificações */}
        <div className="md:col-span-2 lg:col-span-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Notificações</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Gerencie suas preferências de notificação
            </p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <ToggleSwitchField
              label="Alertas de orçamento"
              description="Receba alertas quando estiver próximo do limite de orçamento"
              checked={notifications.budgetAlerts}
              onChange={(checked) =>
                setNotifications((prev) => ({ ...prev, budgetAlerts: checked }))
              }
            />
            <ToggleSwitchField
              label="Relatórios semanais"
              description="Receba um resumo semanal das suas finanças"
              checked={notifications.weeklyReports}
              onChange={(checked) =>
                setNotifications((prev) => ({
                  ...prev,
                  weeklyReports: checked,
                }))
              }
            />
            <ToggleSwitchField
              label="Dicas financeiras"
              description="Receba dicas para melhorar suas finanças"
              checked={notifications.tips}
              onChange={(checked) =>
                setNotifications((prev) => ({ ...prev, tips: checked }))
              }
            />
          </div>
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              variant="emerald"
              onClick={() => {
                // Save preferences logic here
                console.log("Preferências salvas:", {
                  darkMode,
                  currency,
                  language,
                  notifications,
                });
              }}
            >
              Salvar preferências
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
