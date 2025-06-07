"use client";

import { ReactNode, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import { toast } from "sonner";

type AuthContextType = {
  verifyEmailCode: (code: string) => Promise<boolean>;
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

  console.log("UserId:", user?.id);
  console.log("Verified Email:", user?.hasVerifiedEmailAddress);

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
          "Verificação pendente. Verifique o código enviado para o seu e-mail."
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

      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        unsafeMetadata: { name: data.name },
      });

      // Solicita o envio do código de verificação para o e-mail
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      toast.info("Verifique seu e-mail para concluir o cadastro.");
      router.push("/verify-account");
    } catch (err: unknown) {
      console.error(err);
      if (isClerkError(err)) {
        toast.error(err.errors?.[0]?.message || "Erro ao fazer login.");
      } else {
        toast.error("Erro ao fazer login.");
      }
    }
  }

  async function verifyEmailCode(code: string): Promise<boolean> {
    if (!signUp) throw new Error("signUp não disponível");
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status === "complete") {
        await setSignUpActive({ session: completeSignUp.createdSessionId });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Erro na verificação:", err);
      throw err;
    }
  }

  async function resendVerificationCode() {
    if (!signUp) throw new Error("signUp não disponível");
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      console.error("Erro ao reenviar código:", err);
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
        verifyEmailCode,
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
