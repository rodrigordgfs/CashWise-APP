"use client";

import { useState, useEffect } from "react";
import { Wallet, Moon, Sun, Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar sua jornada financeira",
    features: [
      "Até 50 transações/mês",
      "3 categorias personalizadas",
      "Relatórios básicos",
      "1 conta bancária",
      "Suporte por email",
      "Dashboard básico",
    ],
    limitations: [
      "Relatórios limitados",
      "Sem exportação",
      "Sem backup automático",
    ],
    cta: "Começar Grátis",
    popular: false,
  },
  {
    name: "Pro",
    price: "R$ 9,90",
    period: "/mês",
    description: "Para usuários que querem o máximo controle",
    features: [
      "Transações ilimitadas",
      "Categorias ilimitadas",
      "Relatórios avançados com IA",
      "Múltiplas contas",
      "Orçamentos adaptativos",
      "Exportação CSV/PDF",
      "Suporte prioritário",
      "Backup automático",
      "Análise preditiva",
      "Alertas inteligentes",
    ],
    limitations: [],
    cta: "Começar Teste Grátis",
    popular: true,
  },
  {
    name: "Business",
    price: "R$ 29,90",
    period: "/mês",
    description: "Para equipes e empresas que precisam de mais",
    features: [
      "Tudo do Pro",
      "Até 10 usuários",
      "Relatórios personalizados",
      "API de integração",
      "Consultoria financeira",
      "Integrações bancárias",
      "Suporte telefônico 24/7",
      "Manager dedicado",
      "Compliance avançado",
      "White-label disponível",
    ],
    limitations: [],
    cta: "Falar com Vendas",
    popular: false,
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
              className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
            <nav className="flex items-center space-x-3">
              <Link href="/login">
                <button className="px-4 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  Entrar
                </button>
              </Link>
              <Link href="/register">
                <button className="px-4 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                  Registrar
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Escolha seu plano</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Comece grátis e evolua conforme suas necessidades
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm font-medium ${
                !isAnnual
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              Mensal
            </span>
            <button
              title="Alternar entre planos mensal e anual"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600 dark:bg-emerald-700"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isAnnual
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              Anual
              {isAnnual && (
                <span className="ml-2 text-xs text-emerald-600 dark:text-emerald-500">
                  (2 meses grátis)
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border ${
                plan.popular
                  ? "border-emerald-500 dark:border-emerald-500"
                  : "border-zinc-200 dark:border-zinc-800"
              } bg-white dark:bg-zinc-950 p-6 relative`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    {isAnnual
                      ? `R$ ${(
                          parseFloat(plan.price.replace("R$ ", "")) * 10
                        ).toFixed(2)}`
                      : plan.price}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400 ml-1">
                    {isAnnual ? "/ano" : plan.period}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation) => (
                  <div key={limitation} className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {limitation}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.name === "Starter" ? "/register" : "/login"}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                  plan.popular
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                    : "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {plan.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Perguntas Frequentes</h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {[
              {
                question: "Posso cancelar a qualquer momento?",
                answer:
                  "Sim, você pode cancelar sua assinatura quando quiser sem taxas adicionais.",
              },
              {
                question: "Como funciona o período de teste?",
                answer:
                  "Oferecemos 14 dias de teste gratuito em todos os planos pagos.",
              },
              {
                question: "Posso mudar de plano depois?",
                answer:
                  "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.",
              },
              {
                question: "Quais formas de pagamento são aceitas?",
                answer:
                  "Aceitamos cartões de crédito, débito e PIX para todos os planos.",
              },
            ].map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 text-left"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-500 mr-2" />
              <span className="font-bold">CashWise</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/terms"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Termos
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Privacidade
              </Link>
              <Link
                href="/contact"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
