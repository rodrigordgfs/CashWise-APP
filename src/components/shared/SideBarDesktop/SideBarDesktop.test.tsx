import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SideBarDesktop } from "./index";

// ---- mocks -----------------------------------------------------------------
jest.mock("next/navigation");
jest.mock("@/context/sidebarContext");
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
      return translations[key] ?? key;
    },
  }),
}));
jest.mock("../NavItem", () => ({
  NavItem: ({ title }: { title: string }) => <div>{title}</div>,
}));

// ---- refs para ajuste de mocks --------------------------------------------
import * as nextNav from "next/navigation";
import * as sidebarCtx from "@/context/sidebarContext";
import * as clerk from "@clerk/nextjs";

// ----------------------------------------------------------------------------
describe("<SideBarDesktop />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(nextNav.usePathname).mockReturnValue("/dashboard");
    jest.mocked(nextNav.useRouter).mockReturnValue({ push: jest.fn() });
    jest.mocked(sidebarCtx.useSidebar).mockReturnValue({ isSidebarOpen: true });
    jest.mocked(clerk.useAuth).mockReturnValue({
      signOut: jest.fn(() => Promise.resolve()),
    });
  });

  it("renderiza todos os itens traduzidos", () => {
    render(<SideBarDesktop />);

    const textos = [
      "Dashboard",
      "Transações",
      "Categorias",
      "Orçamentos",
      "Metas",
      "Relatórios",
      "Configurações",
      "Perfil",
      "Sair",
    ];

    textos.forEach((t) => expect(screen.getByText(t)).toBeInTheDocument());
  });

  it("chama signOut e faz push('/') ao clicar em Sair", async () => {
    const signOutMock = jest.fn(() => Promise.resolve());
    const pushMock = jest.fn();

    jest.mocked(clerk.useAuth).mockReturnValue({ signOut: signOutMock });
    jest.mocked(nextNav.useRouter).mockReturnValue({ push: pushMock });

    render(<SideBarDesktop />);
    fireEvent.click(screen.getByRole("button", { name: /sair/i }));

    await Promise.resolve(); // aguarda a promise do mock

    expect(signOutMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("exibe largura zero quando a sidebar está fechada", () => {
    jest.mocked(sidebarCtx.useSidebar).mockReturnValue({ isSidebarOpen: false });

    const { container } = render(<SideBarDesktop />);
    expect(container.firstChild).toHaveClass("w-0");
  });
});
