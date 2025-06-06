import { Wallet } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
          <span className="font-bold">CashWise</span>
        </div>
        <p className="text-center text-sm leading-loose text-zinc-500 dark:text-zinc-400 md:text-left">
          {t("home.footer.rights")}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/terms"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {t("home.footer.terms")}
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {t("home.footer.privacy")}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {t("home.footer.contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
