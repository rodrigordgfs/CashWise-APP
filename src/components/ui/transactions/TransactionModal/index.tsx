"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { Category } from "@/types/Category.type";
import { Transaction, TransactionType } from "@/types/Transaction.type";
import { Modal } from "@/components/shared/Modal";
import { DatePickerField } from "@/components/shared/DatePickerField";

type Account = {
  id: number;
  name: string;
};

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
  initialData?: Transaction | null;
  categories: Category[];
  accounts: Account[];
}

const schema = z.object({
  type: z.nativeEnum(TransactionType, {
    errorMap: () => ({ message: "Tipo de transação é obrigatório" }),
  }),
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.number().min(0.01, "Valor deve ser maior que zero"),
  date: z.string().min(1, "Data é obrigatória"),
  category: z.string().min(1, "Categoria é obrigatória"),
  account: z.string().min(1, "Conta é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export const TransactionModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  categories,
  accounts,
}: TransactionModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: TransactionType.Expense,
      description: "",
      amount: 0,
      date: "",
      category: categories.length > 0 ? categories[0].name : "",
      account: accounts.length > 0 ? accounts[0].name : "",
      ...initialData,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        type: TransactionType.Expense,
        description: "",
        amount: 0,
        date: "",
        category: categories.length > 0 ? categories[0].name : "",
        account: accounts.length > 0 ? accounts[0].name : "",
      });
    }
  }, [initialData, isOpen, reset, categories, accounts]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const method = initialData ? "PATCH" : "POST";
    const url = initialData
      ? `/api/transactions/${initialData.id}`
      : "/api/transactions";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        amount: Number(data.amount),
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      toast.error("Erro ao salvar transação");
      return;
    }

    const savedTransaction = await response.json();
    onSave(savedTransaction);
    toast.success("Transação salva com sucesso!");
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={initialData ? "Editar Transação" : "Nova Transação"}
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
      confirmLabel="Salvar"
      cancelLabel="Cancelar"
      isLoading={isLoading}
    >
      <div className="space-y-4">
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <SelectField
              label="Tipo"
              {...field}
              options={[
                { value: "expense", label: "Despesa" },
                { value: "income", label: "Receita" },
              ]}
              error={errors.type?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <InputField
              label="Descrição"
              placeholder="Ex: Supermercado"
              {...field}
              error={errors.description?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <InputField
              label="Valor"
              type="money"
              placeholder="0.00"
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
            <SelectField
              label="Categoria"
              {...field}
              options={categories.map((c) => ({
                value: c.name,
                label: c.name,
              }))}
              error={errors.category?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="account"
          render={({ field }) => (
            <SelectField
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
            <DatePickerField<FormData>
              field={field}
              error={errors.date?.message}
            />
          )}
        />
      </div>
    </Modal>
  );
};
