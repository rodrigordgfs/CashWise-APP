"use client";

import { ReactNode } from "react";
import { Button } from "../Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  isLoading = false,
  confirmLabel = "Salvar",
  cancelLabel = "Cancelar",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {children}
        </div>

        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 justify-end">
          <Button disabled={isLoading} onClick={onClose} variant="neutral">
            {cancelLabel}
          </Button>
          {onConfirm && (
            <Button disabled={isLoading} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
