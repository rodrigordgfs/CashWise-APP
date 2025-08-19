import Link from "next/link";
import { useTranslation } from "react-i18next";

export function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
              {t("home.cta.title")}
            </h2>
            <p className="max-w-[600px] text-zinc-500 dark:text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("home.cta.description")}
              financeira com o CashWise
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/register">
              <button className="w-full cursor-pointer sm:w-auto inline-flex items-center justify-center rounded-md bg-emerald-600 px-8 py-3 text-sm font-medium text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                {t("home.cta.startFree")}
              </button>
            </Link>
            <Link href="/pricing">
              <button className="w-full cursor-pointer sm:w-auto inline-flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 px-8 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
                {t("home.cta.viewPlans")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
