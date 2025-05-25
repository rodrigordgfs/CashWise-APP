"use client"

import { useState, useEffect } from "react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [currency, setCurrency] = useState("BRL")
  const [language, setLanguage] = useState("pt-BR")
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    weeklyReports: true,
    tips: false,
  })

  useEffect(() => {
    // Check if dark mode is enabled on initial load
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true)
    }
  }, [])

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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Aparência</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Personalize a aparência do aplicativo</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={!darkMode}
                  onChange={() => {
                    if (darkMode) toggleDarkMode()
                  }}
                  className="w-4 h-4 text-emerald-600 border-zinc-300 dark:border-zinc-700 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                />
                <span className="text-sm">Claro</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={darkMode}
                  onChange={() => {
                    if (!darkMode) toggleDarkMode()
                  }}
                  className="w-4 h-4 text-emerald-600 border-zinc-300 dark:border-zinc-700 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                />
                <span className="text-sm">Escuro</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  className="w-4 h-4 text-emerald-600 border-zinc-300 dark:border-zinc-700 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                />
                <span className="text-sm">Sistema</span>
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Moeda</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Defina a moeda padrão</p>
          </div>
          <div className="p-6 pt-0">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
            >
              <option value="BRL">Real (R$)</option>
              <option value="USD">Dólar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">Libra (£)</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Idioma</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Defina o idioma do aplicativo</p>
          </div>
          <div className="p-6 pt-0">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Notificações</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Gerencie suas preferências de notificação</p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Alertas de orçamento</label>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Receba alertas quando estiver próximo do limite de orçamento
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.budgetAlerts}
                  onChange={(e) => setNotifications({ ...notifications, budgetAlerts: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Relatórios semanais</label>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Receba um resumo semanal das suas finanças</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.weeklyReports}
                  onChange={(e) => setNotifications({ ...notifications, weeklyReports: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Dicas financeiras</label>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Receba dicas para melhorar suas finanças</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.tips}
                  onChange={(e) => setNotifications({ ...notifications, tips: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
            <button className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
              Salvar preferências
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
