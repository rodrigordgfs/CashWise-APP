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
  type: TransactionType;
  description: string;
  category: Category;
  date: string;
  account: string;
  amount: number;
}
