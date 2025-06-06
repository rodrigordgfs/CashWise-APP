import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  CreditCard,
  LineChart,
  PieChart,
  Shield,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {t("home.hero.title")}
              </h1>
              <p className="max-w-[600px] text-zinc-500 dark:text-zinc-400 md:text-xl">
                {t("home.hero.description")}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-emerald-600 px-8 py-3 text-sm font-medium text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                  {t("home.hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
              <Link href="/pricing">
                <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 px-8 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  {t("home.hero.plans")}
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
                <h3 className="font-semibold">
                  {t("home.hero.features.feature1.title")}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t("home.hero.features.feature1.description")}
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                <LineChart className="h-8 w-8 text-blue-600 dark:text-blue-500 mb-2" />
                <h3 className="font-semibold">
                  {t("home.hero.features.feature2.title")}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t("home.hero.features.feature2.description")}
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                <PieChart className="h-8 w-8 text-purple-600 dark:text-purple-500 mb-2" />
                <h3 className="font-semibold">
                  {t("home.hero.features.feature3.title")}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t("home.hero.features.feature3.description")}
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                <Shield className="h-8 w-8 text-amber-600 dark:text-amber-500 mb-2" />
                <h3 className="font-semibold">
                  {t("home.hero.features.feature4.title")}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t("home.hero.features.feature4.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
