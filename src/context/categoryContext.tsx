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
import { useUser } from "@clerk/nextjs";
import { useTranslation } from "react-i18next";

interface CategoryContextProps {
  categories: Category[];
  isLoading: boolean;
  categoryType: string;
  setCategoryType: (type: string) => void;
  filteredCategories: Category[];
  isModalOpen: boolean;
  isDialogOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  setIsDialogOpen: (open: boolean) => void;
  categoryToEdit: Category | null;
  setCategoryToEdit: (category: Category | null) => void;
  openModalToCreate: () => void;
  openModalToEdit: (category: Category) => void;
  saveCategory: (category: Category) => Promise<void>;
  deleteCategory: (category: Category) => Promise<void>;
  categoriesTabs: { label: string; value: string }[];
  fetchCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { t } = useTranslation();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryType, setCategoryType] = useState<string>(
    TransactionTypeFilter.All
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const categoriesTabs = useMemo(
    () => [
      { label: t("categories.all"), value: TransactionTypeFilter.All },
      { label: t("categories.expense"), value: TransactionTypeFilter.Expense },
      { label: t("categories.income"), value: TransactionTypeFilter.Income },
    ],
    [t]
  );

  const fetchCategories = useCallback(async () => {
    if (!user?.id || !user.hasVerifiedEmailAddress) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/category${categoryType ? `?type=${categoryType}` : ""}`
      );

      if (!response.ok) throw new Error("Erro ao buscar categorias");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      toast.error("Erro ao carregar categorias");
    } finally {
      setIsLoading(false);
    }
  }, [categoryType, user?.id, user?.hasVerifiedEmailAddress]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openModalToCreate = useCallback(() => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  }, []);

  const openModalToEdit = useCallback((category: Category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  }, []);

  const filteredCategories = useMemo(() => {
    if (categoryType === TransactionTypeFilter.All) return categories;
    return categories.filter((cat) => cat.type === categoryType);
  }, [categories, categoryType]);

  const saveCategory = useCallback(
    async (category: Category) => {
      try {
        const url = category.id
          ? `/api/category/${category.id}`
          : `/api/category`;
        const method = category.id ? "PATCH" : "POST";

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: category.name,
            type: category.type,
            userId: user?.id,
            color: category.color,
            icon: category.icon,
          }),
        });

        if (!response.ok) {
          toast.error(
            category.id
              ? "Erro ao atualizar categoria"
              : "Erro ao criar categoria"
          );
          return;
        }

        toast.success(
          category.id
            ? "Categoria atualizada com sucesso!"
            : "Categoria criada com sucesso!"
        );

        await fetchCategories();
        setIsModalOpen(false);
        setCategoryToEdit(null);
      } catch (error) {
        console.error("Erro ao salvar categoria:", error);
        toast.error("Erro ao salvar categoria.");
      }
    },
    [fetchCategories, user]
  );

  const deleteCategory = useCallback(
    async (category: Category) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/category/${category.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          toast.error("Erro ao excluir categoria");
          return;
        }

        toast.success("Categoria excluída com sucesso!");
        await fetchCategories();
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        toast.error("Erro ao excluir categoria");
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCategories]
  );

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
      isDialogOpen,
      setIsDialogOpen,
      fetchCategories,
    }),
    [
      categoriesTabs,
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
      isDialogOpen,
      setIsDialogOpen,
      fetchCategories,
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
