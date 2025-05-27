import { Shield } from "lucide-react";

export default function LoginHeader() {
  return (
    <div className="relative p-8 pb-6 text-center mb-6">
      <div className="inline-flex items-center rounded-full px-4 py-2 text-sm bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm mb-4">
        <Shield className="mr-2 h-4 w-4" />
        Acesso Seguro
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent mb-2">
        Bem-vindo de volta
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Entre com suas credenciais para acessar sua conta
      </p>
    </div>
  );
}
