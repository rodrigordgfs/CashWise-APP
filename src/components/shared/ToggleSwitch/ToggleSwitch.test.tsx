import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToggleSwitch } from "./index";

describe("<ToggleSwitch />", () => {
  it("renderiza label e descrição quando fornecidos", () => {
    render(
      <ToggleSwitch
        label="Ativar recurso"
        description="Descrição do recurso"
        checked={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Ativar recurso")).toBeInTheDocument();
    expect(screen.getByText("Descrição do recurso")).toBeInTheDocument();
  });

  it("não renderiza descrição se não for passada", () => {
    render(
      <ToggleSwitch label="Somente label" checked={false} onChange={() => {}} />
    );

    expect(screen.getByText("Somente label")).toBeInTheDocument();
    expect(screen.queryByText(/Descrição do recurso/i)).not.toBeInTheDocument();
  });

  it("reflete estado inicial de checked", () => {
    const { rerender } = render(
      <ToggleSwitch checked={true} onChange={() => {}} />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    rerender(<ToggleSwitch checked={false} onChange={() => {}} />);
    expect(checkbox).not.toBeChecked();
  });

  it("chama onChange com o novo valor quando clicado", () => {
    const handleChange = jest.fn();

    render(<ToggleSwitch checked={false} onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);

    // Aqui, o componente ainda está com checked=false, então o clique seguinte também enviará true
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
    // Mantém a expectativa com true porque checked não mudou no componente
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("não chama onChange quando desabilitado", () => {
    const handleChange = jest.fn();

    render(<ToggleSwitch checked={false} onChange={handleChange} disabled />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeDisabled();

    fireEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("associa label ao input pelo mesmo id", () => {
    render(<ToggleSwitch label="Toggle" checked={false} onChange={() => {}} />);

    const label = screen.getByText("Toggle");
    const checkbox = screen.getByRole("checkbox");

    expect(label).toHaveAttribute("for", checkbox.getAttribute("id"));
  });
});
