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
import { useAuth, useUser } from "@clerk/nextjs";

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
  saveCategory: (category: Category) => Promise<void>;
  deleteCategory: (category: Category) => Promise<void>;
  categoriesTabs: { label: string; value: string }[];
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryType, setCategoryType] = useState<string>(
    TransactionTypeFilter.All
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

  const fetchCategories = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/category?${
          categoryType !== "" ? `type=${categoryType}&` : ""
        }userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (!res.ok) throw new Error("Erro ao buscar categorias");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      toast.error("Erro ao carregar categorias");
    } finally {
      setIsLoading(false);
    }
  }, [categoryType, user?.id, getToken]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
    async (category: Category) => {
      try {
        const url = category.id
          ? `${process.env.NEXT_PUBLIC_BASE_URL_API}/category/${category.id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL_API}/category`;
        const method = category.id ? "PATCH" : "POST";

        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            name: category.name,
            type: category.type,
            userId: user?.id,
          }),
        });

        if (!res.ok) {
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
    [fetchCategories, user?.id, getToken]
  );

  const deleteCategory = useCallback(
    async (category: Category) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/category/${category.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );

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
    [fetchCategories, getToken]
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
