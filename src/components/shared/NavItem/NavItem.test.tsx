import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { NavItem } from "./index";

const MockIcon = () => <svg data-testid="icon" />;

describe("<NavItem />", () => {
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o título e o ícone", () => {
    render(
      <NavItem
        href="/test"
        icon={MockIcon}
        title="Teste"
        isActive={false}
        onClick={onClickMock}
      />
    );

    expect(screen.getByText("Teste")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("aplica classes CSS para estado ativo", () => {
    render(
      <NavItem href="/test" icon={MockIcon} title="Ativo" isActive={true} />
    );
    const div = screen.getByText("Ativo").closest("div")!;
    expect(div).toHaveClass("bg-zinc-200");
    expect(div).toHaveClass("dark:bg-zinc-800");
    expect(div).toHaveClass("text-zinc-900");
    expect(div).toHaveClass("dark:text-zinc-100");
  });

  it("aplica classes CSS para estado inativo", () => {
    render(
      <NavItem href="/test" icon={MockIcon} title="Inativo" isActive={false} />
    );
    const div = screen.getByText("Inativo").closest("div")!;
    expect(div).toHaveClass("text-zinc-700");
    expect(div).toHaveClass("dark:text-zinc-300");
    expect(div).toHaveClass("hover:bg-zinc-100");
    expect(div).toHaveClass("dark:hover:bg-zinc-800");
  });

  it("dispara onClick ao clicar", () => {
    render(
      <NavItem
        href="/test"
        icon={MockIcon}
        title="Clique"
        isActive={false}
        onClick={onClickMock}
      />
    );

    const div = screen.getByText("Clique").closest("div")!;
    fireEvent.click(div);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("dispara onClick ao pressionar Enter", () => {
    render(
      <NavItem
        href="/test"
        icon={MockIcon}
        title="Enter"
        isActive={false}
        onClick={onClickMock}
      />
    );

    const div = screen.getByText("Enter").closest("div")!;
    fireEvent.keyDown(div, { key: "Enter", code: "Enter" });

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("dispara onClick ao pressionar Espaço", () => {
    render(
      <NavItem
        href="/test"
        icon={MockIcon}
        title="Space"
        isActive={false}
        onClick={onClickMock}
      />
    );

    const div = screen.getByText("Space").closest("div")!;
    fireEvent.keyDown(div, { key: " ", code: "Space" });

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
