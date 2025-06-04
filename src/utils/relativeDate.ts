import { Period } from "@/types/Period.type";
import { startOfMonth, subMonths, subYears, format } from "date-fns";

export const getRelativeDate = (period: string) => {
  const now = new Date();

  const date = (() => {
    switch (period) {
      case Period.MONTH:
        return subMonths(now, 1);
      case Period.TRIMESTER:
        return subMonths(now, 3);
      case Period.SEMESTER:
        return subMonths(now, 6);
      case Period.YEAR:
        return subYears(now, 1);
      default:
        return now;
    }
  })();

  return format(startOfMonth(date), "yyyy-MM-dd");
};
