"use client";

import { Input } from "shinodalabs-ui";
import { Modal } from "@/components/shared/Modal";
import { SelectField } from "@/components/shared/SelectField";
import { Category } from "@/types/Category.type";
import { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Budget } from "@/types/Budge.type";
import { MonthDatePicker } from "@/components/shared/MonthPicker";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/formatDate";
import { useSettings } from "@/context/settingsContext";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Budget) => void;
  categories: Category[];
  initialData?: Budget;
}

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
  const { t } = useTranslation();
  const { language, currency } = useSettings();

  const initialDate = initialData
    ? parseYearMonth(initialData.date)
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [showPicker, setShowPicker] = useState(false);

  const schema = z.object({
    category: z.string().min(1, t("budgets.categoryRequiredValidation")),
    limit: z.number().min(0.01, t("budgets.limitMinValidation")),
    date: z.string().min(1, t("budgets.dateRequiredValidation")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: initialData?.category?.id || categories[0]?.id || "",
      limit: initialData?.limit || 0,
      date:
        initialData?.date ||
        (selectedDate ? selectedDate.toISOString().slice(0, 7) : ""),
    },
  });

  const dateValue = watch("date");

  useEffect(() => {
    if (initialData) {
      reset({
        category: initialData?.category?.id || categories[0]?.id,
        limit: initialData.limit,
        date: initialData.date || new Date().toISOString().slice(0, 7),
      });
      setSelectedDate(
        parseYearMonth(initialData.date || new Date().toISOString().slice(0, 7))
      );
    } else {
      reset({
        category: categories[0]?.id || "",
        limit: 0,
        date: new Date().toISOString().slice(0, 7),
      });
      setSelectedDate(new Date());
    }
  }, [initialData, isOpen, reset, categories]);

  useEffect(() => {
    if (dateValue) {
      const dateFromField = parseYearMonth(dateValue);
      if (dateFromField.getTime() !== selectedDate.getTime()) {
        setSelectedDate(dateFromField);
      }
    }
  }, [dateValue, selectedDate]);

  const onSubmit = (data: FormData) => {
    const category = categories.find((c) => c.id === data.category);
    if (!category) return;

    onSave({
      id: initialData?.id,
      category: category,
      limit: data.limit,
      date: data.date,
      spent: initialData?.spent || 0,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={initialData ? t("budgets.editBudget") : t("budgets.newBudget")}
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
      confirmLabel={t("app.save")}
      cancelLabel={t("app.cancel")}
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        {t("budgets.description")}
      </p>

      <div className="space-y-4 relative">
        {/* Categoria */}
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <SelectField
              label={t("budgets.category")}
              options={categories.map((category) => ({
                value: category.id ?? "",
                label: `${category.icon} ${category.name}`,
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
            <Input
              label={t("budgets.limit")}
              type="money"
              currency={currency}
              language={language}
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
          name="date"
          render={({ field }) => (
            <div className="relative z-10">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                {t("budgets.month")}
              </label>
              <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className={`w-full border rounded-md px-3 py-2 text-left bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 ${
                  errors.date
                    ? "border-red-500"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {selectedDate
                  ? formatDate(selectedDate, "MMMM yyyy", language)
                  : t("budgets.selectMonth")}
              </button>
              {errors.date && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}

              {showPicker && (
                <div className="absolute z-50 mt-2">
                  <MonthDatePicker
                    isOpen={showPicker}
                    onClose={() => setShowPicker(false)}
                    selectedDate={selectedDate}
                    minDate={new Date()}
                    onChange={(date: Date) => {
                      setSelectedDate(date);
                      field.onChange(date.toISOString().slice(0, 7));
                      setShowPicker(false);
                    }}
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
