import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";

export const SecurityCard = () => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Segurança</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Gerencie sua senha
        </p>
      </div>
      <div className="p-6 pt-0">
        <form className="space-y-4">
          <InputField label="Senha atual" type="password" />
          <InputField label="Nova senha" type="password" />
          <InputField label="Confirmar nova senha" type="password" />
        </form>
      </div>
      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
        <Button>Alterar senha</Button>
      </div>
    </div>
  );
};
