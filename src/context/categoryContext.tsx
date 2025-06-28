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
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/nextjs";

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
  page: number;
  setPage: (page: number) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
  totalItems: number;
  setTotalItems: (total: number) => void;
  totalPages: number;
  setTotalPages: (total: number) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { t } = useTranslation();
  const { getToken } = useAuth();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(16);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
      const params = {
        page: String(page),
        perPage: String(perPage),
        type: categoryType || undefined,
      };

      const url = new URL("category", process.env.NEXT_PUBLIC_BASE_URL_API);

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value);
        }
      });

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        toast.error("Erro ao buscar categorias");
        throw new Error("Erro ao buscar categorias");
      }

      setTotalItems(Number(response.headers.get("x-total-count")) || 0);
      setTotalPages(Number(response.headers.get("x-total-pages")) || 0);
      setPage(Number(response.headers.get("x-current-page")) || 1);
      setPerPage(Number(response.headers.get("x-per-page")) || 10);

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      Sentry.captureException(error);
      console.error("Erro ao carregar categorias:", error);
      toast.error("Erro ao carregar categorias");
    } finally {
      setIsLoading(false);
    }
  }, [
    categoryType,
    user?.id,
    user?.hasVerifiedEmailAddress,
    getToken,
    page,
    perPage,
  ]);

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
          ? `${process.env.NEXT_PUBLIC_BASE_URL_API}/category/${category.id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL_API}/category`;
        const method = category.id ? "PATCH" : "POST";

        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: category.name,
            type: category.type,
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
        Sentry.captureException(error);
        console.error("Erro ao salvar categoria:", error);
        toast.error("Erro ao salvar categoria.");
      }
    },
    [fetchCategories, getToken]
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
          const json = await response.json();
          const message = json?.message || "Erro ao excluir categoria";
          toast.error(message);
          return;
        }

        toast.success("Categoria excluída com sucesso!");
        await fetchCategories();
      } catch (error) {
        Sentry.captureException(error);
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
      isDialogOpen,
      setIsDialogOpen,
      fetchCategories,
      page,
      setPage,
      perPage,
      setPerPage,
      totalItems,
      setTotalItems,
      totalPages,
      setTotalPages,
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
      page,
      setPage,
      perPage,
      setPerPage,
      totalItems,
      setTotalItems,
      totalPages,
      setTotalPages,
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
