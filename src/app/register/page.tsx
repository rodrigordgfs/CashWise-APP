"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthHeader } from "@/components/ui/register/AuthHeader";
import { AuthCard } from "@/components/ui/register/AuthCard";
import { Input } from "shinodalabs-ui";
import { Button } from "@/components/shared/Button";
import { useAuth } from "@/context/authContext";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation();
  const { registerWithEmail } = useAuth();

  const schema = z
    .object({
      name: z
        .string()
        .nonempty({ message: t("register.nameRequiredValidation") }),
      email: z
        .string()
        .nonempty({ message: t("register.emailRequiredValidation") })
        .email({ message: t("register.emailInvalidValidation") }),
      password: z
        .string()
        .nonempty({ message: t("register.passwordRequiredValidation") })
        .min(6, { message: t("register.passwordMinLengthValidation") }),
      confirmPassword: z
        .string()
        .nonempty({ message: t("register.confirmPasswordRequiredValidation") })
        .min(6, { message: t("register.confirmPasswordMinLengthValidation") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("register.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    await registerWithEmail({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-zinc-900 px-4 pt-24 pb-8">
      <AuthHeader />
      <AuthCard
        title={t("register.title")}
        description={t("register.description")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-4">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  id="name"
                  label={t("register.fullName")}
                  placeholder={t("register.fullNamePlaceholder")}
                  {...field}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  id="email"
                  label={t("register.email")}
                  type="email"
                  placeholder={t("register.emailPlaceholder")}
                  {...field}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  id="password"
                  label={t("register.password")}
                  placeholder={t("register.passwordPlaceholder")}
                  type="password"
                  {...field}
                  error={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input
                  id="confirmPassword"
                  label={t("register.confirmPassword")}
                  placeholder={t("register.confirmPasswordPlaceholder")}
                  type="password"
                  {...field}
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </div>
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col space-y-4">
            <Button variant="emerald" type="submit" disabled={isSubmitting}>
              {t("register.registerButton")}
            </Button>
            <div className="text-center text-sm">
              {t("register.alreadyHaveAccount")}{" "}
              <Link
                href="/login"
                className="text-emerald-600 dark:text-emerald-500 hover:underline"
              >
                {t("register.login")}
              </Link>
            </div>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
