import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
              {t("home.testimonials.title")}
            </h2>
            <p className="max-w-[900px] text-zinc-500 dark:text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("home.testimonials.description")}
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
              {t("home.testimonials.testimonial1.feedback")}
            </p>
            <div>
              <div className="font-semibold">
                {t("home.testimonials.testimonial1.name")}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("home.testimonials.testimonial1.role")}
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
              {t("home.testimonials.testimonial2.feedback")}
            </p>
            <div>
              <div className="font-semibold">
                {t("home.testimonials.testimonial2.name")}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("home.testimonials.testimonial2.role")}
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
              {t("home.testimonials.testimonial3.feedback")}
            </p>
            <div>
              <div className="font-semibold">
                {t("home.testimonials.testimonial3.name")}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("home.testimonials.testimonial3.role")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
