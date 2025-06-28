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
      secondActionTitle?: string;
      secondActionIcon?: LucideIcon;
      onSecondActionClick?: () => void;
      secondActionDisabled?: boolean;
    };

export const PageHeader = (props: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">{props.title}</h2>
      <div className="flex flex-row items-center gap-2">
        {"secondActionTitle" in props &&
          "secondActionIcon" in props &&
          "onSecondActionClick" in props && (
            <div className="flex items-center gap-2">
              <Button
                variant="neutral"
                onClick={props.onSecondActionClick}
                icon={props.secondActionIcon}
                disabled={props.secondActionDisabled}
              >
                <span className="hidden sm:inline">
                  {props.secondActionTitle}
                </span>
              </Button>
            </div>
          )}
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
    </div>
  );
};
