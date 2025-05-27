"use client";

import { useState, useEffect } from "react";
import {
  Check,
  X,
  AlertCircle,
  Star,
  Zap,
  Crown,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";

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
    priceId: null,
    gradient: "from-zinc-500 to-zinc-600",
    bgGradient: "from-zinc-500/10 to-zinc-600/10",
    icon: Zap,
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
    priceId: "price_pro_monthly",
    gradient: "from-emerald-500 to-blue-500",
    bgGradient: "from-emerald-500/10 to-blue-500/10",
    icon: Crown,
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
    priceId: "price_business_monthly",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    icon: Shield,
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handlePlanSelection = async (plan: (typeof plans)[0]) => {
    if (plan.name === "Starter") {
      // Redirecionar para registro gratuito
      window.location.href = "/register";
      return;
    }

    if (plan.name === "Business") {
      // Redirecionar para contato de vendas
      window.location.href = "mailto:vendas@cashwise.com";
      return;
    }

    if (!plan.priceId) {
      setError("Plano não disponível no momento");
      return;
    }

    setLoading(plan.name);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          userId: "demo_user", // Substituir pelo ID do usuário real
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar pagamento");
      }

      // Verificar se o Stripe está disponível
      const stripePublishableKey =
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

      if (!stripePublishableKey) {
        setError(
          "Sistema de pagamento não configurado. Entre em contato com o suporte."
        );
        return;
      }

      //   const { loadStripe } = await import("@stripe/stripe-js")
      //   const stripe = await loadStripe(stripePublishableKey)

      //   if (!stripe) {
      //     setError("Erro ao carregar sistema de pagamento")
      //     return
      //   }

      //   await stripe.redirectToCheckout({ sessionId: data.sessionId })
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "Erro inesperado");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-12">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-zinc-950 dark:via-emerald-950/20 dark:to-blue-950/20"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.15), transparent 40%)`,
          }}
        ></div>
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full px-6 py-3 text-sm bg-gradient-to-r from-emerald-100/80 to-blue-100/80 dark:from-emerald-900/30 dark:to-blue-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm mb-6">
            <Sparkles className="mr-2 h-4 w-4" />
            Planos Inteligentes
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-zinc-900 via-emerald-600 to-blue-600 dark:from-zinc-100 dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
              Escolha seu futuro
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
              financeiro
            </span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8 max-w-3xl mx-auto">
            Comece grátis e evolua conforme suas necessidades. Todos os planos
            incluem nossa IA financeira avançada.
          </p>

          {error && (
            <div className="bg-red-50/80 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 rounded-2xl p-4 mb-8 max-w-md mx-auto backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Toggle Anual/Mensal */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <span
              className={`text-lg font-medium ${
                !isAnnual
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              Mensal
            </span>
            <button
              title="Alternar entre planos mensais e anuais"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:scale-105"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                  isAnnual ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-lg font-medium ${
                isAnnual
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              Anual
            </span>
            {isAnnual && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />2 meses grátis
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:scale-105 ${
                plan.popular
                  ? "border-emerald-500/50 ring-2 ring-emerald-500/20 shadow-2xl shadow-emerald-500/25"
                  : "border-white/20 dark:border-zinc-800/50 hover:border-emerald-500/30"
              }`}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl"></div>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 text-sm font-medium rounded-full shadow-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current" />
                      Mais Popular
                    </div>
                  </div>
                </div>
              )}

              <div className="relative p-8">
                {/* Icon */}
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${plan.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <plan.icon className="h-8 w-8 text-white" />
                </div>

                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {isAnnual && plan.name !== "Starter"
                        ? `R$ ${(
                            Number.parseFloat(plan.price.replace("R$ ", "")) *
                            10
                          ).toFixed(0)}`
                        : plan.price}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400 text-lg">
                      {isAnnual && plan.name !== "Starter"
                        ? "/ano"
                        : plan.period}
                    </span>
                    {isAnnual && plan.name !== "Starter" && (
                      <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                        Economize R${" "}
                        {(
                          Number.parseFloat(plan.price.replace("R$ ", "")) * 2
                        ).toFixed(0)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <li
                      key={limitationIndex}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <X className="h-3 w-3 text-red-500" />
                      </div>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {limitation}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelection(plan)}
                  disabled={loading === plan.name}
                  className={`group/btn w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700 shadow-lg hover:shadow-emerald-500/25"
                      : "border-2 border-white/20 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-zinc-800/80 hover:border-emerald-500/50"
                  }`}
                >
                  {loading === plan.name ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      {plan.cta}
                      <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
              Perguntas Frequentes
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Tudo o que você precisa saber sobre nossos planos
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "Posso cancelar a qualquer momento?",
                answer:
                  "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento. Seus dados ficam seguros por 30 dias.",
              },
              {
                question: "Há período de teste gratuito?",
                answer:
                  "Sim, oferecemos 14 dias de teste gratuito para todos os planos pagos. Teste todas as funcionalidades sem compromisso.",
              },
              {
                question: "Meus dados estão seguros?",
                answer:
                  "Utilizamos criptografia de nível militar e seguimos as melhores práticas de segurança. Seus dados nunca são compartilhados.",
              },
              {
                question: "Posso mudar de plano depois?",
                answer:
                  "Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/20 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-6 hover:scale-105 transition-all duration-300"
              >
                <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 p-12 text-center">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Pronto para revolucionar suas finanças?
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Junte-se a milhares de usuários que já transformaram sua vida
                financeira
              </p>
              <button
                onClick={() => (window.location.href = "/register")}
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-full bg-white text-emerald-600 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Começar Gratuitamente
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
