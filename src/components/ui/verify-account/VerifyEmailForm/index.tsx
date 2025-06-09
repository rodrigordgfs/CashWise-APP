"use client";
import { useState, useEffect } from "react";
import { Mail, CheckCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/shared/Button";
import { useTranslation } from "react-i18next";

interface VerifyEmailFormProps {
  onResend: () => Promise<void>;
  isResending: boolean;
}

export function VerifyEmailForm({
  onResend,
  isResending
}: VerifyEmailFormProps) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0) return;
    await onResend();
    setCountdown(60);
  };

  return (
    <div className="px-6 py-2 space-y-6">
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
          <Mail className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-500">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">{t("verifyEmail.linkSent")}</span>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("verifyEmail.linkInstructions")}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            {t("verifyEmail.checkSpam")}
          </p>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-zinc-700 dark:text-zinc-300">
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm font-medium">{t("verifyEmail.waitingVerification")}</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {t("verifyEmail.automaticRedirect")}
          </p>
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0 || isResending}
          className="text-sm text-emerald-600 dark:text-emerald-500 hover:underline disabled:text-zinc-400 disabled:no-underline disabled:cursor-not-allowed cursor-pointer"
        >
          {countdown > 0
            ? t("verifyEmail.resendCountdown", { seconds: countdown })
            : isResending
            ? t("verifyEmail.resending")
            : t("verifyEmail.resendLink")}
        </button>
      </div>

      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col space-y-4">
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          {t("verifyEmail.troubleAccessing")}
        </div>
      </div>
    </div>
  );
}