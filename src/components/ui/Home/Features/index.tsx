import {
  CreditCard,
  LineChart,
  PieChart,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function Features() {
  const { t } = useTranslation();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
              {t("home.features.title")}
            </h2>
            <p className="max-w-[900px] text-zinc-500 dark:text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("home.features.description")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900">
              <LineChart className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold mt-4">
              {t("home.features.feature1.title")}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              {t("home.features.feature1.description")}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            </div>
            <h3 className="text-lg font-bold mt-4">
              {t("home.features.feature2.title")}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              {t("home.features.feature2.description")}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
              <PieChart className="h-6 w-6 text-purple-600 dark:text-purple-500" />
            </div>
            <h3 className="text-lg font-bold mt-4">
              {t("home.features.feature3.title")}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              {t("home.features.feature3.description")}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
              <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-500" />
            </div>
            <h3 className="text-lg font-bold mt-4">
              {t("home.features.feature4.title")}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              {t("home.features.feature4.description")}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
              <Shield className="h-6 w-6 text-red-600 dark:text-red-500" />
            </div>
            <h3 className="text-lg font-bold mt-4">
              {t("home.features.feature5.title")}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              {t("home.features.feature5.description")}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-500" />
            </div>
            <h3 className="text-lg font-bold mt-4">
              {t("home.features.feature6.title")}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              {t("home.features.feature6.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
