import { render, screen } from "@testing-library/react";
import { AppLoader } from "./index";

describe("AppLoader", () => {
  it('deve renderizar o texto "Carregando..."', () => {
    render(<AppLoader />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it('deve renderizar o texto auxiliar "Estamos preparando tudo para você."', () => {
    render(<AppLoader />);
    expect(
      screen.getByText("Estamos preparando tudo para você.")
    ).toBeInTheDocument();
  });

  it('deve renderizar o ícone com a classe "animate-spin"', () => {
    render(<AppLoader />);
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("animate-spin");
  });
});
