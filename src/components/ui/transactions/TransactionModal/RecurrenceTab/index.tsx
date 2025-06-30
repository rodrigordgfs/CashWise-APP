// components/TransactionModal/TransactionModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/shared/Modal";

import { TransactionType } from "@/types/Transaction.type";
import { useCategory } from "@/context/categoryContext";
import { useTransaction } from "@/context/transactionsContext";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/context/settingsContext";

export enum RecurrenceType {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}

interface Account {
  id: number;
  name: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null;
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
    type: z.nativeEnum(TransactionType),
    description: z.string().min(1),
    amount: z.number().min(0.01),
    date: z.string().min(1),
    category: z.string().min(1),
    account: z.string().min(1),
    recurrenceType: z.nativeEnum(RecurrenceType).optional(),
    recurrenceCount: z.string().optional(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: initialData?.type ?? TransactionType.Expense,
      description: initialData?.description ?? "",
      amount: initialData?.amount ?? 0,
      date: initialData?.date ?? "",
      category: initialData?.category?.id || "",
      account: initialData?.account || accounts[0]?.name || "",
      recurrenceType: initialData?.recurrenceType || RecurrenceType.Monthly,
      recurrenceCount:
        initialData?.recurrenceCount !== undefined
          ? String(initialData.recurrenceCount)
          : undefined,
    },
  });

  const type = watch("type");
  const filteredCategories = categories.filter((c) => c.type === type);

  const recurrenceOptions = [
    { value: RecurrenceType.Daily, label: t("transactions.recurrenceOptions.daily") },
    { value: RecurrenceType.Weekly, label: t("transactions.recurrenceOptions.weekly") },
    { value: RecurrenceType.Monthly, label: t("transactions.recurrenceOptions.monthly") },
    { value: RecurrenceType.Yearly, label: t("transactions.recurrenceOptions.yearly") },
  ];

  const tabs: Tab<"basic" | "recurrence">[] = [
    { label: t("transactions.basicData"), value: "basic" },
    { label: t("transactions.recurrence"), value: "recurrence" },
  ];

  const [selectedTab, setSelectedTab] = useState<"basic" | "recurrence">("basic");

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      reset({
        type: initialData.type,
        description: initialData.description,
        amount: initialData.amount,
        date: initialData.date,
        category: initialData.category?.id || "",
        account: initialData.account || "",
        recurrenceType: initialData.recurrenceType,
        recurrenceCount:
          initialData.recurrenceCount !== undefined
            ? String(initialData.recurrenceCount)
            : undefined,
      });
    } else {
      reset({
        type: TransactionType.Expense,
        description: "",
        amount: 0,
        date: "",
        category: "",
        account: accounts[0]?.name || "",
        recurrenceType: undefined,
        recurrenceCount: undefined,
      });
    }
    setSelectedTab("basic");
  }, [initialData, isOpen, reset, accounts]);

  const onSubmit = async (data: FormData) => {
    try {
      await saveOrUpdateTransaction({
        id: initialData?.id,
        type: data.type,
        description: data.description,
        amount: Number(data.amount),
        date: data.date,
        account: data.account,
        categoryId: data.category,
        recurrenceType: data.recurrenceType,
        recurrenceCount: data.recurrenceCount ? Number(data.recurrenceCount) : undefined,
      });
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      // Trate erro...
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={initialData ? t("transactions.editTransaction") : t("transactions.newTransaction")}
      description={initialData ? t("transactions.descriptionEdit") : t("transactions.descriptionAdd")}
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
      confirmLabel={t("app.save")}
      cancelLabel={t("app.cancel")}
    >
      <Tabs tabs={tabs} selectedValue={selectedTab} onChange={setSelectedTab} />

      {selectedTab === "basic" && (
        <BasicDataTab
          control={control}
          errors={errors}
          currency={currency}
          language={language}
          filteredCategories={filteredCategories}
          categories={categories}
          accounts={accounts}
        />
      )}

      {selectedTab === "recurrence" && (
        <RecurrenceTab control={control} errors={errors} recurrenceOptions={recurrenceOptions} />
      )}
    </Modal>
  );
};
