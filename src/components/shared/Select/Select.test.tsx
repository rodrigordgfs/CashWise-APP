import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "./index";

describe("<Select />", () => {
  const options = [
    { value: "1", label: "Opção 1" },
    { value: "2", label: "Opção 2" },
    { value: "3", label: "Opção 3" },
  ];

  it("renderiza com rótulo e opções", () => {
    render(<Select label="Escolha uma opção" options={options} value="1" onChange={() => {}} />);

    // Rótulo
    expect(screen.getByText("Escolha uma opção")).toBeInTheDocument();

    // Select
    const select = screen.getByLabelText("Escolha uma opção");
    expect(select).toBeInTheDocument();

    // Opções
    options.forEach((option) => {
      expect(screen.getByRole("option", { name: option.label.toString() })).toBeInTheDocument();
    });
  });

  it("chama onChange ao selecionar uma nova opção", () => {
    const onChange = jest.fn();

    render(<Select label="Tipo" options={options} value="1" onChange={onChange} />);

    const select = screen.getByLabelText("Tipo");

    fireEvent.change(select, { target: { value: "2" } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renderiza sem rótulo se `label` não for passado", () => {
    render(<Select options={options} value="1" onChange={() => {}} />);

    expect(screen.queryByLabelText(/.+/)).not.toBeInTheDocument(); // nenhum label
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renderiza mensagem de erro se `error` for passado", () => {
    render(<Select label="Tipo" options={options} value="1" error="Campo obrigatório" onChange={() => {}} />);

    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });
});
