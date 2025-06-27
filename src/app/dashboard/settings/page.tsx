"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { RadioGroup } from "@/components/shared/RadioGroup";
import { Select } from "@/components/shared/Select";
import { ToggleSwitch } from "@/components/shared/ToggleSwitch";
import { SettingCard } from "@/components/ui/settings/SettingsCard";
import { useSettings } from "@/context/settingsContext";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation();

  const {
    theme,
    setTheme,
    currency,
    language,
    notifications,
    setCurrency,
    setLanguage,
    setNotifications,
    currencies,
    languages,
  } = useSettings();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title={t("settings.title")} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Aparência */}
        <SettingCard
          title={t("settings.appearance")}
          description={t("settings.appearanceDescription")}
        >
          <RadioGroup
            name="theme"
            value={theme}
            onChange={(newTheme) =>
              setTheme(newTheme as "light" | "dark" | "system")
            }
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System Default" },
            ]}
          />
        </SettingCard>

        {/* Moeda */}
        <SettingCard
          title={t("settings.currency")}
          description={t("settings.currencyDescription")}
        >
          <Select
            label={t("settings.currency")}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            options={currencies}
          />
        </SettingCard>

        {/* Idioma */}
        <SettingCard
          title={t("settings.language")}
          description={t("settings.languageDescription")}
        >
          <Select
            label={t("settings.language")}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={languages}
          />
        </SettingCard>

        {/* Notificações */}
        <div className="md:col-span-2 lg:col-span-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">
              {t("settings.notifications")}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {t("settings.notificationsDescription")}
            </p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <ToggleSwitch
              label={t("settings.budgetAlerts")}
              description={t("settings.budgetAlertsDescription")}
              checked={notifications.budgetAlerts}
              onChange={(checked) =>
                setNotifications({ ...notifications, budgetAlerts: checked })
              }
            />
            <ToggleSwitch
              label={t("settings.weaklyReport")}
              description={t("settings.weaklyReportDescription")}
              checked={notifications.weeklyReports}
              onChange={(checked) =>
                setNotifications({ ...notifications, weeklyReports: checked })
              }
            />
            <ToggleSwitch
              label={t("settings.financialTips")}
              description={t("settings.financialTipsDescription")}
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
