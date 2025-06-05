// I18nextProviderWrapper.tsx
"use client";

import React, { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../libs/i18n";
import { AppLoader } from "@/components/shared/AppLoader";

export function I18nextProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AppLoader />}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </Suspense>
  );
}
