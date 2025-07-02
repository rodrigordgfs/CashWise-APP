import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "./index";

describe("<Tabs />", () => {
  const tabs = [
    { label: "Primeiro", value: "first" },
    { label: "Segundo", value: "second" },
    { label: "Terceiro", value: "third" },
  ];

  it("renderiza todas as abas com os labels corretos", () => {
    render(
      <Tabs
        tabs={tabs}
        selectedValue="first"
        onChange={() => {}}
      />
    );

    tabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });

  it("marca a aba selecionada com a classe ativa", () => {
    render(
      <Tabs
        tabs={tabs}
        selectedValue="second"
        onChange={() => {}}
      />
    );

    const activeTab = screen.getByText("Segundo");
    expect(activeTab).toHaveClass("border-b-2");
    expect(activeTab).toHaveClass("border-emerald-600");
  });

  it("chama onChange com o valor da aba clicada", () => {
    const onChange = jest.fn();

    render(
      <Tabs
        tabs={tabs}
        selectedValue="first"
        onChange={onChange}
      />
    );

    const thirdTab = screen.getByText("Terceiro");
    fireEvent.click(thirdTab);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("third");
  });

  it("não chama onChange quando disabled é true", () => {
    const onChange = jest.fn();

    render(
      <Tabs
        tabs={tabs}
        selectedValue="first"
        onChange={onChange}
        disabled
      />
    );

    const secondTab = screen.getByText("Segundo");
    fireEvent.click(secondTab);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("aplica estilo disabled nas abas quando disabled é true", () => {
    render(
      <Tabs
        tabs={tabs}
        selectedValue="first"
        onChange={() => {}}
        disabled
      />
    );

    const button = screen.getByText("Primeiro");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("aplica estilos de bordas arredondadas corretamente nas primeiras e últimas abas", () => {
    render(
      <Tabs
        tabs={tabs}
        selectedValue="first"
        onChange={() => {}}
      />
    );

    const firstTab = screen.getByText("Primeiro");
    const lastTab = screen.getByText("Terceiro");

    expect(firstTab).toHaveClass("rounded-tl-md");
    expect(lastTab).toHaveClass("rounded-tr-md");
  });
});
