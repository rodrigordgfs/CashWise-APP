import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "react-day-picker/dist/style.css";

import { ClerkProvider } from "@clerk/nextjs";
import { I18nextProviderWrapper } from "./I18nextProviderWrapper";
import { Providers } from "./providers";
import { SettingsProvider } from "@/context/settingsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CashWise - Gerenciamento Financeiro",
    template: "%s | CashWise",
  },
  description: "Controle suas finanças de forma inteligente com o CashWise.",
  keywords: [
    "controle financeiro",
    "gerenciamento de finanças",
    "CashWise",
    "orçamento pessoal",
    "despesas",
    "economia",
    "investimentos",
    "planejamento financeiro",
  ],
  authors: [
    { name: "Rodrigo Shinoda", url: "https://github.com/rodrigordgfs" },
  ],
  creator: "CashWise",
  metadataBase: new URL("https://appcashwise.com.br/"),
  openGraph: {
    title: "CashWise - Gerenciamento Financeiro",
    description: "Controle suas finanças de forma inteligente com o CashWise.",
    url: "https://appcashwise.com.br/",
    siteName: "CashWise",
    images: [
      {
        url: "/screenshots/dashboard.png",
        width: 1200,
        height: 630,
        alt: "CashWise - Gerenciamento Financeiro",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CashWise - Gerenciamento Financeiro",
    description: "Controle suas finanças de forma inteligente com o CashWise.",
    images: ["/screenshots/dashboard.png"],
    creator: "@cashwise_app",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#10b981" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme');
                    if (
                      theme === 'dark' ||
                      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
                    ) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } catch (e) {}
                })()
              `,
            }}
          />
        </head>
        <body
          className={`${inter.className} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}
          suppressHydrationWarning
        >
          <I18nextProviderWrapper>
            <SettingsProvider>
              <Providers>{children}</Providers>
            </SettingsProvider>
          </I18nextProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
