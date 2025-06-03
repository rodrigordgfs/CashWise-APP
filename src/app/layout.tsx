import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";

import "./globals.css";
import "react-day-picker/dist/style.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";

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
  metadataBase: new URL("https://cash-wise-one.vercel.app/"),
  openGraph: {
    title: "CashWise - Gerenciamento Financeiro",
    description: "Controle suas finanças de forma inteligente com o CashWise.",
    url: "https://cash-wise-one.vercel.app/",
    siteName: "CashWise",
    images: [
      {
        url: "/og-image.png", // substitua pelo caminho real
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
    images: ["/og-image.png"], // substitua pelo caminho real
    creator: "@cashwise_app", // se tiver um handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#10b981", // verde-emerald
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
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
