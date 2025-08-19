import { Edit, Trash } from "lucide-react";
import React from "react";
import { useDialog } from "@/context/dialogContext";
import { useTranslation } from "react-i18next";

interface TableProps {
  children: React.ReactNode;
}

const TableRoot = ({ children }: TableProps) => (
  <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">{children}</table>
      </div>
    </div>
  </div>
);

export interface HeaderColumn<T extends object, K extends keyof T = keyof T> {
  key: K | "actions";
  label: React.ReactNode;
  align?: "left" | "right" | "center";
  hidden?: boolean;
  render?: (value: T[K], row: T) => React.ReactNode;
  format?: (value: T[K], row: T) => React.ReactNode;
  style?: (value: T[K], row: T) => string;
  showMobile?: boolean;
}

interface TableHeaderProps<T extends object> {
  columns: HeaderColumn<T>[];
}

const TableHeader = <T extends object>({ columns }: TableHeaderProps<T>) => (
  <thead>
    <tr className="border-b border-zinc-200 dark:border-zinc-800">
      {columns.map(({ key, label, align, hidden, showMobile }) =>
        hidden ? null : (
          <th
            key={String(key)}
            className={`py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400 ${
              align === "right" ? "text-right" : "text-left"
            } ${
              showMobile === true
                ? "table-cell sm:hidden"
                : showMobile === false
                ? "hidden sm:table-cell"
                : "table-cell"
            }`}
          >
            {label}
          </th>
        )
      )}
    </tr>
  </thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

interface TableRowProps<T extends object> {
  data: T;
  columns: HeaderColumn<T>[];
  onClickEdit?: () => void;
  onClickDelete?: () => void;
}

function TableRow<T extends object>({
  data,
  columns,
  onClickEdit,
  onClickDelete,
}: TableRowProps<T>) {
  const { showDialog } = useDialog();
  const { t } = useTranslation();

  const handleDelete = () => {
    showDialog({
      title: t("transactions.dialogDeleteTitle"),
      description: t("transactions.dialogDeleteDescription"),
      confirmLabel: t("transactions.dialogDeleteConfirm"),
      cancelLabel: t("transactions.dialogDeleteCancel"),
      onConfirm: () => onClickDelete?.(),
    });
  };

  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
      {columns.map(
        ({ key, align, hidden, render, format, style, showMobile }) => {
          if (hidden) return null;

          const visibilityClass =
            showMobile === true
              ? "table-cell sm:hidden"
              : showMobile === false
              ? "hidden sm:table-cell"
              : "table-cell";

          if (key === "actions") {
            return (
              <td
                key="actions"
                className={`py-3 px-4 ${
                  align === "right" ? "text-right" : "text-left"
                } ${visibilityClass}`}
              >
                <div className="flex justify-end gap-2">
                  {onClickEdit && (
                    <button
                      className="p-1 rounded-md text-zinc-500 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-500 transition-all cursor-pointer"
                      aria-label="Editar"
                      title="Editar"
                      onClick={onClickEdit}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {onClickDelete && (
                    <button
                      className="p-1 rounded-md text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 transition-all cursor-pointer"
                      aria-label="Excluir"
                      title="Excluir"
                      onClick={handleDelete}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            );
          }

          const value = data[key as keyof T];
          const content =
            render?.(value, data) ?? format?.(value, data) ?? String(value);

          const cellStyle = style?.(value, data) ?? "";

          return (
            <td
              key={String(key)}
              className={`py-3 px-4 ${
                align === "right" ? "text-right" : "text-left"
              } ${cellStyle} ${visibilityClass}`}
            >
              {content}
            </td>
          );
        }
      )}
    </tr>
  );
}

const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
});

export default Table;
