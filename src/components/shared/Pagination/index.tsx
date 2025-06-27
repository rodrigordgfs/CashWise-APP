"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select } from "../Select";
import { IconButton } from "../IconButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage?: number;
  optionsItemsPerPage: {
    label: string;
    value: string;
  }[];
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

  useEffect(() => {
    onItemsPerPageChange(itemsPerPage);
  }, [itemsPerPage, onItemsPerPageChange, onPageChange]);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 px-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400 gap-2">
      <span className="hidden sm:inline">
        {labels.showing} {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} {labels.of}{" "}
        {totalItems} {labels.results}
      </span>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Select
          id="itemsPerPageSelect"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          aria-label={labels.itemsPerPage}
          options={optionsItemsPerPage}
        />

        <div className="flex flex-row items-center gap-2">
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
    </div>
  );
};

export default Pagination;