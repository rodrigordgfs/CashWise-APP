"use client";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";

import { InputField } from "@/components/shared/InputField";
import { Button } from "@/components/shared/Button";
import { ResendCodeButton } from "../ResendCodeButton";
import { useTranslation } from "react-i18next";

interface VerifyEmailFormProps {
  onSubmit: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading: boolean;
  isResending: boolean;
}

export function VerifyEmailForm({
  onSubmit,
  onResend,
  isLoading,
  isResending
}: VerifyEmailFormProps) {
    const { t } = useTranslation();

  const schema = z.object({
    code: z
      .string()
      .nonempty({ message: t("verifyEmail.codeRequiredValidation") })
      .length(6, { message: t("verifyEmail.codeInvalidValidation") }),
  });
  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
  });

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
    <form
      onSubmit={handleSubmit(({ code }) => onSubmit(code))}
      className="px-6 py-2 space-y-6"
    >
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
          <Mail className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {t("verifyEmail.instructions")}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          {t("verifyEmail.checkSpam")}
        </p>
      </div>

      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <InputField
            id="code"
            label={t("verifyEmail.verificationCode")}
            placeholder={t("verifyEmail.codePlaceholder")}
            error={errors.code?.message}
            type="number"
            maxLength={6}
            centerContent
            {...field}
          />
        )}
      />

      <div className="text-center">
        <ResendCodeButton
          onResend={handleResend}
          countdown={countdown}
          isResending={isResending}
          labelTexts={{
            resendCode: t("verifyEmail.resendCode"),
            resending: t("verifyEmail.resending"),
            resendCountdown: (seconds) =>
              t("verifyEmail.resendCountdown", { seconds }),
          }}
        />
      </div>

      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col space-y-4">
        <Button variant="emerald" type="submit" disabled={isLoading} className="w-full">
          {isLoading ? t("verifyEmail.verifying") : t("verifyEmail.verifyButton")}
        </Button>
      </div>
    </form>
  );
}
