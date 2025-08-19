"use client";

import Link from "next/link";
import { Wallet } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/shared/Button";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Wallet className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
            <span className="font-bold text-xl">CashWise</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isSignedIn ? (
            <nav className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Button variant="emerald">{t("home.header.dashboard")}</Button>
              </Link>
            </nav>
          ) : (
            <nav className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="neutral">{t("home.header.enter")}</Button>
              </Link>
              <Link href="/register">
                <Button variant="emerald">{t("home.header.register")}</Button>
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
