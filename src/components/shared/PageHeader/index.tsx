import { LucideIcon } from "lucide-react";
import { Button } from "@/components/shared/Button";

type PageHeaderProps =
  | { title: string }
  | {
      title: string;
      actionTitle: string;
      actionIcon: LucideIcon;
      actionDisabled?: boolean;
      onActionClick: () => void;
    };

export const PageHeader = (props: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">{props.title}</h2>
      {"actionTitle" in props &&
        "actionIcon" in props &&
        "onActionClick" in props && (
          <div className="flex items-center gap-2">
            <Button
              variant="emerald"
              onClick={props.onActionClick}
              icon={props.actionIcon}
              disabled={props.actionDisabled}
            >
              <span className="hidden sm:inline">{props.actionTitle}</span>
            </Button>
          </div>
        )}
    </div>
  );
};
