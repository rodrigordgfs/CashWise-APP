"use client";

import { ReportType, ReportTypeEnum } from "@/types/Report.type";
import { SelectField } from "@/components/shared/SelectField";
import { Tabs } from "@/components/shared/Tabs";
import { useState } from "react";
import { FilterCard } from "@/components/shared/FilterCard";
import { Period } from "@/types/Period.type";
import { useTranslation } from "react-i18next";

interface FiltersCardProps {
  initialReportType?: ReportType;
  initialPeriod?: string;
  onReportTypeChange?: (type: ReportType) => void;
  onPeriodChange?: (period: string) => void;
}

export const ReportFilters = ({
  initialReportType = ReportTypeEnum.INCOME_EXPENSE,
  initialPeriod = Period.MONTH,
  onReportTypeChange,
  onPeriodChange,
}: FiltersCardProps) => {
  const { t } = useTranslation();

  const [reportType, setReportType] = useState<ReportType>(initialReportType);
  const [period, setPeriod] = useState<string>(initialPeriod);

  const reportTabs: { label: string; value: ReportType }[] = [
    {
      label: t("reports.incomeVsExpense"),
      value: ReportTypeEnum.INCOME_EXPENSE,
    },
    { label: t("reports.category"), value: ReportTypeEnum.CATEGORIES },
    { label: t("reports.balance"), value: ReportTypeEnum.BALANCE },
  ];

  const periodOptions = [
    { label: t("reports.lastMonth"), value: Period.MONTH },
    { label: t("reports.lastThreeMonths"), value: Period.TRIMESTER },
    { label: t("reports.lastSixMonths"), value: Period.SEMESTER },
    { label: t("reports.lastYear"), value: Period.YEAR },
  ];

  const handleReportChange = (value: ReportType) => {
    setReportType(value);
    onReportTypeChange?.(value);
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    onPeriodChange?.(value);
  };

  return (
    <FilterCard title={t("reports.filters")}>
      <div className="flex flex-col items-end gap-4 md:flex-row">
        <div className="flex-1">
          <Tabs
            tabs={reportTabs}
            selectedValue={reportType}
            onChange={handleReportChange}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <SelectField
            label={t("reports.period")}
            value={period}
            onChange={(e) => handlePeriodChange(e.target.value)}
            options={periodOptions}
          />
        </div>
      </div>
    </FilterCard>
  );
};
