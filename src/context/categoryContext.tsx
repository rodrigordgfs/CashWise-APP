"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { toast } from "sonner";
import { Category } from "@/types/Category.type";
import { TransactionTypeFilter } from "@/types/Transaction.type";

interface CategoryContextProps {
  categories: Category[];
  isLoading: boolean;
  categoryType: string;
  setCategoryType: (type: string) => void;
  filteredCategories: Category[];
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  categoryToEdit: Category | null;
  setCategoryToEdit: (category: Category | null) => void;
  openModalToCreate: () => void;
  openModalToEdit: (category: Category) => void;
  saveCategory: (category: Category) => void;
  deleteCategory: (category: Category) => Promise<void>;
  categoriesTabs: { label: string; value: string }[];
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryType, setCategoryType] = useState<string>(
    TransactionTypeFilter.Expense
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const categoriesTabs = useMemo(
    () => [
      { label: "Todas", value: TransactionTypeFilter.All },
      { label: "Despesas", value: TransactionTypeFilter.Expense },
      { label: "Receitas", value: TransactionTypeFilter.Income },
    ],
    []
  );

  // Buscar categorias
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Erro ao buscar categorias");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Filtra categorias conforme tipo selecionado
  const filteredCategories = useMemo(() => {
    if (categoryType === TransactionTypeFilter.All) return categories;
    return categories.filter((cat) => cat.type === categoryType);
  }, [categories, categoryType]);

  const openModalToCreate = useCallback(() => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  }, []);

  const openModalToEdit = useCallback((category: Category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  }, []);

  const saveCategory = useCallback(
    (savedCategory: Category) => {
      if (categoryToEdit) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === categoryToEdit.id ? { ...cat, ...savedCategory } : cat
          )
        );
      } else {
        setCategories((prev) => [...prev, savedCategory]);
      }
      setIsModalOpen(false);
      setCategoryToEdit(null);
    },
    [categoryToEdit]
  );

  const deleteCategory = useCallback(async (category: Category) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Erro ao excluir categoria");
        return;
      }

      await response.json();
      setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
      toast.success("Categoria excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      toast.error("Erro ao excluir categoria");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      categoriesTabs,
      categories,
      isLoading,
      categoryType,
      setCategoryType,
      filteredCategories,
      isModalOpen,
      setIsModalOpen,
      categoryToEdit,
      setCategoryToEdit,
      openModalToCreate,
      openModalToEdit,
      saveCategory,
      deleteCategory,
    }),
    [
      categories,
      isLoading,
      categoryType,
      filteredCategories,
      isModalOpen,
      categoryToEdit,
      openModalToCreate,
      openModalToEdit,
      saveCategory,
      deleteCategory,
      categoriesTabs,
    ]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
