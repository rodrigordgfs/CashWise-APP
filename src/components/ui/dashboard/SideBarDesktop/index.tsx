"use client"

import { BarChart3, CreditCard, LogOut, PieChart, Settings, User, Wallet } from "lucide-react"
import { NavItem } from "../NavItem"
import { usePathname } from "next/navigation"
import Home from "@/app/page"
import { useSidebar } from "@/context/sidebarContext"

export const SideBarDesktop = () => {
    const { isSidebarOpen } = useSidebar()
    const pathname = usePathname()

    return <aside
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
}