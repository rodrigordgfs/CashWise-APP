import { TransactionType } from "./Transaction.type";

export interface Category {
  id: number;
  name: string;
  type: TransactionType;
  color?: string;
  icon?: string;
}
