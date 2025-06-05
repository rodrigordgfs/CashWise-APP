import { Category } from "./Category.type";

export interface Goal {
  id?: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: Category;
}