import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { OverviewTile } from "../OverviewTile";
import { useTranslation } from "react-i18next";

interface OverviewTilesProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

export const OverviewTiles = ({
  balance,
  totalIncome,
  totalExpenses,
}: OverviewTilesProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <OverviewTile title={t("dashboard.totalBalance")} value={balance} />
      <OverviewTile
        title={t("dashboard.recepts")}
        value={totalIncome}
        icon={ArrowUpIcon}
        valueColor="text-green-500"
      />
      <OverviewTile
        title={t("dashboard.expenses")}
        value={totalExpenses}
        icon={ArrowDownIcon}
        valueColor="text-red-500"
      />
    </div>
  );
};
