"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/shared/Modal";
import { Input } from "shinodalabs-ui";
import { SelectField } from "@/components/shared/SelectField";
import { DatePickerField } from "@/components/shared/DatePickerField";
import { useCategory } from "@/context/categoryContext";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/context/settingsContext";

export interface GoalFormData {
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
  onSave: (goal: GoalFormData) => void;
  initialData?: GoalFormData;
}

export const GoalModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: GoalModalProps) => {
  const { categories } = useCategory();
  const { t } = useTranslation();
  const { currency, language } = useSettings();

  const schema = z.object({
    title: z.string().min(1, t("goals.titleRequiredValidation")),
    description: z.string().min(1, t("goals.descriptionRequiredValidation")),
    targetAmount: z.number().min(0.01, t("goals.goalMinValidation")),
    currentAmount: z.number().min(0, t("goals.currentAmmountMinValidation")),
    deadline: z.string().min(1, t("goals.deadlineRequiredValidation")),
    categoryId: z.string().min(1, t("goals.categoryRequiredValidation")),
  });

  type FormData = z.infer<typeof schema>;

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
  };

  return (
    <Modal
      isOpen={isOpen}
      title={initialData ? t("goals.editGoal") : t("goals.newGoal")}
      onClose={() => {
        onClose();
        reset({
          title: "",
          description: "",
          targetAmount: 0,
          currentAmount: 0,
          deadline: "",
          categoryId: categories[0]?.id || "",
        });
      }}
      onConfirm={handleSubmit(onSubmit)}
      cancelLabel={t("app.cancel")}
      confirmLabel={t("app.save")}
    >
      <div className="space-y-4">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
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
            <Input
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
            <Input
              label={t("goals.goal")}
              type="money"
              currency={currency}
              language={language}
              {...field}
              error={errors.targetAmount?.message}
            />
          )}
        />

        <Controller
          name="currentAmount"
          control={control}
          render={({ field }) => (
            <Input
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
                value: category.id ?? "",
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
