"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { RadioGroupField } from "@/components/shared/RadioGroupField";
import { SelectField } from "@/components/shared/SelectField";
import { ToggleSwitchField } from "@/components/shared/ToggleSwitchField";
import { SettingCard } from "@/components/ui/settings/SettingsCard";
import { useSettings } from "@/context/settingsContext";
import { useEffect } from "react";

export default function SettingsPage() {
  const {
    isDarkMode,
    setDarkMode,
    currency,
    language,
    notifications,
    toggleTheme,
    setCurrency,
    setLanguage,
    setNotifications,
    currencies,
    languages,
  } = useSettings();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode();
    }
  }, [setDarkMode]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Configurações" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Aparência */}
        <SettingCard
          title="Aparência"
          description="Personalize a aparência do aplicativo"
        >
          <RadioGroupField
            name="theme"
            value={isDarkMode ? "dark" : "light"}
            onChange={(theme) => {
              if (theme === "light" && isDarkMode) toggleTheme();
              if (theme === "dark" && !isDarkMode) toggleTheme();
            }}
            options={[
              { value: "light", label: "Claro" },
              { value: "dark", label: "Escuro" },
              { value: "system", label: "Sistema" },
            ]}
          />
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
                setNotifications({ ...notifications, budgetAlerts: checked })
              }
            />
            <ToggleSwitchField
              label="Relatórios semanais"
              description="Receba um resumo semanal das suas finanças"
              checked={notifications.weeklyReports}
              onChange={(checked) =>
                setNotifications({ ...notifications, weeklyReports: checked })
              }
            />
            <ToggleSwitchField
              label="Dicas financeiras"
              description="Receba dicas para melhorar suas finanças"
              checked={notifications.tips}
              onChange={(checked) =>
                setNotifications({ ...notifications, tips: checked })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
