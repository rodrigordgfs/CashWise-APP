export type TransactionType = "income" | "expense";

export interface Transaction {
  id?: number;
  type: TransactionType;
  description: string;
  category: string;
  date: string;
  account: string;
  amount: number;
}
