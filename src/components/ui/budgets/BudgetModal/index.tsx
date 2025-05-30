"use client";

import { InputField } from "@/components/shared/InputField";
import { Modal } from "@/components/shared/Modal";
import { SelectField } from "@/components/shared/SelectField";
import { Category } from "@/types/Category.type";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MonthYearPicker } from "@/components/shared/MonthPicker";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    id?: number;
    category: string;
    limit: number;
    month: string;
  }) => void;
  categories: Category[];
  initialData?: { id?: number; category: string; limit: number; month: string };
}

const schema = z.object({
  category: z.string().min(1, "Categoria é obrigatória"),
  limit: z.number().min(0.01, "Limite deve ser maior que zero"),
  month: z.string().min(1, "Mês é obrigatório"),
});

type FormData = z.infer<typeof schema>;

const parseYearMonth = (ym: string) => {
  const [year, month] = ym.split("-").map(Number);
  return new Date(year, month - 1, 1);
};

export const BudgetModal = ({
  isOpen,
  onClose,
  onSave,
  categories,
  initialData,
}: BudgetModalProps) => {
  const initialDate = initialData
    ? parseYearMonth(initialData.month)
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: initialData?.category || categories[0]?.name || "",
      limit: initialData?.limit || 0,
      month:
        initialData?.month ||
        (selectedDate ? selectedDate.toISOString().slice(0, 7) : ""),
    },
  });

  const monthValue = watch("month");

  useEffect(() => {
    if (initialData) {
      reset({
        category: initialData.category,
        limit: initialData.limit,
        month: initialData.month,
      });
      setSelectedDate(parseYearMonth(initialData.month));
    } else {
      reset({
        category: categories[0]?.name || "",
        limit: 0,
        month: new Date().toISOString().slice(0, 7),
      });
      setSelectedDate(new Date());
    }
  }, [initialData, isOpen, reset, categories]);

  useEffect(() => {
    if (monthValue) {
      const dateFromField = parseYearMonth(monthValue);
      if (dateFromField.getTime() !== selectedDate.getTime()) {
        setSelectedDate(dateFromField);
      }
    }
  }, [monthValue, selectedDate]);

  const [showPicker, setShowPicker] = useState(false);

  const onSubmit = (data: FormData) => {
    onSave({ ...data, id: initialData?.id });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={initialData ? "Editar Orçamento" : "Novo Orçamento"}
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        Defina um limite de gastos para uma categoria
      </p>

      <div className="space-y-4 relative">
        {/* Categoria */}
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <SelectField
              label="Categoria"
              options={categories.map((cat) => ({
                value: cat.name,
                label: `${cat.icon} ${cat.name}`,
              }))}
              {...field}
              error={errors.category?.message}
            />
          )}
        />

        {/* Limite */}
        <Controller
          control={control}
          name="limit"
          render={({ field }) => (
            <InputField
              label="Limite"
              type="money"
              value={field.value}
              onChange={(val) => field.onChange(val)}
              placeholder="R$ 0,00"
              error={errors.limit?.message}
            />
          )}
        />

        {/* Mês */}
        <Controller
          control={control}
          name="month"
          render={({ field }) => (
            <div className="relative z-10">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Mês
              </label>
              <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className={`w-full border rounded-md px-3 py-2 text-left bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 ${
                  errors.month
                    ? "border-red-500"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {selectedDate
                  ? format(selectedDate, "MMMM 'de' yyyy", {
                      locale: ptBR,
                    }).replace(/^./, (c) => c.toUpperCase())
                  : "Selecionar mês"}
              </button>
              {errors.month && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.month.message}
                </p>
              )}

              {showPicker && (
                <div className="absolute z-50 mt-2">
                  <MonthYearPicker
                    selectedDate={selectedDate}
                    minDate={new Date()}
                    onChange={(date) => {
                      setSelectedDate(date);
                      field.onChange(date.toISOString().slice(0, 7));
                      setShowPicker(false);
                    }}
                    fullWidth
                  />
                </div>
              )}
            </div>
          )}
        />
      </div>
    </Modal>
  );
};
