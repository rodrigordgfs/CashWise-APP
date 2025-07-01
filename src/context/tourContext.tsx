"use client";

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Tour } from "@/types/Tour.type";
import { useUser, useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import * as Sentry from "@sentry/nextjs";
import introJs from "intro.js";

interface Step {
  element: string;
  intro: string;
  position?: "top" | "bottom" | "left" | "right"; // "auto" removido para compatibilidade
}

interface TourContextProps {
  isLoading: boolean;
  progress: Tour[] | null;
  completePage: (page: string) => Promise<void>;
  hasCompleted: (page: string) => boolean;
  createUserTour: () => Promise<void>;
  startTour: (steps: Step[], page?: string) => void;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export const TourProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [progress, setProgress] = useState<Tour[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Guardamos uma ref para a instância atual do intro.js, mas recriamos sempre no startTour
  const introRef = useRef<ReturnType<typeof introJs> | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!user?.id || !user.hasVerifiedEmailAddress) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/tour`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (res.ok) {
        const data: Tour[] = await res.json();
        setProgress(data);
      } else {
        toast.error("Erro ao carregar progresso do tour");
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, user?.hasVerifiedEmailAddress, getToken]);

  const completePage = useCallback(
    async (page: string) => {
      if (!user?.id || !page) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/tour`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getToken()}`,
            },
            body: JSON.stringify({ page }),
          }
        );

        if (!res.ok) {
          toast.error("Erro ao marcar página como concluída");
          return;
        }

        setProgress((prev) =>
          prev
            ? prev.map((item) =>
                item.page === page ? { ...item, completed: true } : item
              )
            : []
        );
      } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        toast.error("Não foi possível atualizar o progresso.");
      }
    },
    [user?.id, getToken]
  );

  const hasCompleted = useCallback(
    (page: string) =>
      progress?.some((p) => p.page === page && p.completed) ?? false,
    [progress]
  );

  const createUserTour = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/tour`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (res.ok) {
        await fetchProgress();
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
    }
  }, [getToken, fetchProgress]);

  const startTour = useCallback(
    (steps: Step[], page?: string) => {
      if (steps.length === 0) return;

      // Cria nova instância toda vez que iniciar o tour para evitar conflitos e eventos duplicados
      introRef.current = introJs()

      // Ajusta steps para garantir compatibilidade
      const fixedSteps = steps.map(({ element, intro, position }) => ({
        element,
        intro,
        position: position ?? "bottom",
      }));

      introRef.current.setOptions({
        steps: fixedSteps,
        showProgress: true,
        showStepNumbers: true,
        doneLabel: "Finalizar",
        nextLabel: "Próximo",
        prevLabel: "Anterior",
        skipLabel: "Pular",
        tooltipClass: "custom-intro-tooltip", // classe para tooltip
        highlightClass: "custom-intro-highlight", // classe para destaque do elemento
        overlayOpacity: 0.6, // opacidade do overlay
      });

      introRef.current.start();

      if (page) {
        introRef.current.oncomplete(() => completePage(page));
        introRef.current.onexit(() => completePage(page));
      }
    },
    [completePage]
  );

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const value = useMemo(
    () => ({
      isLoading,
      progress,
      completePage,
      hasCompleted,
      createUserTour,
      startTour,
    }),
    [
      isLoading,
      progress,
      completePage,
      hasCompleted,
      createUserTour,
      startTour,
    ]
  );

  return (
    <TourContext.Provider value={value}>{children}</TourContext.Provider>
  );
};

export const useTour = (): TourContextProps => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
