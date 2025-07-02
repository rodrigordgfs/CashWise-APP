// src/components/shared/Header/__tests__/Header.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./index";

// ---------- mocks dos contextos ----------
const toggleThemeMock = jest.fn();
const toggleSidebarMock = jest.fn();
const toggleMobileMenuMock = jest.fn();

jest.mock("@/context/settingsContext", () => ({
  useSettings: () => ({
    isDarkMode: false,
    toggleTheme: toggleThemeMock,
  }),
}));

jest.mock("@/context/menuContext", () => ({
  useMenu: () => ({
    toggleMobileMenu: toggleMobileMenuMock,
  }),
}));

jest.mock("@/context/sidebarContext", () => ({
  useSidebar: () => ({
    toggleSidebar: toggleSidebarMock,
  }),
}));

// ---------- mocks dos componentes ----------
jest.mock("@/components/shared/IconButton", () => ({
  IconButton: ({ name, onClick }: { name: string; onClick?: () => void }) => (
    <button onClick={onClick} aria-label={name}>
      {name}
    </button>
  ),
}));

jest.mock("@/components/shared/LogoButton", () => ({
  LogoButton: () => <div data-testid="logo-btn">LOGO</div>,
}));

describe("<Header />", () => {
  it("renderiza o banner e executa as ações dos botões", async () => {
    const user = userEvent.setup();
    render(<Header />);

    // header
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // botões "Menu" (desktop e mobile)
    const menuButtons = screen.getAllByRole("button", { name: "Menu" });
    expect(menuButtons).toHaveLength(2);

    // clica no primeiro -> sidebar
    await user.click(menuButtons[0]);
    expect(toggleSidebarMock).toHaveBeenCalledTimes(1);

    // clica no segundo -> mobile menu
    await user.click(menuButtons[1]);
    expect(toggleMobileMenuMock).toHaveBeenCalledTimes(1);

    // botão de tema
    const themeBtn = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(themeBtn);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
