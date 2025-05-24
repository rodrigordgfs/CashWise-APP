"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

export enum Period {
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

interface TransactionContextProps {
  period: Period;
  setPeriod: (newPeriod: Period) => void;
}

const TransactionContext = createContext<TransactionContextProps | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [period, setPeriod] = useState<Period>(Period.WEEK);

  const value = useMemo(
    () => ({
      period,
      setPeriod,
    }),
    [period]
  );

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = (): TransactionContextProps => {
  const context = useContext(TransactionContext);
  if (!context)
    throw new Error("useTransaction must be used within a TransactionProvider");
  return context;
};
