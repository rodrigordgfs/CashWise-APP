import { format, Locale } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";

const localeMap: Record<string, Locale> = {
  "pt-BR": ptBR,
  en: enUS,
  es: es,
};

export const formatDate = (
  date: Date | string,
  formatString: string = "MMMM 'de' yyyy",
  language: string = "pt-BR"
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    if (language === "en") return "Invalid date";
    if (language === "es") return "Fecha inválida";
    return "Data inválida";
  }

  const locale = localeMap[language] || enUS;

  return format(dateObj, formatString, { locale }).replace(/^./, (c) =>
    c.toUpperCase()
  );
};
