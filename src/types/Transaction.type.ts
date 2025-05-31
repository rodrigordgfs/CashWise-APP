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
  id?: number;
  type: TransactionType;
  description: string;
  category: string;
  date: string;
  account: string;
  amount: number;
}
