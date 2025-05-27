import { useState, useEffect } from "react";
import { Category } from "@/types/CategoryType";
import { SelectField } from "@/components/shared/SelectField";
import { InputField } from "@/components/shared/InputField";
import { TransactionTypeFilter } from "@/types/TransactionTypeFilter";
import { Modal } from "@/components/shared/Modal";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, "id">) => void;
  initialData?: Omit<Category, "id"> | null;
}

export const colorOptions: Record<string, string> = {
  "#0ea5e9": "bg-sky-500",
  "#f97316": "bg-orange-500",
  "#8b5cf6": "bg-violet-500",
  "#22c55e": "bg-green-500",
  "#ef4444": "bg-red-500",
  "#06b6d4": "bg-cyan-500",
  "#10b981": "bg-emerald-500",
  "#6366f1": "bg-indigo-500",
  "#f59e0b": "bg-amber-500",
};

const icons = ["💸", "🍔", "🏠", "🚗", "🎮", "💼", "💊", "🎁", "🛒"];

export const CategoryModal = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
}: CategoryModalProps) => {
  const [type, setType] = useState<TransactionTypeFilter>(
    TransactionTypeFilter.Expense
  );
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(
    Object.keys(colorOptions)[0]
  );
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setName(initialData.name);
      setSelectedColor(initialData.color);
      setSelectedIcon(initialData.icon);
    } else {
      setType(TransactionTypeFilter.Expense);
      setName("");
      setSelectedColor(Object.keys(colorOptions)[0]);
      setSelectedIcon(icons[0]);
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSave({
      name,
      type,
      color: selectedColor,
      icon: selectedIcon,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={initialData ? "Editar Categoria" : "Nova Categoria"}
      onClose={onClose}
      onConfirm={handleSubmit}
      confirmLabel="Salvar"
      cancelLabel="Cancelar"
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        {initialData
          ? "Altere os dados da categoria selecionada."
          : "Crie uma nova categoria para organizar suas transações."}
      </p>

      <div className="space-y-4">
        <SelectField
          label="Tipo"
          value={type}
          onChange={(e) => setType(e.target.value as TransactionTypeFilter)}
          options={[
            { value: "expense", label: "Despesa" },
            { value: "income", label: "Receita" },
          ]}
        />

        <InputField
          label="Nome"
          placeholder="Ex: Alimentação"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium mb-2">Cor</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(colorOptions).map(([color, className]) => (
              <button
                key={color}
                type="button"
                title={`Selecionar cor ${color}`}
                className={`h-8 w-8 rounded-full cursor-pointer ${className} ${
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-emerald-500"
                    : ""
                }`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ícone</label>
          <div className="flex flex-wrap gap-2">
            {icons.map((icon) => (
              <button
                key={icon}
                type="button"
                className={`flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 cursor-pointer ${
                  selectedIcon === icon ? "ring-2 ring-emerald-500" : ""
                }`}
                onClick={() => setSelectedIcon(icon)}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
