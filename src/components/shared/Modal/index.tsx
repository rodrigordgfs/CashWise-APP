"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel = "Salvar",
  cancelLabel = "Cancelar",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {children}
        </div>

        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {cancelLabel}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
