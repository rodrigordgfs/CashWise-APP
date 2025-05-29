"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";

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
        <h3 className="text-lg font-semibold">Segurança</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Gerencie sua senha
        </p>
      </div>
      <div className="p-6 pt-0">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <InputField
                label="Nova senha"
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
              <InputField
                label="Confirmar nova senha"
                type="password"
                {...field}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <div className="pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Alterar senha"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
