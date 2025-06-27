"use client";
import { useState, useEffect } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/shared/Button";
import { Input } from "shinodalabs-ui";
import { useAuth } from "@/context/authContext";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/nextjs";

interface VerifyEmailFormProps {
  onResend: () => Promise<void>;
  isResending: boolean;
}

export function VerifyEmailForm({
  onResend,
  isResending,
}: VerifyEmailFormProps) {
  const { t } = useTranslation();
  const { verifyEmailCode } = useAuth();
  const [countdown, setCountdown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const schema = z.object({
    code: z
      .string()
      .min(6, t("verifyEmail.codeMinLength"))
      .max(6, t("verifyEmail.codeMaxLength"))
      .regex(/^\d+$/, t("verifyEmail.codeOnlyNumbers")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

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

  const onSubmit = async (data: FormData) => {
    setIsVerifying(true);
    try {
      await verifyEmailCode(data.code);
      reset();
    } catch (error) {
      Sentry.captureException(error);
      console.error("Erro na verificação:", error);
    } finally {
      setIsVerifying(false);
    }
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
          <span className="font-medium">{t("verifyEmail.codeSent")}</span>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("verifyEmail.codeInstructions")}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            {t("verifyEmail.checkSpam")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Input
                label={t("verifyEmail.verificationCode")}
                placeholder={t("verifyEmail.codePlaceholder")}
                type="number"
                maxLength={6}
                centerContent
                {...field}
                error={errors.code?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="emerald"
            disabled={isVerifying}
            className="w-full"
          >
            {isVerifying ? t("verifyEmail.verifying") : t("verifyEmail.verify")}
          </Button>
        </form>
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
            : t("verifyEmail.resendCode")}
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
