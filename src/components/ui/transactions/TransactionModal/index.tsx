"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "shinodalabs-ui";
import { SelectField } from "@/components/shared/SelectField";
import { Transaction, TransactionType } from "@/types/Transaction.type";
import { Modal } from "@/components/shared/Modal";
import { DatePickerField } from "@/components/shared/DatePickerField";
import { useCategory } from "@/context/categoryContext";
import { useTransaction } from "@/context/transactionsContext";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/context/settingsContext";

type Account = {
  id: number;
  name: string;
};

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Transaction | null;
  accounts: Account[];
}

export const TransactionModal = ({
  isOpen,
  onClose,
  initialData,
  accounts,
}: TransactionModalProps) => {
  const { categories } = useCategory();
  const { saveOrUpdateTransaction } = useTransaction();
  const { t } = useTranslation();
  const { currency, language } = useSettings();

  const schema = z.object({
    type: z.nativeEnum(TransactionType, {
      errorMap: () => ({ message: t("transactions.typeRequiredValidation") }),
    }),
    description: z
      .string()
      .min(1, t("transactions.descriptionRequiredValidation")),
    amount: z.number().min(0.01, t("transactions.ammountMinValidation")),
    date: z.string().min(1, t("transactions.dateRequiredValidation")),
    category: z.string().min(1, t("transactions.categoryRequiredValidation")),
    account: z.string().min(1, t("transactions.accountRequiredValidation")),
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
      type: initialData?.type ?? TransactionType.Expense,
      description: initialData?.description ?? "",
      amount: initialData?.amount ?? 0,
      date: initialData?.date ?? "",
      category: initialData?.category.id ?? categories[0]?.id ?? "",
      account: initialData?.account ?? accounts[0]?.name ?? "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      reset({
        type: initialData.type,
        description: initialData.description,
        amount: initialData.amount,
        date: initialData.date,
        category: initialData.category.id,
        account: initialData.account,
      });
    } else {
      reset({
        type: TransactionType.Expense,
        description: "",
        amount: 0,
        date: "",
        category: categories[0]?.id ?? "",
        account: accounts[0]?.name ?? "",
      });
    }
  }, [initialData, isOpen, reset, categories, accounts]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      await saveOrUpdateTransaction({
        id: initialData?.id,
        type: data.type,
        description: data.description,
        amount: Number(data.amount),
        date: data.date,
        account: data.account,
        categoryId: data.category,
      });

      reset();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao salvar transação");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={
        initialData
          ? t("transactions.editTransaction")
          : t("transactions.newTransaction")
      }
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
      confirmLabel={t("app.save")}
      cancelLabel={t("app.cancel")}
      isLoading={isLoading}
    >
      <div className="space-y-4">
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <SelectField
              label={t("transactions.type")}
              {...field}
              options={[
                {
                  value: TransactionType.Income,
                  label: t("transactions.income"),
                },
                {
                  value: TransactionType.Expense,
                  label: t("transactions.expense"),
                },
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
              label={t("transactions.description")}
              placeholder={t("transactions.descriptionPlaceholder")}
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
              label={t("transactions.amount")}
              type="money"
              currency={currency}
              language={language}
              placeholder={t("transactions.amountPlaceholder")}
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
              label={t("transactions.category")}
              {...field}
              options={categories.map((c) => ({
                value: c.id ?? "",
                label: `${c.icon} ${c.name}`,
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
              label={t("transactions.account")}
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
              label={t("transactions.date")}
              placeholder={t("transactions.datePlaceholder")}
              {...field}
              field={field}
              error={errors.date?.message}
            />
          )}
        />
      </div>
    </Modal>
  );
};
