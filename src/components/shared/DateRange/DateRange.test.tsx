// src/components/shared/DateRange/DateRange.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateRange } from "./index";

const labels = {
  filterByDate: "Filtrar por data",
  clear: "Limpar",
  selectDate: "Selecione uma data",
  closeCalendar: "Fechar calendário",
};

// Mock do DayPicker para simplificar o teste
jest.mock("react-day-picker", () => ({
  DayPicker: () => <div>Mocked DayPicker</div>,
}));

describe("DateRange", () => {
  it("renderiza botão sem data selecionada inicialmente", () => {
    render(<DateRange labels={labels} onChange={jest.fn()} />);
    const button = screen.getByRole("button", { name: labels.filterByDate });
    expect(button).toBeInTheDocument();
    // Não tem texto no botão inicialmente (só ícone)
  });

  it("renderiza botão com intervalo de datas formatado", () => {
    const from = new Date(2023, 5, 1);
    const to = new Date(2023, 5, 15);
    render(
      <DateRange
        selectedRange={{ from, to }}
        labels={labels}
        onChange={jest.fn()}
      />
    );
    const button = screen.getByRole("button", { name: labels.filterByDate });
    expect(button).toHaveTextContent("01/06/2023 a 15/06/2023");
  });

  it("abre o calendário ao clicar no botão e fecha ao clicar no backdrop", async () => {
    const user = userEvent.setup();
    render(<DateRange labels={labels} onChange={jest.fn()} />);

    const button = screen.getByRole("button", { name: labels.filterByDate });
    await user.click(button);

    expect(screen.getByText("Mocked DayPicker")).toBeInTheDocument();
    expect(screen.getByText(labels.selectDate)).toBeInTheDocument();

    const backdrop = screen.getByTestId("backdrop");
    await user.click(backdrop);

    expect(screen.queryByText("Mocked DayPicker")).not.toBeInTheDocument();
  });

  it("chama onChange com range vazio ao clicar em Limpar", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <DateRange
        selectedRange={{ from: new Date(2023, 5, 1), to: new Date(2023, 5, 15) }}
        labels={labels}
        onChange={handleChange}
      />
    );

    const button = screen.getByRole("button", { name: labels.filterByDate });
    await user.click(button);

    const clearButton = screen.getByText(labels.clear);
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith({ from: undefined, to: undefined });
    expect(screen.queryByText("Mocked DayPicker")).not.toBeInTheDocument();
  });

  it("fecha o calendário ao clicar no botão Fechar", async () => {
    const user = userEvent.setup();
    render(<DateRange labels={labels} onChange={jest.fn()} />);

    const button = screen.getByRole("button", { name: labels.filterByDate });
    await user.click(button);

    const closeButton = screen.getByLabelText(labels.closeCalendar);
    await user.click(closeButton);

    expect(screen.queryByText("Mocked DayPicker")).not.toBeInTheDocument();
  });
});
