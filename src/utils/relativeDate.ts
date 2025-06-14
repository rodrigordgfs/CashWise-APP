import { Period } from "@/types/Period.type";
import { startOfMonth, subMonths, subYears, format } from "date-fns";

// Tipo que será retornado pela função
interface RelativeDate {
  initial: string;
  final: string;
}

// Função utilitária para retornar o intervalo de datas com base no período
export const getRelativeDate = (period: string): RelativeDate => {
  const now = new Date();

  // Não definir tipo explícito aqui, pois o objeto ainda contém `Date`
  const date = (() => {
    switch (period) {
      case Period.MONTH:
        return {
          initial: startOfMonth(now),
          final: now,
        };
      case Period.TRIMESTER:
        return {
          initial: subMonths(now, 3),
          final: now,
        };
      case Period.SEMESTER:
        return {
          initial: subMonths(now, 6),
          final: now,
        };
      case Period.YEAR:
        return {
          initial: subYears(now, 1),
          final: now,
        };
      default:
        return {
          initial: now,
          final: now,
        };
    }
  })();

  // Retorna os valores como string formatada
  return {
    initial: format(date.initial, "yyyy-MM-dd"),
    final: format(date.final, "yyyy-MM-dd"),
  };
};
