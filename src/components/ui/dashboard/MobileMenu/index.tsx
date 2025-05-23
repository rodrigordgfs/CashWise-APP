"use client"

import {
  BarChart3,
  CreditCard,
  LogOut,
  Moon,
  PieChart,
  Settings,
  Sun,
  User,
  Wallet,
  X,
} from "lucide-react";
import { NavItem } from "../NavItem";
import Home from "@/app/page";
import { useTheme } from "@/context/darkModeContext";
import { usePathname } from "next/navigation";
import { useMenu } from "@/context/menuContext";

export const MobileMenu = () => {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();
  const { closeMobileMenu } = useMenu();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
      <div className="fixed inset-y-0 left-0 w-[240px] bg-white dark:bg-zinc-950 shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center">
            <Wallet className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-500" />
            <span className="font-bold">CashWise</span>
          </div>
          <button title="Close Button" onClick={() => closeMobileMenu()}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-1">
          <NavItem
            href="/dashboard"
            icon={Home}
            title="Dashboard"
            isActive={pathname === "/dashboard"}
          />
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
              onClick={toggleTheme}
              className="w-full flex items-center px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {isDarkMode ? (
                <Sun className="mr-2 h-5 w-5" />
              ) : (
                <Moon className="mr-2 h-5 w-5" />
              )}
              {isDarkMode ? "Modo Claro" : "Modo Escuro"}
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
  );
};
