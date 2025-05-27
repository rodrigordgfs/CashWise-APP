import { TransactionTypeFilter } from "./TransactionTypeFilter";

export interface Category {
  id: number;
  name: string;
  type: TransactionTypeFilter;
  color?: string;
  icon?: string;
}
