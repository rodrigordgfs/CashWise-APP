import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RadioGroup } from "./index";

describe("<RadioGroup />", () => {
  const options = [
    { value: "daily", label: "Diário" },
    { value: "weekly", label: "Semanal" },
    { value: "monthly", label: "Mensal" },
  ];

  it("renderiza o grupo com rótulo e opções", () => {
    render(
      <RadioGroup
        name="recurrence"
        label="Frequência"
        value="weekly"
        options={options}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByText("Frequência")).toBeInTheDocument();

    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });

    // Verifica se "weekly" está selecionado
    const weeklyRadio = screen.getByLabelText("Semanal") as HTMLInputElement;
    expect(weeklyRadio.checked).toBe(true);
  });

  it("chama onChange ao clicar em uma opção diferente", () => {
    const onChange = jest.fn();

    render(
      <RadioGroup
        name="recurrence"
        value="daily"
        options={options}
        onChange={onChange}
      />
    );

    const monthlyRadio = screen.getByLabelText("Mensal");
    fireEvent.click(monthlyRadio);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("monthly");
  });

  it("não chama onChange se clicar na opção já selecionada", () => {
    const onChange = jest.fn();

    render(
      <RadioGroup
        name="recurrence"
        value="weekly"
        options={options}
        onChange={onChange}
      />
    );

    const weeklyRadio = screen.getByLabelText("Semanal");
    fireEvent.click(weeklyRadio);

    // Esperado: não deve chamar onChange, pois já está selecionado
    expect(onChange).not.toHaveBeenCalled();
  });
});
