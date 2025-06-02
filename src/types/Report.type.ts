export interface MonthlyReport {
  month: string;
  income: number;
  expense: number;
}

export interface CategoryReport {
  name: string;
  value: number;
  fill: string;
}

export interface BalanceReport {
  name: string;
  value: number;
}

export type ReportType =
  | ReportTypeEnum.INCOME_EXPENSE
  | ReportTypeEnum.CATEGORIES
  | ReportTypeEnum.BALANCE;

export enum ReportTypeEnum {
  INCOME_EXPENSE = "income-expense",
  CATEGORIES = "categories",
  BALANCE = "balance",
}
