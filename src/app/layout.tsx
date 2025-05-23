import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ReactNode } from "react";
import { MenuProvider } from "@/context/menuContext";
import { ThemeProvider } from "@/context/darkModeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CashWise - Gerenciamento Financeiro",
  description: "Controle suas finanças de forma inteligente com o CashWise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ThemeProvider>
      <MenuProvider>
        <html lang="pt-BR" className="h-full">
          <body
            className={`${inter.className} h-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}
          >
            {children}
            <Script id="theme-switcher">
              {`
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          `}
            </Script>
          </body>
        </html>
      </MenuProvider>
    </ThemeProvider>
  );
}
