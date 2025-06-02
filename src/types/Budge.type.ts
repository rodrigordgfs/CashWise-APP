import { Category } from "./Category.type";

export type Budget = {
  id?: string;
  category: Category;
  limit: number;
  spent?: number;
  date: string;
};
