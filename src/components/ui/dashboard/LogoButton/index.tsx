import { Wallet } from "lucide-react";
import Link from "next/link";

export const LogoButton = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
      <span className="font-bold">CashWise</span>
    </Link>
  );
};
