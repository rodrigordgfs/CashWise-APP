import { useIsMobile } from "@/hooks/useIsMobile";
import { useTranslation } from "react-i18next";

export const TransactionTableHeader = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const headers = [
    t("transactions.description"),
    t("transactions.category"),
    t("transactions.date"),
    t("transactions.account"),
    t("transactions.paid"),
    t("transactions.amount"),
    t("transactions.actions"),
  ];

  return (
    <thead>
      <tr className="border-b border-zinc-200 dark:border-zinc-800">
        {headers.map((label, index) => {
          const shouldHide = isMobile && index > 0 && index < 5;

          return (
            <th
              key={label}
              className={`py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400 ${
                index >= 5 ? "text-right" : "text-left"
              } ${shouldHide ? "hidden" : ""}`}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
