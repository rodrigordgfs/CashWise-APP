"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { InputField } from "@/components/shared/InputField";
import { Button } from "@/components/shared/Button";
import { useAuth } from "@/context/authContext";
import { useTranslation } from "react-i18next";

export function LoginForm() {
  const { t } = useTranslation();

  const { signInWithEmail } = useAuth();

  const schema = z.object({
    email: z
      .string()
      .nonempty(t("login.emailRequiredValidation"))
      .email(t("login.emailInvalidValidation")),
    password: z
      .string()
      .nonempty(t("login.passwordRequiredValidation"))
      .min(8, t("login.passwordMinLengthValidation")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    await signInWithEmail(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 space-y-4">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              id="email"
              label={t("login.email")}
              type="email"
              placeholder={t("login.emailPlaceholder")}
              error={errors.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              label={t("login.password")}
              placeholder={t("login.passwordPlaceholder")}
              type="password"
              error={errors.password?.message}
              {...field}
              headerRight={
                <Link
                  href="/forgot-password"
                  className="text-sm text-emerald-600 dark:text-emerald-500 hover:underline"
                >
                  {t("login.forgotPassword")}
                </Link>
              }
            />
          )}
        />
      </div>

      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col space-y-4">
        <Button
          variant="emerald"
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? <>{t("login.logingIn")}</> : t("login.loginButton")}
        </Button>
        <div className="text-center text-sm">
          {t("login.noAccount")}{" "}
          <Link
            href="/register"
            className="text-emerald-600 dark:text-emerald-500 hover:underline"
          >
            {t("login.signUp")}
          </Link>
        </div>
      </div>
    </form>
  );
}
