"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { isBefore, startOfToday, parseISO } from "date-fns";

import { Select } from "@/components/shared/Select";
import { Modal } from "@/components/shared/Modal";
import { DatePicker } from "@/components/shared/DatePicker";
import { Input } from "@/components/shared/Input";

import { Transaction, TransactionType } from "@/types/Transaction.type";
import { useCategory } from "@/context/categoryContext";
import { useTransaction } from "@/context/transactionsContext";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/context/settingsContext";
import * as Sentry from "@sentry/nextjs";
import { Bell, Repeat } from "lucide-react";
import { ToggleSwitch } from "@/components/shared/ToggleSwitch";
import { Button } from "@/components/shared/Button";
import { formatCurrency } from "@/utils/formatConvertCurrency";
import { getEventTimeRange } from "@/utils/getEventTimeRange";
import { downloadICSReminder } from "@/utils/downloadICSReminder";

type Account = {
  id: number;
  name: string;
};

export enum RecurrenceInterval {
  Daily = "1",
  Weekly = "7",
  Monthly = "30",
  Yearly = "365",
}

export enum ReminderService {
  GoogleCalendar = "google-calendar",
  OutlookCalendar = "outlook-calendar",
  AppleCalendar = "apple-calendar",
}

export enum ReminderTime {
  AtTime = "at-time",
  FifteenMinBefore = "15-min-before",
  OneHourBefore = "1-hour-before",
  OneDayBefore = "1-day-before",
  OneWeekBefore = "1-week-before",
}

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
    recurrenceInterval: z.nativeEnum(RecurrenceInterval).optional(),
    recurrenceCount: z
      .string()
      .optional()
      .refine(
        (val) =>
          val === undefined ||
          (val !== "" &&
            !isNaN(Number(val)) &&
            Number(val) >= 1 &&
            Number(val) <= 99),
        { message: "O valor deve estar entre 1 e 99" }
      ),
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
      category: initialData?.category?.id || "",
      account: initialData?.account || accounts[0]?.name || "",
      recurrenceInterval:
        initialData?.recurrenceInterval || RecurrenceInterval.Monthly,
      recurrenceCount:
        initialData?.recurrenceCount !== undefined
          ? String(initialData.recurrenceCount)
          : undefined,
    },
  });

  const type = watch("type");
  const date = watch("date");

  const [isDatePast, setIsDatePast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState<ReminderTime>(
    ReminderTime.AtTime
  );
  const [reminderService, setReminderService] = useState<ReminderService>(
    ReminderService.GoogleCalendar
  );

  const filteredCategories = categories.filter((c) => c.type === type);

  const recurrenceOptions = [
    {
      value: RecurrenceInterval.Daily,
      label: t("transactions.recurrenceOptions.daily"),
    },
    {
      value: RecurrenceInterval.Weekly,
      label: t("transactions.recurrenceOptions.weekly"),
    },
    {
      value: RecurrenceInterval.Monthly,
      label: t("transactions.recurrenceOptions.monthly"),
    },
    {
      value: RecurrenceInterval.Yearly,
      label: t("transactions.recurrenceOptions.yearly"),
    },
  ];

  const reminderServiceOptions = [
    {
      value: ReminderService.GoogleCalendar,
      label: t("transactions.reminderServiceOptions.google"),
    },
    {
      value: ReminderService.OutlookCalendar,
      label: t("transactions.reminderServiceOptions.outlook"),
    },
    {
      value: ReminderService.AppleCalendar,
      label: t("transactions.reminderServiceOptions.apple"),
    },
  ];

  const reminderTimeOptions = [
    {
      value: ReminderTime.AtTime,
      label: t("transactions.reminderTimeOptions.atTime"),
    },
    {
      value: ReminderTime.FifteenMinBefore,
      label: t("transactions.reminderTimeOptions.fifteenMinBefore"),
    },
    {
      value: ReminderTime.OneHourBefore,
      label: t("transactions.reminderTimeOptions.oneHourBefore"),
    },
    {
      value: ReminderTime.OneDayBefore,
      label: t("transactions.reminderTimeOptions.oneDayBefore"),
    },
    {
      value: ReminderTime.OneWeekBefore,
      label: t("transactions.reminderTimeOptions.oneWeekBefore"),
    },
  ];

  const handleReminderTimeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setReminderTime(e.target.value as ReminderTime);
  };

  const handleReminderServiceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setReminderService(e.target.value as ReminderService);
  };

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
        recurrenceInterval: isRecurring ? data.recurrenceInterval : undefined,
        recurrenceCount: isRecurring && data.recurrenceCount
          ? Number(data.recurrenceCount)
          : undefined,
      });

      reset();
      onClose();
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      toast.error("Erro ao salvar transação");
    } finally {
      setIsLoading(false);
    }
  };

  const setupReminder = () => {
    const date = getEventTimeRange(watch("date"), reminderTime);

    const encodedTitle = encodeURIComponent(
      t("transactions.reminderTextTitle")
    );
    const encodedDescription = encodeURIComponent(
      `${t("transactions.reminderTextDescription1")}${watch("description")}${t(
        "transactions.reminderTextDescription2"
      )}${formatCurrency(watch("amount"), currency, language)}`
    );

    switch (reminderService) {
      case ReminderService.GoogleCalendar:
        window.open(
          `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${date.start}/${date.end}&details=${encodedDescription}`,
          "_blank"
        );
        toast.success(t("transactions.riminderSuccess"));
        break;
      case ReminderService.OutlookCalendar:
        window.open(
          `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodedTitle}&body=${encodedDescription}&startdt=${date.start}&enddt=${date.end}`,
          "_blank"
        );
        toast.success(t("transactions.riminderSuccess"));
        break;
      case ReminderService.AppleCalendar:
        downloadICSReminder({
          title: t("transactions.reminderTextTitle"),
          description: `${t("transactions.reminderTextDescription1")}${watch(
            "description"
          )}${t("transactions.reminderTextDescription2")}${formatCurrency(
            watch("amount"),
            currency,
            language
          )}`,
          startDate: new Date(date.start),
          endDate: new Date(date.end),
          reminderTime,
        });
        toast.success(t("transactions.reminderDownloadSuccess"));
        break;
      default:
        toast.error(t("transactions.reminderNotImplemented"));
    }
  };

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
        recurrenceInterval:
          initialData.recurrenceInterval || RecurrenceInterval.Monthly,
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
        recurrenceInterval: RecurrenceInterval.Monthly,
        recurrenceCount: "1",
      });
    }
  }, [initialData, isOpen, reset, accounts]);

  useEffect(() => {
    if (filteredCategories.length > 0) {
      setValue("category", filteredCategories[0]?.id || "");
    }
  }, [type, filteredCategories, setValue]);

  useEffect(() => {
    if (!date) {
      setIsDatePast(false);
      return;
    }

    const selectedDate = parseISO(date);
    const today = startOfToday();

    const past = isBefore(selectedDate, today);
    setIsDatePast(past);

    if (past) {
      setIsRecurring(false);
    }
  }, [date]);

  useEffect(() => {
    if (!isDatePast && isRecurring) {
      setValue("recurrenceInterval", RecurrenceInterval.Monthly);
      setValue("recurrenceCount", "1");
    } else {
      setValue("recurrenceInterval", undefined);
      setValue("recurrenceCount", undefined);
    }
  }, [isRecurring, isDatePast, setValue]);

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

      {!initialData && (
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Repeat size={20} className="text-emerald-500" />
            <div>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {t("transactions.recurringTransaction")}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {t("transactions.recurringDescription")}
              </p>
            </div>
          </div>
          <ToggleSwitch
            checked={isRecurring}
            onChange={setIsRecurring}
            disabled={isDatePast}
          />
        </div>

        {isRecurring && (
          <div className="ml-8 space-y-4 border-l-2 border-purple-200 dark:border-emerald-800 pl-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                control={control}
                name="recurrenceInterval"
                render={({ field }) => (
                  <Select
                    label={t("transactions.recurrenceFrequency")}
                    {...field}
                    options={recurrenceOptions}
                    error={errors.recurrenceInterval?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="recurrenceCount"
                render={({ field }) => (
                  <Input
                    label={t("transactions.recurrenceRepetitions")}
                    placeholder={t(
                      "transactions.recurrenceRepetitionsPlaceholder"
                    )}
                    type="number"
                    {...field}
                    error={errors.recurrenceCount?.message}
                  />
                )}
              />
            </div>
          </div>
        )}
      </div>
      )}

      {initialData && (
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-emerald-500" />
              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {t("transactions.calendarReminder")}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t("transactions.reminderDescription")}
                </p>
              </div>
            </div>
            <ToggleSwitch
              checked={hasReminder}
              onChange={setHasReminder}
              disabled={isDatePast}
            />
          </div>

          {hasReminder && (
            <div className="ml-8 space-y-4 border-l-2 border-blue-200 dark:border-emerald-800 pl-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label={t("transactions.reminderTime")}
                  options={reminderTimeOptions}
                  value={reminderTime}
                  onChange={handleReminderTimeChange}
                />
                <Select
                  label={t("transactions.reminderService")}
                  options={reminderServiceOptions}
                  value={reminderService}
                  onChange={handleReminderServiceChange}
                />
              </div>
              <Button
                variant="neutral"
                className="w-full"
                onClick={setupReminder}
              >
                {t("transactions.setReminder")}
              </Button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
