"use client";

import {
  BarChart3,
  CreditCard,
  Home as HomeIcon,
  LogOut,
  PieChart,
  Settings,
  Target,
  User,
  Wallet,
  X,
} from "lucide-react";
import { NavItem } from "../NavItem";
import { usePathname, useRouter } from "next/navigation";
import { useMenu } from "@/context/menuContext";
import { LogoButton } from "../LogoButton";
import { IconButton } from "@/components/shared/IconButton";
import { useAuth } from "@clerk/nextjs";
import { useTranslation } from "react-i18next";

export const MobileMenu = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { closeMobileMenu } = useMenu();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const handleItemClick = () => {
    closeMobileMenu();
  };

  const handleOverlayClick = () => {
    closeMobileMenu();
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
      onClick={handleOverlayClick}
    >
      <div
        className="fixed inset-y-0 left-0 w-[240px] bg-white dark:bg-zinc-950 shadow-lg animate-in slide-in-from-left duration-300"
        onClick={handleMenuClick}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <LogoButton />
          <IconButton icon={X} name="Fechar menu" onClick={closeMobileMenu} />
        </div>

        <div className="flex flex-col space-y-1 p-4">
          <NavItem
            href="/dashboard"
            icon={HomeIcon}
            title={t("menu.dashboard")}
            isActive={pathname === "/dashboard"}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/transactions"
            icon={CreditCard}
            title={t("menu.transactions")}
            isActive={pathname.startsWith("/dashboard/transactions")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/categories"
            icon={PieChart}
            title={t("menu.categories")}
            isActive={pathname.startsWith("/dashboard/categories")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/budgets"
            icon={Wallet}
            title={t("menu.budgets")}
            isActive={pathname.startsWith("/dashboard/budgets")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/goals"
            icon={Target}
            title={t("menu.goals")}
            isActive={pathname.startsWith("/dashboard/goals")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/reports"
            icon={BarChart3}
            title={t("menu.reports")}
            isActive={pathname.startsWith("/dashboard/reports")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/settings"
            icon={Settings}
            title={t("menu.settings")}
            isActive={pathname.startsWith("/dashboard/settings")}
            onClick={handleItemClick}
          />
          <NavItem
            href="/dashboard/profile"
            icon={User}
            title={t("menu.profile")}
            isActive={pathname.startsWith("/dashboard/profile")}
            onClick={handleItemClick}
          />
        </div>

        <div className="absolute bottom-4 w-full px-4">
          <button
            className="w-full flex items-center px-3 py-2 rounded-md text-red-500 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            {t("menu.logout")}
          </button>
        </div>
      </div>
    </div>
  );
};
