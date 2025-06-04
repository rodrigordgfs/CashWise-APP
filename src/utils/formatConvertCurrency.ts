export const formatCurrency = (
  value: number,
  currency: string,
  locale: string = "pt-BR"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
