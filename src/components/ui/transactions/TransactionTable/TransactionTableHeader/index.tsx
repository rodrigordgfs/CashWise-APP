"use client";

import { useTranslation } from "react-i18next";

export const TransactionTableHeader = () => {
  const { t } = useTranslation();

  return <thead>
    <tr className="border-b border-zinc-200 dark:border-zinc-800">
      {[
        t("transactions.description"),
        t("transactions.category"),
        t("transactions.date"),
        t("transactions.account"),
        t("transactions.paid"),
        t("transactions.amount"),
        t("transactions.actions"),
      ].map((label, index) => (
        <th
          key={label}
          className={`py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400 ${
            index >= 5 ? "text-right" : "text-left"
          }`}
          >
            {label}
          </th>
        )
      )}
    </tr>
  </thead>
};
