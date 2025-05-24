import { LucideIcon } from "lucide-react";
import { Button } from "../Button";

type PageHeaderProps =
  | { title: string }
  | {
      title: string;
      actionTitle: string;
      actionIcon: LucideIcon;
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
            >
              {props.actionTitle}
            </Button>
          </div>
        )}
    </div>
  );
};
