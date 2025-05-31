"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Category } from "@/types/Category.type";
import { SelectField } from "@/components/shared/SelectField";
import { InputField } from "@/components/shared/InputField";
import { Modal } from "@/components/shared/Modal";
import { TransactionType } from "@/types/Transaction.type";
import { useUser } from "@clerk/nextjs";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  initialData?: Category | null;
}

export const colorOptions: Record<string, string> = {
  "#0ea5e9": "bg-sky-500",
  "#f97316": "bg-orange-500",
  "#8b5cf6": "bg-violet-500",
  "#22c55e": "bg-green-500",
  "#ef4444": "bg-red-500",
  "#06b6d4": "bg-cyan-500",
  "#10b981": "bg-emerald-500",
  "#6366f1": "bg-indigo-500",
  "#f59e0b": "bg-amber-500",
  "#eab308": "bg-yellow-500",
};

const icons = ["💸", "🍔", "🏠", "🚗", "🎮", "💼", "💊", "🎁", "🛒", "🏴‍☠️"];

const schema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  type: z.nativeEnum(TransactionType, {
    errorMap: () => ({ message: "Tipo é obrigatório" }),
  }),
  color: z.string().min(1, "Cor é obrigatória"),
  icon: z.string().min(1, "Ícone é obrigatório"),
});

type FormValues = z.infer<typeof schema>;

export function CategoryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: CategoryModalProps) {
  const { user } = useUser();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: TransactionType.Expense,
      color: Object.keys(colorOptions)[0],
      icon: icons[0],
    },
  });

  const selectedColor = watch("color");
  const selectedIcon = watch("icon");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        type:
          initialData.type === TransactionType.Income
            ? TransactionType.Income
            : TransactionType.Expense,
      });
    } else {
      reset({
        name: "",
        type: TransactionType.Expense,
        color: Object.keys(colorOptions)[0],
        icon: icons[0],
      });
    }
  }, [initialData, isOpen, reset]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    const method = initialData ? "PATCH" : "POST";

    const url = initialData
      ? `${process.env.NEXT_PUBLIC_BASE_URL_API}/category/${initialData.id}`
      : `${process.env.NEXT_PUBLIC_BASE_URL_API}/category`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        userId: user?.id,
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      toast.error("Erro ao salvar categoria");
      return;
    }

    const savedCategory = await response.json();
    onSave(savedCategory);
    toast.success("Categoria salva com sucesso!");
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={initialData ? "Editar Categoria" : "Nova Categoria"}
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
      confirmLabel="Salvar"
      cancelLabel="Cancelar"
      isLoading={isLoading}
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        {initialData
          ? "Altere os dados da categoria selecionada."
          : "Crie uma nova categoria para organizar suas transações."}
      </p>

      <div className="space-y-4">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <SelectField
              label="Tipo"
              error={errors.type?.message}
              options={[
                { value: TransactionType.Expense, label: "Despesa" },
                { value: TransactionType.Income, label: "Receita" },
              ]}
              {...field}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              label="Nome"
              placeholder="Ex: Alimentação"
              error={errors.name?.message}
              {...field}
            />
          )}
        />

        <div>
          <label className="block text-sm font-medium mb-2">Cor</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(colorOptions).map(([color, className]) => (
              <button
                key={color}
                type="button"
                title={`Selecionar cor ${color}`}
                className={`h-8 w-8 rounded-full cursor-pointer ${className} ${
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-emerald-500"
                    : ""
                }`}
                onClick={() =>
                  setValue("color", color, { shouldValidate: true })
                }
                aria-label={`Selecionar cor ${color}`}
              />
            ))}
            {errors.color && (
              <p className="text-sm text-red-500 mt-2">
                {errors.color.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ícone</label>
          <div className="flex flex-wrap gap-2">
            {icons.map((icon) => (
              <button
                key={icon}
                type="button"
                className={`flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 cursor-pointer ${
                  selectedIcon === icon
                    ? "ring-2 ring-emerald-500 animate-pulse"
                    : ""
                }`}
                onClick={() => setValue("icon", icon, { shouldValidate: true })}
                aria-label={`Selecionar ícone ${icon}`}
              >
                {icon}
              </button>
            ))}
            {errors.icon && (
              <p className="text-sm text-red-500 mt-2">{errors.icon.message}</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
