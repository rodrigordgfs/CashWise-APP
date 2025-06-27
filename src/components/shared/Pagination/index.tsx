"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "../IconButton";
import { Select } from "../Select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage?: number;
  optionsItemsPerPage: { label: string; value: string }[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  labels: {
    previous: string;
    next: string;
    showing: string;
    of: string;
    results: string;
    page: string;
    itemsPerPage: string;
  };
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  perPage,
  onItemsPerPageChange,
  optionsItemsPerPage,
  labels,
}: PaginationProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(perPage || 10);

  // dispara callback sempre que mudar itemsPerPage
  useEffect(() => {
    onItemsPerPageChange(itemsPerPage);
  }, [itemsPerPage, onItemsPerPageChange]);

  const handlePrevious = () => currentPage > 1 && onPageChange(currentPage - 1);
  const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1);

  return (
    <div className="rounded-lg border bg-white dark:bg-zinc-950 shadow-sm
                    flex flex-col sm:flex-row justify-between items-center
                    p-6 gap-4 text-sm text-zinc-600 dark:text-zinc-400
                    border-zinc-200 dark:border-zinc-800">

      {/* ESQUERDA: texto “exibindo …” + Select */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <span>
          {labels.showing} {(currentPage - 1) * itemsPerPage + 1} –{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} {labels.of} {totalItems}{" "}
          {labels.results}
        </span>

        <Select
          id="itemsPerPageSelect"
          className="w-28 sm:w-32"
          value={itemsPerPage.toString()}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          options={optionsItemsPerPage}
          aria-label={labels.itemsPerPage}
        />
      </div>

      {/* DIREITA: botões + contador de páginas */}
      <div className="flex items-center gap-2">
        <IconButton
          onClick={handlePrevious}
          disabled={currentPage === 1}
          icon={ChevronLeft}
          name={labels.previous}
          aria-label={labels.previous}
        />

        <span className="px-2">
          {labels.page} {currentPage} {labels.of} {totalPages}
        </span>

        <IconButton
          onClick={handleNext}
          disabled={currentPage === totalPages}
          icon={ChevronRight}
          name={labels.next}
          aria-label={labels.next}
        />
      </div>
    </div>
  );
};
