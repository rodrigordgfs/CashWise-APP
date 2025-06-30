// components/TransactionModal/BasicDataTab.tsx
import React from "react";
import { Controller } from "react-hook-form";
import { Select } from "@/components/shared/Select";
import { Input } from "@/components/shared/Input";
import { DatePicker } from "@/components/shared/DatePicker";
import { TransactionType } from "@/types/Transaction.type";

interface BasicDataTabProps {
  control: any;
  errors: any;
  currency: string;
  language: string;
  categories: { id?: string; icon?: string; name: string; type: TransactionType }[];
  accounts: { id: number; name: string }[];
  filteredCategories: typeof categories;
}

export const BasicDataTab = ({
  control,
  errors,
  currency,
  language,
  filteredCategories,
  categories,
  accounts,
}: BasicDataTabProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <Select
            label="Tipo"
            {...field}
            options={[
              { value: TransactionType.Income, label: "Receita" },
              { value: TransactionType.Expense, label: "Despesa" },
            ]}
            error={errors.type?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Input
            label="Descrição"
            placeholder="Descrição da transação"
            {...field}
            error={errors.description?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <Input
            label="Valor"
            type="money"
            currency={currency}
            language={language}
            placeholder="0,00"
            {...field}
            onChange={(val) => field.onChange(val)}
            error={errors.amount?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Select
            label="Categoria"
            {...field}
            options={filteredCategories.map((c) => ({
              value: c.id ?? "",
              label: `${c.icon ?? ""} ${c.name}`,
            }))}
            error={errors.category?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="account"
        render={({ field }) => (
          <Select
            label="Conta"
            {...field}
            options={accounts.map((a) => ({
              value: a.name,
              label: a.name,
            }))}
            error={errors.account?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DatePicker
            label="Data"
            placeholder="Selecione a data"
            {...field}
            field={field}
            error={errors.date?.message}
          />
        )}
      />
    </div>
  );
};
