"use client";

import { ReactNode, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";

type AuthContextType = {
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const router = useRouter();

  async function signInWithEmail(email: string, password: string) {
    try {
      if (!signIn) throw new Error("signIn não está disponível");

      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });
        toast.success("Login realizado com sucesso!");
        router.push("/dashboard");
      } else {
        toast.error("Verificação pendente. Verifique seu e-mail.");
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      console.error("Erro ao fazer o login:", err);
      toast.error(error.errors?.[0]?.message || "Erro ao fazer o login.");
    }
  }

  async function registerWithEmail(data: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      if (!signUp) throw new Error("signUp não está disponível");

      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        unsafeMetadata: { name: data.name },
      });

      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId });
        toast.success("Conta criada com sucesso!");
        router.push("/dashboard");
      } else {
        toast.info("Verifique seu e-mail para concluir o cadastro.");
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      console.error("Erro ao criar conta:", err);
      toast.error(error.errors?.[0]?.message || "Erro ao criar conta.");
    }
  }

  return (
    <AuthContext.Provider value={{ signInWithEmail, registerWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
