import { TransactionType } from "./Transaction.type";

export interface Category {
  id?: string;
  name: string;
  type: TransactionType;
  color?: string;
  icon?: string;
}
