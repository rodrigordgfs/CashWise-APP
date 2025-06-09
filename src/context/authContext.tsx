"use client";

import { ReactNode, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import { toast } from "sonner";

type AuthContextType = {
  resendVerificationCode: () => Promise<void>;
  signOut: () => Promise<void>;
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
  const { user } = useUser();
  const router = useRouter();

  function isClerkError(
    err: unknown
  ): err is { errors?: { message: string }[] } {
    return typeof err === "object" && err !== null && "errors" in err;
  }

  async function signInWithEmail(email: string, password: string) {
    try {
      if (!signIn) throw new Error("signIn não disponível");
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });
        toast.success("Login realizado com sucesso!");
        router.push("/dashboard");
      } else {
        router.push("/verify-account");
        toast.info(
          "Verificação pendente. Verifique o link enviado para o seu e-mail."
        );
      }
    } catch (err: unknown) {
      console.error(err);
      if (isClerkError(err)) {
        toast.error(err.errors?.[0]?.message || "Erro ao fazer login.");
      } else {
        toast.error("Erro ao fazer login.");
      }
    }
  }

  async function registerWithEmail(data: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      if (!signUp) throw new Error("signUp não disponível");

      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        unsafeMetadata: { name: data.name },
      });

      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId });
        toast.success("Cadastro realizado com sucesso!");
        router.push("/dashboard");
      } else {
        // Prepare email verification with link strategy
        await signUp.prepareEmailAddressVerification({
          strategy: "email_link",
          redirectUrl: `${window.location.origin}/dashboard`,
        });
        
        toast.success("Cadastro iniciado! Verifique seu e-mail para continuar.");
        router.push("/verify-account");
      }
    } catch (err: unknown) {
      console.error(err);
      if (isClerkError(err)) {
        toast.error(err.errors?.[0]?.message || "Erro ao fazer cadastro.");
      } else {
        toast.error("Erro ao fazer cadastro.");
      }
    }
  }

  async function resendVerificationCode() {
    try {
      // Se há um processo de signup em andamento, use signUp
      if (signUp && signUp.status !== "complete") {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_link",
          redirectUrl: `${window.location.origin}/dashboard`,
        });
        return;
      }

      // Se o usuário já está logado mas precisa verificar o email
      if (user && user.primaryEmailAddress) {
        await user.primaryEmailAddress.prepareVerification({
          strategy: "email_link",
          redirectUrl: `${window.location.origin}/dashboard`,
        });
        return;
      }

      throw new Error("Nenhum processo de verificação encontrado");
    } catch (err) {
      console.error("Erro ao reenviar link:", err);
      throw err;
    }
  }

  async function signOut() {
    try {
      // implementar signOut com Clerk aqui, se necessário
      // Exemplo: await clerk.signOut();
      router.push("/login");
    } catch (err) {
      console.error("Erro ao sair:", err);
      toast.error("Erro ao sair.");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signInWithEmail,
        registerWithEmail,
        resendVerificationCode,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}