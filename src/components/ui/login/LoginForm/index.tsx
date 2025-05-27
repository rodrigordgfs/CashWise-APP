"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PasswordField from "../PasswordField";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="relative px-8 pb-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-white/20 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
          />
        </div>

        <PasswordField value={password} onChange={setPassword} />
      </div>

      <div className="mt-8 space-y-4">
        <button
          type="submit"
          disabled={isLoading}
          className="group w-full px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-medium hover:from-emerald-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              Entrar
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </button>

        <div className="text-center">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Não tem uma conta?{" "}
          </span>
          <Link
            href="/register"
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            Registre-se gratuitamente
          </Link>
        </div>
      </div>
    </form>
  );
}
