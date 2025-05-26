"use client";

export const TransactionTableHeader = () => (
  <thead>
    <tr className="border-b border-zinc-200 dark:border-zinc-800">
      {["Descrição", "Categoria", "Data", "Conta", "Valor", "Ações"].map(
        (label, index) => (
          <th
            key={label}
            className={`py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400 ${
              index >= 4 ? "text-right" : "text-left"
            }`}
          >
            {label}
          </th>
        )
      )}
    </tr>
  </thead>
);
