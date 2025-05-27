import { Shield, Zap } from "lucide-react";

export default function LoginFeatures() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      <div className="text-center p-4 rounded-2xl bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm border border-white/20 dark:border-zinc-800/50">
        <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Login instantâneo
        </p>
      </div>
      <div className="text-center p-4 rounded-2xl bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm border border-white/20 dark:border-zinc-800/50">
        <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
        <p className="text-xs text-zinc-600 dark:text-zinc-400">100% seguro</p>
      </div>
    </div>
  );
}
