import { Category } from "@/types/Category.type";
import { CategoryCard } from "../CategoryCard";
import { CategoryCardSkeleton } from "../CategoryCardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";

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
          title="Nenhuma categoria encontrada"
          description="Você ainda não adicionou nenhuma categoria por aqui."
        />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
