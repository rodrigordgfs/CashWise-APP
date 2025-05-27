import { Button } from "@/components/shared/Button";

export const DeleteAccountCard = () => {
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
        <Button variant="red">Excluir conta</Button>
      </div>
    </div>
  );
};
