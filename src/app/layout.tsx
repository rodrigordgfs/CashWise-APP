import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/context/menuContext";
import { ThemeProvider } from "@/context/darkModeContext";
import { SidebarProvider } from "@/context/sidebarContext";

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
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.className} h-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <MenuProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
