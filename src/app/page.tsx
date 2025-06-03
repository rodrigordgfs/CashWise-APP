"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  CreditCard,
  LineChart,
  Moon,
  PieChart,
  Sun,
  Wallet,
  ChevronRight,
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Star,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/shared/Button";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const { isSignedIn } = useUser();

  useEffect(() => {
    // Check if dark mode is enabled on initial load
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

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Wallet className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              <span className="font-bold text-xl">CashWise</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <button
              onClick={toggleDarkMode}
              className="hidden md:inline-flex p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
            {isSignedIn ? (
              <nav className="flex items-center space-x-3">
                <Link href="/dashboard">
                  <Button variant="emerald">Dashboard</Button>
                </Link>
              </nav>
            ) : (
              <nav className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="neutral">Entrar</Button>
                </Link>
                <Link href="/register">
                  <Button variant="emerald">Registrar</Button>
                </Link>
              </nav>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Controle suas finanças de forma inteligente
                  </h1>
                  <p className="max-w-[600px] text-zinc-500 dark:text-zinc-400 md:text-xl">
                    O CashWise oferece ferramentas avançadas para gerenciar suas
                    finanças pessoais com facilidade e precisão.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-emerald-600 px-8 py-3 text-sm font-medium text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                      Começar Gratuitamente
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </Link>
                  <Link href="/pricing">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 px-8 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
                      Ver Planos
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Dashboard Preview */}
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <CreditCard className="h-8 w-8 text-emerald-600 dark:text-emerald-500 mb-2" />
                    <h3 className="font-semibold">Transações</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Controle completo
                    </p>
                  </div>
                  <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <LineChart className="h-8 w-8 text-blue-600 dark:text-blue-500 mb-2" />
                    <h3 className="font-semibold">Relatórios</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Análises detalhadas
                    </p>
                  </div>
                  <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <PieChart className="h-8 w-8 text-purple-600 dark:text-purple-500 mb-2" />
                    <h3 className="font-semibold">Categorias</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Organização inteligente
                    </p>
                  </div>
                  <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <Shield className="h-8 w-8 text-amber-600 dark:text-amber-500 mb-2" />
                    <h3 className="font-semibold">Segurança</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Dados protegidos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                  Recursos Principais
                </h2>
                <p className="max-w-[900px] text-zinc-500 dark:text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Descubra todas as funcionalidades que fazem do CashWise a
                  melhor escolha para suas finanças
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900">
                  <LineChart className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold mt-4">
                  Dashboard Inteligente
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                  Visualize suas finanças com gráficos interativos e insights em
                  tempo real.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                </div>
                <h3 className="text-lg font-bold mt-4">
                  Controle de Transações
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                  Gerencie todas suas transações com categorização automática e
                  filtros avançados.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                  <PieChart className="h-6 w-6 text-purple-600 dark:text-purple-500" />
                </div>
                <h3 className="text-lg font-bold mt-4">
                  Orçamentos Inteligentes
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                  Crie e monitore orçamentos com alertas automáticos e análises
                  preditivas.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
                  <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                </div>
                <h3 className="text-lg font-bold mt-4">Relatórios Avançados</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                  Gere relatórios detalhados com análises de tendências e
                  projeções futuras.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
                  <Shield className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <h3 className="text-lg font-bold mt-4">Segurança Total</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                  Seus dados protegidos com criptografia de nível bancário e
                  autenticação segura.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900">
                  <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-500" />
                </div>
                <h3 className="text-lg font-bold mt-4">Colaboração</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                  Compartilhe orçamentos familiares e empresariais com controles
                  de acesso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                  O que nossos usuários dizem
                </h2>
                <p className="max-w-[900px] text-zinc-500 dark:text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Veja como o CashWise está transformando a vida financeira de
                  pessoas reais
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                  &quot;O CashWise revolucionou como gerencio as finanças da
                  minha empresa. A interface é incrível!&quot;
                </p>
                <div>
                  <div className="font-semibold">Maria Silva</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Empreendedora
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                  &quot;Interface incrível e funcionalidades que realmente fazem
                  diferença. Recomendo 100%!&quot;
                </p>
                <div>
                  <div className="font-semibold">João Santos</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Desenvolvedor
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                  &quot;Finalmente consegui organizar minhas finanças. O app é
                  intuitivo e muito poderoso.&quot;
                </p>
                <div>
                  <div className="font-semibold">Ana Costa</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Consultora
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                  Pronto para transformar suas finanças?
                </h2>
                <p className="max-w-[600px] text-zinc-500 dark:text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Junte-se a milhares de usuários que já transformaram sua vida
                  financeira com o CashWise
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-emerald-600 px-8 py-3 text-sm font-medium text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                    Começar Gratuitamente
                  </button>
                </Link>
                <Link href="/pricing">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 px-8 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    Ver Planos
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            <span className="font-bold">CashWise</span>
          </div>
          <p className="text-center text-sm leading-loose text-zinc-500 dark:text-zinc-400 md:text-left">
            © 2025 CashWise. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Termos
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Privacidade
            </Link>
            <Link
              href="/contact"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
