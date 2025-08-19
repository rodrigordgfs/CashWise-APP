import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileMenu } from "./index";

import * as menuContext from "@/context/menuContext";
import * as nextNavigation from "next/navigation";
import * as clerk from "@clerk/nextjs";

jest.mock("next/navigation");
jest.mock("@/context/menuContext");
jest.mock("@clerk/nextjs");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "menu.dashboard": "Dashboard",
        "menu.transactions": "Transações",
        "menu.categories": "Categorias",
        "menu.budgets": "Orçamentos",
        "menu.goals": "Metas",
        "menu.reports": "Relatórios",
        "menu.settings": "Configurações",
        "menu.profile": "Perfil",
        "menu.logout": "Sair",
      };
      return translations[key] || key;
    },
  }),
}));

describe("<MobileMenu />", () => {
  const closeMobileMenuMock = jest.fn();
  const pushMock = jest.fn();
  const signOutMock = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    jest.clearAllMocks();

    (menuContext.useMenu as jest.Mock).mockReturnValue({
      closeMobileMenu: closeMobileMenuMock,
    });

    (nextNavigation.usePathname as jest.Mock).mockReturnValue("/dashboard");

    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    (clerk.useAuth as jest.Mock).mockReturnValue({
      signOut: signOutMock,
    });
  });

  it("renderiza todos os itens do menu com traduções", () => {
    render(<MobileMenu />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Transações")).toBeInTheDocument();
    expect(screen.getByText("Categorias")).toBeInTheDocument();
    expect(screen.getByText("Orçamentos")).toBeInTheDocument();
    expect(screen.getByText("Metas")).toBeInTheDocument();
    expect(screen.getByText("Relatórios")).toBeInTheDocument();
    expect(screen.getByText("Configurações")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  it("fecha o menu ao clicar no botão fechar", () => {
    render(<MobileMenu />);
    const closeButton = screen.getByRole("button", { name: /fechar menu/i });
    fireEvent.click(closeButton);
    expect(closeMobileMenuMock).toHaveBeenCalledTimes(1);
  });

  it("fecha o menu ao clicar na overlay", () => {
    render(<MobileMenu />);
    const overlay = screen.getByTestId("mobile-menu-overlay");
    fireEvent.click(overlay);
    expect(closeMobileMenuMock).toHaveBeenCalledTimes(1);
  });

  it("não fecha o menu ao clicar dentro do menu", () => {
    render(<MobileMenu />);
    const menu = screen.getByTestId("mobile-menu-content");
    fireEvent.click(menu);
    expect(closeMobileMenuMock).not.toHaveBeenCalled();
  });

  it("faz logout e redireciona ao clicar no botão sair", async () => {
    render(<MobileMenu />);
    const logoutButton = screen.getByRole("button", { name: /sair/i });
    fireEvent.click(logoutButton);

    // Espera a promise de signOut resolver
    await Promise.resolve();

    expect(signOutMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
