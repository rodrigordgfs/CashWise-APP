"use client";

import { useAuth } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { MenuProvider } from "@/context/menuContext";
import { ThemeProvider } from "@/context/darkModeContext";
import { SidebarProvider } from "@/context/sidebarContext";
import { TransactionProvider } from "@/context/transactionsContext";
import { BudgetProvider } from "@/context/budgetContext";
import { CategoryProvider } from "@/context/categoryContext";
import { ReportsProvider } from "@/context/reportContext";
import { DashboardProvider } from "@/context/dashboardContext";
import { AppLoader } from "@/components/shared/AppLoader";

export function Providers({ children }: { children: ReactNode }) {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <AppLoader />;
  }

  return (
    <DashboardProvider>
      <ReportsProvider>
        <CategoryProvider>
          <BudgetProvider>
            <TransactionProvider>
              <SidebarProvider>
                <MenuProvider>
                  <ThemeProvider>
                    {children}
                    <Toaster richColors />
                  </ThemeProvider>
                </MenuProvider>
              </SidebarProvider>
            </TransactionProvider>
          </BudgetProvider>
        </CategoryProvider>
      </ReportsProvider>
    </DashboardProvider>
  );
}
