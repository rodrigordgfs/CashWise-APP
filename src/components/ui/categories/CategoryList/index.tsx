import { Category } from "@/types/Category.type";
import { CategoryCard } from "../CategoryCard";
import { CategoryCardSkeleton } from "../CategoryCardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { useTranslation } from "react-i18next";

interface CategoryListProps {
  categories: Category[];
  isLoading?: boolean;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

export const CategoryList = ({
  categories,
  isLoading = false,
  onEdit,
  onDelete,
}: CategoryListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <EmptyState
          title={t("categories.categoryNotFound")}
          description={t("categories.categoryNotFoundDescription")}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
