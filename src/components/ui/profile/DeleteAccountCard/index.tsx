"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/shared/Button";

export const DeleteAccountCard = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      await user?.delete();
      toast.success("Conta excluída com sucesso.");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir a conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:col-span-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Excluir conta</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Exclua permanentemente sua conta e todos os seus dados
        </p>
      </div>
      <div className="p-6 pt-0">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Ao excluir sua conta, todos os seus dados serão permanentemente
          removidos. Esta ação não pode ser desfeita.
        </p>
      </div>
      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
        <Button
          variant="red"
          onClick={handleDeleteAccount}
          disabled={isLoading}
        >
          {isLoading ? "Excluindo..." : "Excluir conta"}
        </Button>
      </div>
    </div>
  );
};
