"use client";

import { ReportType, ReportTypeEnum } from "@/types/Report.type";
import { SelectField } from "@/components/shared/SelectField";
import { Tabs } from "@/components/shared/Tabs";
import { useState } from "react";
import { FilterCard } from "@/components/shared/FilterCard";

const reportTabs: { label: string; value: ReportType }[] = [
  { label: "Receitas vs Despesas", value: ReportTypeEnum.INCOME_EXPENSE },
  { label: "Categorias", value: ReportTypeEnum.CATEGORIES },
  { label: "Saldo", value: ReportTypeEnum.BALANCE },
];

const periodOptions = [
  { label: "Último mês", value: "1month" },
  { label: "Últimos 3 meses", value: "3months" },
  { label: "Últimos 6 meses", value: "6months" },
  { label: "Último ano", value: "1year" },
];

interface FiltersCardProps {
  initialReportType?: ReportType;
  initialPeriod?: string;
  onReportTypeChange?: (type: ReportType) => void;
  onPeriodChange?: (period: string) => void;
}

export const ReportFilters = ({
  initialReportType = ReportTypeEnum.INCOME_EXPENSE,
  initialPeriod = "1month",
  onReportTypeChange,
  onPeriodChange,
}: FiltersCardProps) => {
  const [reportType, setReportType] = useState<ReportType>(initialReportType);
  const [period, setPeriod] = useState<string>(initialPeriod);

  const handleReportChange = (value: ReportType) => {
    setReportType(value);
    onReportTypeChange?.(value);
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    onPeriodChange?.(value);
  };

  return (
    <FilterCard>
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
            label="Período"
            value={period}
            onChange={(e) => handlePeriodChange(e.target.value)}
            options={periodOptions}
          />
        </div>
      </div>
    </FilterCard>
  );
};
