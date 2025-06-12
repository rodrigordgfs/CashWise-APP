"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Category } from "@/types/Category.type";
import { SelectField } from "@/components/shared/SelectField";
import { Input } from "shinodalabs-ui";
import { Modal } from "@/components/shared/Modal";
import { TransactionType } from "@/types/Transaction.type";
import { useTranslation } from "react-i18next";

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

export function CategoryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: CategoryModalProps) {
  const { t } = useTranslation();

  const schema = z.object({
    name: z.string().trim().min(1, t("categories.nameRequiredValidation")),
    type: z.nativeEnum(TransactionType, {
      errorMap: () => ({ message: t("categories.typeRequiredValidation") }),
    }),
    color: z.string().min(1, t("categories.colorRequiredValidation")),
    icon: z.string().min(1, t("categories.iconRequiredValidation")),
  });

  type FormValues = z.infer<typeof schema>;

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
    try {
      await onSave({
        ...data,
        id: initialData?.id || undefined,
      });
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error(t("categories.saveError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={
        initialData ? t("categories.editCategory") : t("categories.newCategory")
      }
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
      confirmLabel={t("app.save")}
      cancelLabel={t("app.cancel")}
      isLoading={isLoading}
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        {initialData
          ? t("categories.descriptionEdit")
          : t("categories.descriptionAdd")}
      </p>

      <div className="space-y-4">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <SelectField
              label={t("categories.type")}
              error={errors.type?.message}
              options={[
                {
                  value: TransactionType.Expense,
                  label: t("categories.expense"),
                },
                {
                  value: TransactionType.Income,
                  label: t("categories.income"),
                },
              ]}
              {...field}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              label={t("categories.name")}
              placeholder={t("categories.namePlaceholder")}
              error={errors.name?.message}
              {...field}
            />
          )}
        />

        <div>
          <label className="block text-sm font-medium mb-2">
            {t("categories.color")}
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(colorOptions).map(([color, className]) => (
              <button
                key={color}
                type="button"
                title={`${t("categories.selectColor")} ${color}`}
                className={`h-8 w-8 rounded-full cursor-pointer ${className} ${
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-emerald-500"
                    : ""
                }`}
                onClick={() =>
                  setValue("color", color, { shouldValidate: true })
                }
                aria-label={`${t("categories.selectColor")} ${color}`}
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
          <label className="block text-sm font-medium mb-2">
            {t("categories.icon")}
          </label>
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
                aria-label={`${t("categories.selectIcon")} ${icon}`}
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
