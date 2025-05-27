import { useEffect, useRef } from "react";

type Props = {
  mousePosition: { x: number; y: number };
};

export default function LoginPageBackground({ mousePosition }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgRef.current) {
      bgRef.current.style.setProperty("--mouse-x", `${mousePosition.x}px`);
      bgRef.current.style.setProperty("--mouse-y", `${mousePosition.y}px`);
    }
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-zinc-950 dark:via-emerald-950/20 dark:to-blue-950/20" />

      <div
        ref={bgRef}
        className="absolute inset-0 opacity-30 custom-radial-background"
      />

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
    </div>
  );
}
