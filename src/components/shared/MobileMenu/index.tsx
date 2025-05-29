"use client";

import {
  BarChart3,
  CreditCard,
  Home as HomeIcon,
  LogOut,
  PieChart,
  Settings,
  User,
  Wallet,
  X,
} from "lucide-react";
import { NavItem } from "../NavItem";
import { usePathname } from "next/navigation";
import { useMenu } from "@/context/menuContext";
import { LogoButton } from "../LogoButton";
import { IconButton } from "@/components/shared/IconButton";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

export const MobileMenu = () => {
  const pathname = usePathname();
  const { closeMobileMenu } = useMenu();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  // Função para fechar ao clicar em um item
  function handleItemClick() {
    closeMobileMenu();
  }

  // Fecha se clicar fora do menu (no overlay)
  function handleOverlayClick() {
    closeMobileMenu();
  }

  // Impede que clique dentro do menu dispare o fechamento (propagação)
  function handleMenuClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
      onClick={handleOverlayClick} // clique fora do menu fecha
    >
      <div
        className="fixed inset-y-0 left-0 w-[240px] bg-white dark:bg-zinc-950 shadow-lg animate-in slide-in-from-left duration-300"
        onClick={handleMenuClick} // impede fechamento clicando dentro do menu
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <LogoButton />
          <IconButton icon={X} name="Close menu" onClick={closeMobileMenu} />
        </div>
        <div className="flex flex-col space-y-1 p-4">
          <NavItem
            href="/dashboard"
            icon={HomeIcon}
            title="Dashboard"
            isActive={pathname === "/dashboard"}
            onClick={handleItemClick} // fecha menu ao clicar
          />
          <NavItem
            href="/dashboard/transactions"
            icon={CreditCard}
            title="Transações"
            isActive={pathname.startsWith("/dashboard/transactions")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/categories"
            icon={PieChart}
            title="Categorias"
            isActive={pathname.startsWith("/dashboard/categories")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/budgets"
            icon={Wallet}
            title="Orçamentos"
            isActive={pathname.startsWith("/dashboard/budgets")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/reports"
            icon={BarChart3}
            title="Relatórios"
            isActive={pathname.startsWith("/dashboard/reports")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/settings"
            icon={Settings}
            title="Configurações"
            isActive={pathname.startsWith("/dashboard/settings")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/profile"
            icon={User}
            title="Perfil"
            isActive={pathname.startsWith("/dashboard/profile")}
            onClick={handleItemClick}
          />
        </div>
        <div className="absolute bottom-4 w-full px-4">
          <button
            className="w-full cursor-pointer flex items-center px-3 py-2 rounded-md transition-all ease-in-out duration-200 text-red-500 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};
