"use client";

import { useAuth } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { MenuProvider } from "@/context/menuContext";
import { SettingsProvider } from "@/context/settingsContext";
import { SidebarProvider } from "@/context/sidebarContext";
import { TransactionProvider } from "@/context/transactionsContext";
import { BudgetProvider } from "@/context/budgetContext";
import { CategoryProvider } from "@/context/categoryContext";
import { ReportsProvider } from "@/context/reportContext";
import { DashboardProvider } from "@/context/dashboardContext";
import { AppLoader } from "@/components/shared/AppLoader";
import { GoalProvider } from "@/context/goalContext";
import { AuthProvider } from "@/context/authContext";
import { DialogProvider } from "@/context/dialogContext";

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
              <GoalProvider>
                <SidebarProvider>
                  <MenuProvider>
                    <SettingsProvider>
                      <AuthProvider>
                        <DialogProvider>
                          {children}
                          <Toaster richColors />
                        </DialogProvider>
                      </AuthProvider>
                    </SettingsProvider>
                  </MenuProvider>
                </SidebarProvider>
              </GoalProvider>
            </TransactionProvider>
          </BudgetProvider>
        </CategoryProvider>
      </ReportsProvider>
    </DashboardProvider>
  );
}
