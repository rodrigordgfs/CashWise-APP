"use client";

import { LoginForm } from "@/components/ui/login/LoginForm";
import { useTranslation } from "react-i18next";
import { AuthHeader } from "@/components/ui/register/AuthHeader";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
      <AuthHeader />
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
