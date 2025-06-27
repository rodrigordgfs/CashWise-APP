interface Tab<T> {
  label: string;
  value: T;
}

interface TabsProps<T> {
  tabs: Tab<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  disabled?: boolean;
}

export const Tabs = <T extends string | number>({
  tabs,
  selectedValue,
  onChange,
  disabled = false,
}: TabsProps<T>) => {
  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800">
      {tabs.map((tab, index) => {
        const isActive = selectedValue === tab.value;
        const isFirst = index === 0;
        const isLast = index === tabs.length - 1;

        return (
          <button
            key={tab.value}
            onClick={() => !disabled && onChange(tab.value)}
            disabled={disabled}
            className={`
              px-4 py-2 text-sm font-medium transition-all
              ${
                disabled
                  ? "cursor-not-allowed text-zinc-400 dark:text-zinc-600"
                  : "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }
              ${
                isActive && !disabled
                  ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                  : !disabled
                  ? "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  : ""
              }
              ${isFirst ? "rounded-tl-md" : ""}
              ${isLast ? "rounded-tr-md" : ""}
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};