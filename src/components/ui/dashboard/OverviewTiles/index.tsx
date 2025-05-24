import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { OverviewTile } from "../OverviewTile";

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
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <OverviewTile title="Saldo Atual" value={balance} />
      <OverviewTile
        title="Receitas"
        value={totalIncome}
        icon={ArrowUpIcon}
        valueColor="text-green-500"
      />
      <OverviewTile
        title="Despesas"
        value={totalExpenses}
        icon={ArrowDownIcon}
        valueColor="text-red-500"
      />
    </div>
  );
};
