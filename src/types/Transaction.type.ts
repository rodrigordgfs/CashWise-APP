
import { RecurrenceInterval } from "@/components/ui/transactions/TransactionModal";
import { Category } from "./Category.type";

export enum TransactionType {
  Income = "INCOME",
  Expense = "EXPENSE",
}

export enum TransactionTypeFilter {
  All = "",
  Income = "INCOME",
  Expense = "EXPENSE",
}

export interface Transaction {
  id?: string;
  userId?: string;
  type: TransactionType;
  description: string;
  category: Category;
  paid?: boolean;
  date: string;
  account: string;
  amount: number;
  recurrenceInterval?: RecurrenceInterval | undefined;
  recurrenceCount?: number | undefined;
}
