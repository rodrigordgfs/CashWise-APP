"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { Button } from "shinodalabs-ui";
import { Input } from "shinodalabs-ui";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/nextjs";

const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, "A nova senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme sua nova senha"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export const SecurityCard = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    try {
      setIsLoading(true);
      await user.updatePassword({ newPassword: data.newPassword });
      toast.success("Senha alterada com sucesso");
      reset();
    } catch (err: unknown) {
      Sentry.captureException(err);
      const error = err as { errors?: { message: string }[] };
      console.error("Erro ao alterar a senha:", err);
      toast.error(error.errors?.[0]?.message || "Erro ao alterar a senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">{t("profile.security")}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("profile.securityDescription")}
        </p>
      </div>
      <div className="p-6 pt-0">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input
                label={t("profile.newPassword")}
                type="password"
                {...field}
                error={errors.newPassword?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                label={t("profile.confirmPassword")}
                type="password"
                {...field}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <div className="pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t("profile.saving") : t("profile.changePassword")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
