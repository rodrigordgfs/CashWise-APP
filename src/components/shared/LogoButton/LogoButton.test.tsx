import { render, screen } from "@testing-library/react";
import { LogoButton } from "./index";
import "@testing-library/jest-dom";

describe("<LogoButton />", () => {
  it("renderiza o link com ícone e texto corretos", () => {
    render(<LogoButton />);

    const link = screen.getByRole("link", { name: /cashwise/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");

    // O texto do botão
    expect(screen.getByText(/cashwise/i)).toBeInTheDocument();

    // O SVG do Wallet (ícone) deve existir
    // Como lucide-react gera SVGs inline, pode-se buscar por role="img" ou simplesmente pelo título/texto alternativo
    // Como não há aria-label, buscamos o svg por papel no DOM
    const svg = link.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
