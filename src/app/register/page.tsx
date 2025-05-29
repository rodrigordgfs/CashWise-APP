"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { AuthHeader } from "@/components/ui/register/AuthHeader";
import { AuthCard } from "@/components/ui/register/AuthCard";
import { InputField } from "@/components/shared/InputField";
import { Button } from "@/components/shared/Button";

const schema = z
  .object({
    name: z.string().nonempty({ message: "Nome completo é obrigatório" }),
    email: z
      .string()
      .nonempty({ message: "E-mail é obrigatório" })
      .email({ message: "E-mail inválido" }),
    password: z
      .string()
      .nonempty({ message: "Senha é obrigatória" })
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirme sua senha" })
      .min(6, { message: "A confirmação deve ter no mínimo 6 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();

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
    console.log("Dados de registro:", data);
    toast.success("Conta criada com sucesso!");
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-zinc-900 px-4 pt-24 pb-8">
      <AuthHeader />
      <AuthCard
        title="Criar conta"
        description="Preencha os dados abaixo para se registrar"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-4">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <InputField
                  id="name"
                  label="Nome completo"
                  placeholder="Seu nome completo"
                  {...field}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <InputField
                  id="email"
                  label="E-mail"
                  type="email"
                  placeholder="seu@email.com"
                  {...field}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <InputField
                  id="password"
                  label="Senha"
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
                <InputField
                  id="confirmPassword"
                  label="Confirmar senha"
                  type="password"
                  {...field}
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </div>
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col space-y-4">
            <Button variant="emerald" type="submit" disabled={isSubmitting}>
              Criar conta
            </Button>
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-emerald-600 dark:text-emerald-500 hover:underline"
              >
                Entrar
              </Link>
            </div>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
