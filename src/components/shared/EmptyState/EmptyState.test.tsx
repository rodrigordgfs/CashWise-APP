import { render, screen } from "@testing-library/react";
import { EmptyState } from "./index";

describe("EmptyState", () => {
  it("renderiza título e descrição padrão", () => {
    render(<EmptyState />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Nenhum dado encontrado");
    expect(
      screen.getByText("Você ainda não adicionou nenhuma informação por aqui.")
    ).toBeInTheDocument();
  });

  it("renderiza título e descrição customizados", () => {
    render(<EmptyState title="Título custom" description="Descrição custom" />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Título custom");
    expect(screen.getByText("Descrição custom")).toBeInTheDocument();
  });

  it("renderiza o ícone FileX2 com acessibilidade", () => {
    render(<EmptyState />);
    const icon = screen.getByRole("img", { name: /arquivo vazio/i });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("h-10");
  });
});
