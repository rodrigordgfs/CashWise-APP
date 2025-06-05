"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/shared/Modal";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { DatePickerField } from "@/components/shared/DatePickerField";
import { useCategory } from "@/context/categoryContext";
import { useTranslation } from "react-i18next";

interface Goal {
  id?: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  categoryId: string;
}

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Goal) => void;
  initialData?: Goal;
}

const schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  targetAmount: z.number().min(0.01, "Meta deve ser maior que zero"),
  currentAmount: z.number().min(0, "Valor atual não pode ser negativo"),
  deadline: z.string().min(1, "Data limite é obrigatória"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export const GoalModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: GoalModalProps) => {
  const { categories } = useCategory();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      targetAmount: 0,
      currentAmount: 0,
      deadline: "",
      categoryId: categories[0]?.id || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        targetAmount: initialData.targetAmount,
        currentAmount: initialData.currentAmount,
        deadline: initialData.deadline,
        categoryId: initialData.categoryId,
      });
    } else {
      reset({
        title: "",
        description: "",
        targetAmount: 0,
        currentAmount: 0,
        deadline: "",
        categoryId: categories[0]?.id || "",
      });
    }
  }, [initialData, reset, categories]);

  const onSubmit = (data: FormData) => {
    onSave({
      ...data,
      id: initialData?.id,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={initialData ? t("goals.editGoal") : t("goals.newGoal")}
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
      cancelLabel={t("app.cancel")}
      confirmLabel={t("app.save")}
    >
      <div className="space-y-4">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <InputField
              label={t("goals.titleField")}
              placeholder={t("goals.titlePlaceholder")}
              {...field}
              error={errors.title?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <InputField
              label={t("goals.descriptionField")}
              placeholder={t("goals.descriptionPlaceholder")}
              {...field}
              error={errors.description?.message}
            />
          )}
        />

        <Controller
          name="targetAmount"
          control={control}
          render={({ field }) => (
            <InputField
              label={t("goals.goal")}
              type="money"
              {...field}
              error={errors.targetAmount?.message}
            />
          )}
        />

        <Controller
          name="currentAmount"
          control={control}
          render={({ field }) => (
            <InputField
              label={t("goals.currentAmmount")}
              type="money"
              {...field}
              error={errors.currentAmount?.message}
            />
          )}
        />

        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <SelectField
              label={t("goals.categoryField")}
              options={categories.map((category) => ({
                value: category.id,
                label: `${category.icon} ${category.name}`,
              }))}
              {...field}
              error={errors.categoryId?.message}
            />
          )}
        />

        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <DatePickerField
              field={field}
              label={t("goals.deadlineField")}
              error={errors.deadline?.message}
              placeholder={t("goals.deadlinePlaceholder")}
            />
          )}
        />
      </div>
    </Modal>
  );
};
