"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthHeader } from "@/components/ui/register/AuthHeader";
import { AuthCard } from "@/components/ui/register/AuthCard";
import { InputField } from "@/components/shared/InputField";
import { Button } from "@/components/shared/Button";
import { useTranslation } from "react-i18next";

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

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
    defaultValues: {
      code: "",
    },
  });

  // Countdown para reenvio
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = async (data: FormData) => {
    if (!signUp) return;

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success(t("verifyEmail.verificationSuccess"));
        router.push("/dashboard");
      } else {
        toast.error(t("verifyEmail.verificationIncomplete"));
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      console.error("Erro na verificação:", err);
      toast.error(
        error.errors?.[0]?.message || t("verifyEmail.verificationError")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!signUp || countdown > 0) return;

    setIsResending(true);
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      toast.success(t("verifyEmail.codeResent"));
      setCountdown(60); // 60 segundos de countdown
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      console.error("Erro ao reenviar código:", err);
      toast.error(
        error.errors?.[0]?.message || t("verifyEmail.resendError")
      );
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
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            {/* Ícone de email */}
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                <svg
                  className="h-8 w-8 text-emerald-600 dark:text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Instruções */}
            <div className="text-center space-y-2">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("verifyEmail.instructions")}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500">
                {t("verifyEmail.checkSpam")}
              </p>
            </div>

            {/* Campo de código */}
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <InputField
                  id="code"
                  label={t("verifyEmail.verificationCode")}
                  placeholder={t("verifyEmail.codePlaceholder")}
                  {...field}
                  error={errors.code?.message}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              )}
            />

            {/* Botão de reenvio */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={countdown > 0 || isResending}
                className="text-sm text-emerald-600 dark:text-emerald-500 hover:underline disabled:text-zinc-400 disabled:no-underline disabled:cursor-not-allowed"
              >
                {countdown > 0
                  ? t("verifyEmail.resendCountdown", { seconds: countdown })
                  : isResending
                  ? t("verifyEmail.resending")
                  : t("verifyEmail.resendCode")}
              </button>
            </div>
          </div>

          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col space-y-4">
            <Button
              variant="emerald"
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading
                ? t("verifyEmail.verifying")
                : t("verifyEmail.verifyButton")}
            </Button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:underline"
              >
                {t("verifyEmail.backToLogin")}
              </button>
            </div>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}