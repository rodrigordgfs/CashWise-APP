"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Moon, Sun, Wallet } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/shared/InputField";
import { Button } from "@/components/shared/Button";

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: "E-mail é obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string()
    .nonempty({ message: "Senha é obrigatória" })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const { signIn, setActive } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setDarkMode(!darkMode);
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (!signIn) {
        throw new Error("signIn não está disponível");
      }

      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Login realizado com sucesso!");
        router.push("/dashboard");
      } else {
        toast.error("Verificação pendente. Verifique seu e-mail.");
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      console.error("Erro ao fazer o login:", err);
      toast.error(error.errors?.[0]?.message || "Erro ao fazer o login.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
      <div className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center justify-between w-[calc(100%-2rem)]">
        <Link href="/" className="flex items-center">
          <Wallet className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-500" />
          <span className="font-bold">CashWise</span>
        </Link>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <div className="p-6 space-y-1">
          <h1 className="text-2xl font-bold">Entrar</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Entre com seu e-mail e senha para acessar sua conta
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputField
                  id="email"
                  label="E-mail"
                  type="email"
                  placeholder="seu@email.com"
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
                  label="Senha"
                  type="password"
                  error={errors.password?.message}
                  {...field}
                  headerRight={
                    <Link
                      href="/forgot-password"
                      className="text-sm text-emerald-600 dark:text-emerald-500 hover:underline"
                    >
                      Esqueceu a senha?
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
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link
                href="/register"
                className="text-emerald-600 dark:text-emerald-500 hover:underline"
              >
                Registre-se
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
