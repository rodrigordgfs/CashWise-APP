"use client";

import Link from "next/link";
import { Wallet } from "lucide-react";
import { LoginForm } from "@/components/ui/login/LoginForm";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
      <div className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center justify-between w-[calc(100%-2rem)]">
        <Link href="/" className="flex items-center">
          <Wallet className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-500" />
          <span className="font-bold">CashWise</span>
        </Link>
      </div>

      <div className="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <div className="p-6 space-y-1">
          <h1 className="text-2xl font-bold">{t("login.title")}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t("login.description")}
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
