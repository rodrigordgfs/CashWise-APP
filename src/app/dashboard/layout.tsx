"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, Home, LogOut, Menu, Moon, PieChart, Settings, Sun, User, Wallet, X } from "lucide-react"

interface NavItemProps {
  href: string
  icon: React.ElementType
  title: string
  isActive: boolean
}

function NavItem({ href, icon: Icon, title, isActive }: NavItemProps) {
  return (
    <Link href={href}>
      <div
        className={`w-full flex items-center px-3 py-2 rounded-md ${
          isActive
            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
        }`}
      >
        <Icon className="mr-2 h-5 w-5" />
        {title}
      </div>
    </Link>
  )
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
        <div className="flex h-14 items-center pl-4 pr-6">
          <div className="mr-4 flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-2 p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
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
              onClick={() => setIsMobileMenuOpen(true)}
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
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside
          className={`${isSidebarOpen ? "w-64" : "w-0"} transition-all duration-300 overflow-hidden flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hidden md:flex`}
        >
          <div className="flex flex-col space-y-1 p-4">
            <NavItem href="/dashboard" icon={Home} title="Dashboard" isActive={pathname === "/dashboard"} />
            <NavItem
              href="/dashboard/transactions"
              icon={CreditCard}
              title="Transações"
              isActive={pathname.startsWith("/dashboard/transactions")}
            />
            <NavItem
              href="/dashboard/categories"
              icon={PieChart}
              title="Categorias"
              isActive={pathname.startsWith("/dashboard/categories")}
            />
            <NavItem
              href="/dashboard/budgets"
              icon={Wallet}
              title="Orçamentos"
              isActive={pathname.startsWith("/dashboard/budgets")}
            />
            <NavItem
              href="/dashboard/reports"
              icon={BarChart3}
              title="Relatórios"
              isActive={pathname.startsWith("/dashboard/reports")}
            />
            <NavItem
              href="/dashboard/settings"
              icon={Settings}
              title="Configurações"
              isActive={pathname.startsWith("/dashboard/settings")}
            />
            <NavItem
              href="/dashboard/profile"
              icon={User}
              title="Perfil"
              isActive={pathname.startsWith("/dashboard/profile")}
            />
          </div>
          <div className="mt-auto p-4">
            <button className="w-full flex items-center px-3 py-2 rounded-md text-red-500 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </button>
          </div>
        </aside>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="fixed inset-y-0 left-0 w-[240px] bg-white dark:bg-zinc-950 shadow-lg">
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center">
                  <Wallet className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-500" />
                  <span className="font-bold">CashWise</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 space-y-1">
                <NavItem href="/dashboard" icon={Home} title="Dashboard" isActive={pathname === "/dashboard"} />
                <NavItem
                  href="/dashboard/transactions"
                  icon={CreditCard}
                  title="Transações"
                  isActive={pathname.startsWith("/dashboard/transactions")}
                />
                <NavItem
                  href="/dashboard/categories"
                  icon={PieChart}
                  title="Categorias"
                  isActive={pathname.startsWith("/dashboard/categories")}
                />
                <NavItem
                  href="/dashboard/budgets"
                  icon={Wallet}
                  title="Orçamentos"
                  isActive={pathname.startsWith("/dashboard/budgets")}
                />
                <NavItem
                  href="/dashboard/reports"
                  icon={BarChart3}
                  title="Relatórios"
                  isActive={pathname.startsWith("/dashboard/reports")}
                />
                <NavItem
                  href="/dashboard/settings"
                  icon={Settings}
                  title="Configurações"
                  isActive={pathname.startsWith("/dashboard/settings")}
                />
                <NavItem
                  href="/dashboard/profile"
                  icon={User}
                  title="Perfil"
                  isActive={pathname.startsWith("/dashboard/profile")}
                />
                <div className="pt-4">
                  <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    {darkMode ? <Sun className="mr-2 h-5 w-5" /> : <Moon className="mr-2 h-5 w-5" />}
                    {darkMode ? "Modo Claro" : "Modo Escuro"}
                  </button>
                </div>
              </div>
              <div className="absolute bottom-4 w-full px-4">
                <button className="w-full flex items-center px-3 py-2 rounded-md text-red-500 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <LogOut className="mr-2 h-5 w-5" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}

        <main className={`flex-1 overflow-auto ${isSidebarOpen ? "" : "w-full"}`}>{children}</main>
      </div>
    </div>
  )
}
