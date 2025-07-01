import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./index";

// Mock tipado do IconButton
jest.mock("../IconButton", () => ({
  IconButton: ({
    onClick,
    disabled,
    name,
  }: {
    onClick: () => void;
    disabled: boolean;
    name: string;
  }) => (
    <button onClick={onClick} disabled={disabled} aria-label={name}>
      {name}
    </button>
  ),
}));

// Mock tipado do Select
jest.mock("../Select", () => ({
  Select: ({
    value,
    onChange,
    options,
    "aria-label": ariaLabel,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string }[];
    "aria-label": string;
  }) => (
    <select aria-label={ariaLabel} value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

const defaultProps = {
  currentPage: 2,
  totalPages: 5,
  totalItems: 50,
  perPage: 10,
  onPageChange: jest.fn(),
  onItemsPerPageChange: jest.fn(),
  optionsItemsPerPage: [
    { label: "10", value: "10" },
    { label: "25", value: "25" },
    { label: "50", value: "50" },
  ],
  labels: {
    previous: "Anterior",
    next: "Próxima",
    showing: "Exibindo",
    of: "de",
    results: "resultados",
    page: "Página",
    itemsPerPage: "Itens por página",
  },
};

describe("<Pagination />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza as informações corretamente", () => {
    render(<Pagination {...defaultProps} />);
    expect(
      screen.getByText("Exibindo 11 – 20 de 50 resultados")
    ).toBeInTheDocument();
    expect(screen.getByText("Página 2 de 5")).toBeInTheDocument();
  });

  it("chama onPageChange ao clicar em Próxima", () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /próxima/i }));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it("chama onPageChange ao clicar em Anterior", () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /anterior/i }));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it("desabilita botão Anterior na primeira página", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    expect(screen.getByRole("button", { name: /anterior/i })).toBeDisabled();
  });

  it("desabilita botão Próxima na última página", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    expect(screen.getByRole("button", { name: /próxima/i })).toBeDisabled();
  });

  it("chama onItemsPerPageChange ao alterar o Select", () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/itens por página/i), {
      target: { value: "25" },
    });
    expect(defaultProps.onItemsPerPageChange).toHaveBeenCalledWith(25);
  });
});
