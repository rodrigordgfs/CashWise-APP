"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/shared/Button";
import { Input } from "shinodalabs-ui";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const PersonalInfoCard = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const schema = z.object({
    name: z.string().min(1, t("profile.nameRequiredValidation")),
    email: z.string().email(t("profile.emailRequiredValidation")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: String(user?.unsafeMetadata?.name || ""),
        email: String(user?.emailAddresses[0]?.emailAddress || ""),
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    await user?.update({
      unsafeMetadata: { name: data.name },
    });
    toast.success("Dados salvos com sucesso!");
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">{t("profile.personalInfo")}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("profile.personalInfoDescription")}
        </p>
      </div>
      <div className="p-6 pt-0">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  label={t("profile.name")}
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
                  label={t("profile.email")}
                  type="email"
                  disabled
                  {...field}
                  error={errors.email?.message}
                />
              )}
            />
            <div className="flex gap-2 pt-4">
              <Button type="submit">{t("profile.save")}</Button>
              <Button
                type="button"
                variant="neutral"
                onClick={() => {
                  reset();
                  setIsEditing(false);
                }}
              >
                {t("profile.cancel")}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("profile.name")}
              </label>
              <p className="text-sm">
                {(user?.unsafeMetadata?.name as string) || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("profile.email")}
              </label>
              <p className="text-sm">
                {(user?.emailAddresses[0]?.emailAddress as string) || "-"}
              </p>
            </div>
            <Button onClick={() => setIsEditing(true)}>
              {t("profile.edit")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
