import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { MenuProvider } from "@/context/menuContext";
// import { ThemeProvider } from "@/context/darkModeContext";
import { dark } from "@clerk/themes";
import { SidebarProvider } from "@/context/sidebarContext";
import { TransactionProvider } from "@/context/transactionsContext";

import "./globals.css";
import "react-day-picker/dist/style.css";
import { ClerkProvider } from "@clerk/nextjs";
import { BudgetProvider } from "@/context/budgetContext";
import { CategoryProvider } from "@/context/categoryContext";
import { ReportsProvider } from "@/context/reportContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CashWise - Gerenciamento Financeiro",
  description: "Controle suas finanças de forma inteligente com o CashWise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="pt-BR" className="dark" suppressHydrationWarning>
        <body
          className={`${inter.className} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}
          suppressHydrationWarning
        >
          <ReportsProvider>
            <CategoryProvider>
              <BudgetProvider>
                <TransactionProvider>
                  <SidebarProvider>
                    <MenuProvider>
                      {children}
                      <Toaster richColors />
                    </MenuProvider>
                  </SidebarProvider>
                </TransactionProvider>
              </BudgetProvider>
            </CategoryProvider>
          </ReportsProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
