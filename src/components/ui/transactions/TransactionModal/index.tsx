"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Select } from "@/components/shared/Select";
import { Modal, DatePicker } from "shinodalabs-ui";
import { Input } from "@/components/shared/Input";

import { Transaction, TransactionType } from "@/types/Transaction.type";
import { useCategory } from "@/context/categoryContext";
import { useTransaction } from "@/context/transactionsContext";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/context/settingsContext";
import * as Sentry from "@sentry/nextjs";

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
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: initialData?.type ?? TransactionType.Expense,
      description: initialData?.description ?? "",
      amount: initialData?.amount ?? 0,
      date: initialData?.date ?? "",
      category: initialData?.category.id ?? "",
      account: initialData?.account ?? accounts[0]?.name ?? "",
    },
  });

  const type = watch("type");
  const [isLoading, setIsLoading] = useState(false);

  const filteredCategories = categories.filter((c) => c.type === type);

  // ⚠️ Reset dos dados iniciais
  useEffect(() => {
    if (!isOpen) return;

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
        category: "",
        account: accounts[0]?.name ?? "",
      });
    }
  }, [initialData, isOpen, reset, accounts]);

  // ✅ Atualiza a categoria quando o tipo muda
  useEffect(() => {
    if (filteredCategories.length > 0) {
      setValue("category", filteredCategories[0]?.id ?? "");
    }
  }, [type, filteredCategories, setValue]);

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
      Sentry.captureException(error);
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
      description={
        initialData
          ? t("transactions.descriptionEdit")
          : t("transactions.descriptionAdd")
      }
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
      confirmLabel={t("app.save")}
      cancelLabel={t("app.cancel")}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select
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
            <Select
              label={t("transactions.category")}
              {...field}
              options={filteredCategories.map((c) => ({
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
            <Select
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
            <DatePicker<FormData>
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
