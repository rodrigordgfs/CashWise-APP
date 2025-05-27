import { Category } from "@/types/CategoryType";
import { CategoryCard } from "../CategoryCard";

interface CategoryListProps {
  categories: Category[];
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

export const CategoryList = ({
  categories,
  onEdit,
  onDelete,
}: CategoryListProps) => {
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
