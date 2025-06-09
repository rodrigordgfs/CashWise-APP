"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { AuthHeader } from "@/components/ui/register/AuthHeader";
import { AuthCard } from "@/components/ui/register/AuthCard";
import { useAuth } from "@/context/authContext";
import { VerifyEmailForm } from "@/components/ui/verify-account/VerifyEmailForm";

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const { resendVerificationCode } = useAuth();

  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendVerificationCode();
      toast.success(t("verifyEmail.linkResent"));
    } catch (err) {
      console.error(err);
      toast.error(t("verifyEmail.resendError"));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-zinc-900 px-4 pt-24 pb-8">
      <AuthHeader />
      <AuthCard 
        title={t("verifyEmail.title")} 
        description={t("verifyEmail.description")} 
        centerContent
      >
        <VerifyEmailForm
          onResend={handleResend}
          isResending={isResending}
        />
        <div className="text-center text-sm mb-6">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:underline cursor-pointer"
          >
            {t("verifyEmail.backToLogin")}
          </button>
        </div>
      </AuthCard>
    </div>
  );
}