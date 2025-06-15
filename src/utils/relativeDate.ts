import { Period } from "@/types/Period.type";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfYear,
  endOfYear,
  format,
} from "date-fns";

interface RelativeDate {
  initial: string;
  final: string;
}

export const getRelativeDate = (period: string): RelativeDate => {
  const now = new Date();

  const date = (() => {
    switch (period) {
      case Period.MONTH:
        return {
          initial: startOfMonth(now),
          final: endOfMonth(now),
        };
      case Period.TRIMESTER: {
        return {
          initial: startOfMonth(subMonths(now, 2)),
          final: endOfMonth(now),
        };
      }
      case Period.SEMESTER: {
        return {
          initial: startOfMonth(subMonths(now, 5)),
          final: endOfMonth(now),
        };
      }
      case Period.YEAR:
        return {
          initial: startOfYear(now),
          final: endOfYear(now),
        };
      default:
        return {
          initial: now,
          final: now,
        };
    }
  })();

  return {
    initial: format(date.initial, "yyyy-MM-dd"),
    final: format(date.final, "yyyy-MM-dd"),
  };
};
