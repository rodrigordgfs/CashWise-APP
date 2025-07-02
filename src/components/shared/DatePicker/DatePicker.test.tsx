import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as DayPickerModule from "react-day-picker";
import { DatePicker } from "./index";

// Interface para o mock do DayPicker
interface DayPickerMock extends Partial<typeof DayPickerModule> {
  __onSelect?: (date: Date | undefined) => void;
}
const dayPickerModuleMock = DayPickerModule as DayPickerMock;

// Mock parcial do DayPicker para capturar onSelect
jest.mock("react-day-picker", () => {
  return {
    DayPicker: jest.fn(({ onSelect }) => {
      dayPickerModuleMock.__onSelect = onSelect;
      return <div>Mocked DayPicker</div>;
    }),
  };
});

// Mock simplificado do objeto field do react-hook-form
const createFieldMock = (value = "") => ({
  value,
  onChange: jest.fn(),
  onBlur: jest.fn(),
  name: "date",
  ref: jest.fn(),
});

describe("DatePicker", () => {
  it("renderiza label, input com placeholder e valor vazio inicialmente", () => {
    const field = createFieldMock();
    render(<DatePicker field={field} label="Data de nascimento" />);
    expect(screen.getByLabelText("Data de nascimento")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Selecione a data")).toHaveValue("");
  });

  it("abre e fecha o calendário ao clicar no input e no botão fechar", async () => {
    const user = userEvent.setup();
    const field = createFieldMock();
    render(<DatePicker field={field} />);

    const input = screen.getByRole("textbox");
    expect(screen.queryByText("Selecione uma data")).not.toBeInTheDocument();

    await user.click(input);
    expect(screen.getByText("Selecione uma data")).toBeInTheDocument();

    const closeButton = screen.getByLabelText("Fechar calendário");
    await user.click(closeButton);
    expect(screen.queryByText("Selecione uma data")).not.toBeInTheDocument();
  });

  it("mostra mensagem de erro se passada via prop", () => {
    const field = createFieldMock();
    render(<DatePicker field={field} error="Data inválida" />);
    expect(screen.getByText("Data inválida")).toBeInTheDocument();
  });

  it("formata e mostra valor de field.value no input", () => {
    const field = createFieldMock("2023-07-01T00:00:00Z");
    render(<DatePicker field={field} />);
    expect(screen.getByRole("textbox")).toHaveValue("01/07/2023");
  });

  it("limpa valor ao clicar em Limpar e fecha calendário", async () => {
    const user = userEvent.setup();
    const field = createFieldMock("2023-07-01T00:00:00Z");
    render(<DatePicker field={field} />);

    await user.click(screen.getByRole("textbox"));
    expect(screen.getByText("Selecione uma data")).toBeInTheDocument();

    const clearButton = screen.getByRole("button", { name: "Limpar" });
    await user.click(clearButton);

    expect(field.onChange).toHaveBeenCalledWith("");
    expect(screen.queryByText("Selecione uma data")).not.toBeInTheDocument();
  });

  it("chama onChange com data formatada ao selecionar uma data no DayPicker", () => {
    const field = createFieldMock();
    render(<DatePicker field={field} />);

    fireEvent.click(screen.getByRole("textbox"));
    expect(screen.getByText("Mocked DayPicker")).toBeInTheDocument();

    const onSelect = dayPickerModuleMock.__onSelect;
    if (!onSelect) throw new Error("onSelect não foi mockado");

    const fakeDate = new Date(2023, 6, 15);
    act(() => {
      onSelect(fakeDate);
    });

    expect(field.onChange).toHaveBeenCalled();
    const calledArg = field.onChange.mock.calls[0][0];
    expect(calledArg).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("fecha o calendário ao clicar fora", async () => {
    const user = userEvent.setup();
    const field = createFieldMock();
    const { container } = render(<DatePicker field={field} />);

    await user.click(screen.getByRole("textbox"));
    expect(screen.getByText("Selecione uma data")).toBeInTheDocument();

    await user.click(container);
    expect(screen.queryByText("Selecione uma data")).not.toBeInTheDocument();
  });
});
