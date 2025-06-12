"use client";

import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { Dialog } from "shinodalabs-ui";

interface DialogOptions {
  title: string;
  description?: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
}

interface DialogContextType {
  showDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogState, setDialogState] = useState<DialogOptions | null>(null);

  const showDialog = (options: DialogOptions) => {
    setDialogState({ ...options });
  };

  const closeDialog = () => {
    dialogState?.onClose?.();
    setDialogState(null);
  };

  const handleConfirm = () => {
    dialogState?.onConfirm?.();
    setDialogState(null);
  };

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      <Dialog
        isOpen={!!dialogState}
        title={dialogState?.title || ""}
        description={dialogState?.description}
        confirmLabel={dialogState?.confirmLabel}
        cancelLabel={dialogState?.cancelLabel}
        onClose={closeDialog}
        onConfirm={handleConfirm}
        isLoading={dialogState?.isLoading}
      />
    </DialogContext.Provider>
  );
};
