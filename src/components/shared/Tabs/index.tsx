interface Tab<T> {
  label: string;
  value: T;
}

interface TabsProps<T> {
  tabs: Tab<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
}

export const Tabs = <T extends string | number>({
  tabs,
  selectedValue,
  onChange,
}: TabsProps<T>) => {
  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800">
      {tabs.map((tab) => {
        const isActive = selectedValue === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all ${
              isActive
                ? "border-b-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
