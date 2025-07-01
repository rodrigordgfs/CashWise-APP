import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MonthDatePicker } from "./index";

describe("<MonthDatePicker />", () => {
  const onChangeMock = jest.fn();
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("não renderiza nada quando isOpen é false", () => {
    const { container } = render(
      <MonthDatePicker
        isOpen={false}
        onClose={onCloseMock}
        onChange={onChangeMock}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renderiza ano atual quando não há selectedDate", () => {
    render(
      <MonthDatePicker
        isOpen={true}
        onClose={onCloseMock}
        onChange={onChangeMock}
      />
    );
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(year)).toBeInTheDocument();
  });

  it("renderiza o ano do selectedDate", () => {
    render(
      <MonthDatePicker
        isOpen={true}
        onClose={onCloseMock}
        onChange={onChangeMock}
        selectedDate={new Date(2022, 5, 1)}
      />
    );
    expect(screen.getByText("2022")).toBeInTheDocument();
  });

  it("navega entre anos ao clicar nos botões", () => {
    render(
      <MonthDatePicker
        isOpen={true}
        onClose={onCloseMock}
        onChange={onChangeMock}
        selectedDate={new Date(2022, 0, 1)}
      />
    );
    const btnPrev = screen.getByRole("button", { name: /ano anterior/i });
    const btnNext = screen.getByRole("button", { name: /ano seguinte/i });

    fireEvent.click(btnPrev);
    expect(screen.getByText("2021")).toBeInTheDocument();

    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("desabilita meses fora do intervalo minDate e maxDate", () => {
    render(
      <MonthDatePicker
        isOpen={true}
        onClose={onCloseMock}
        onChange={onChangeMock}
        minDate={new Date(2022, 3, 1)} // Abril 2022
        maxDate={new Date(2022, 8, 1)} // Setembro 2022
        selectedDate={new Date(2022, 0, 1)}
      />
    );

    // Janeiro, Fevereiro, Março devem estar desabilitados (antes de Abril)
    expect(screen.getByRole("button", { name: "Janeiro" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Fevereiro" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Março" })).toBeDisabled();

    // Abril a Setembro habilitados
    expect(screen.getByRole("button", { name: "Abril" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Setembro" })).toBeEnabled();

    // Outubro, Novembro, Dezembro desabilitados (depois de Setembro)
    expect(screen.getByRole("button", { name: "Outubro" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Novembro" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Dezembro" })).toBeDisabled();
  });

  it("chama onChange e onClose ao selecionar um mês habilitado", () => {
    render(
      <MonthDatePicker
        isOpen={true}
        onClose={onCloseMock}
        onChange={onChangeMock}
        selectedDate={new Date(2022, 0, 1)}
      />
    );

    const maioBtn = screen.getByRole("button", { name: "Maio" });
    fireEvent.click(maioBtn);

    expect(onChangeMock).toHaveBeenCalledWith(new Date(2022, 4, 1));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("não permite selecionar meses desabilitados", () => {
    render(
      <MonthDatePicker
        isOpen={true}
        onClose={onCloseMock}
        onChange={onChangeMock}
        minDate={new Date(2022, 5, 1)} // Junho
        selectedDate={new Date(2022, 0, 1)}
      />
    );

    const maioBtn = screen.getByRole("button", { name: "Maio" }); // Maio desabilitado
    expect(maioBtn).toBeDisabled();

    fireEvent.click(maioBtn);
    expect(onChangeMock).not.toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("chama onClose ao clicar no botão fechar", () => {
    render(
      <MonthDatePicker
        isOpen={true}
        onClose={onCloseMock}
        onChange={onChangeMock}
      />
    );

    const closeButton = screen.getByRole("button", { name: /fechar calendário/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("chama onClose ao clicar fora do modal", () => {
    render(
      <MonthDatePicker
        isOpen={true}
        onClose={onCloseMock}
        onChange={onChangeMock}
      />
    );

    fireEvent.mouseDown(document);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
