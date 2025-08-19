import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./index";

const typeText = async (elt: HTMLElement, text: string) => {
  await userEvent.clear(elt);
  await userEvent.type(elt, text);
};

function isChangeEvent(
  val: unknown
): val is React.ChangeEvent<HTMLInputElement> {
  return typeof val === "object" && val !== null && "target" in val;
}

describe("<Input />", () => {
  it("renderiza label e mensagem de erro", () => {
    render(
      <Input
        label="Nome"
        error="Campo obrigatório"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });

  it("exibe/oculta senha ao clicar no ícone", async () => {
    const Wrapper = () => {
      const [val, setVal] = React.useState("123");
      return (
        <Input
          label="Senha"
          type="password"
          value={val}
          onChange={(e) => {
            if (typeof e === "number") {
              setVal(e.toString());
            } else {
              setVal(e.target.value);
            }
          }}
        />
      );
    };

    render(<Wrapper />);

    const inp = screen.getByLabelText("Senha") as HTMLInputElement;
    expect(inp.type).toBe("password");

    const toggle = screen.getByRole("button", { name: /mostrar senha/i });
    await userEvent.click(toggle);
    expect(inp.type).toBe("text");

    const toggleAgain = screen.getByRole("button", { name: /ocultar senha/i });
    await userEvent.click(toggleAgain);
    expect(inp.type).toBe("password");
  });

  it("formata corretamente money e devolve número a onChange", async () => {
    const handle = jest.fn();

    const Wrapper = () => {
      const [val, setVal] = React.useState(0);
      return (
        <Input
          label="Preço"
          type="money"
          value={val}
          onChange={(v) => {
            setVal(v as number);
            handle(v);
          }}
        />
      );
    };

    render(<Wrapper />);

    const inp = screen.getByLabelText("Preço") as HTMLInputElement;

    await typeText(inp, "123450"); // digita 1234,50

    await waitFor(() => {
      expect(inp).toHaveValue("R$\xa01.234,50");
    });

    const lastCall = handle.mock.calls.at(-1)?.[0];

    if (typeof lastCall === "number") {
      expect(lastCall).toBeCloseTo(1234.5);
    } else if (isChangeEvent(lastCall)) {
      expect(parseFloat(lastCall.target.value || "0")).toBeCloseTo(1234.5);
    } else {
      throw new Error("Unexpected type for lastCall");
    }
  });

  it("limita e filtra somente dígitos em type=number", async () => {
    const Wrapper = () => {
      const [val, setVal] = React.useState("");
      return (
        <Input
          label="CPF"
          type="number"
          maxLength={11}
          value={val}
          onChange={(e) => {
            if (typeof e === "number") {
              setVal(e.toString());
            } else {
              setVal(e.target.value);
            }
          }}
        />
      );
    };

    render(<Wrapper />);

    const inp = screen.getByLabelText("CPF") as HTMLInputElement;
    await typeText(inp, "abc123456789999"); // tenta digitar letras e 14 dígitos

    await waitFor(() => {
      expect(inp).toHaveValue("12345678999"); // apenas 11 dígitos, letras removidas
    });
  });

  it("renderiza input de texto padrão", () => {
    const Wrapper = () => {
      const [val, setVal] = React.useState("teste@exemplo.com");
      return (
        <Input
          label="Email"
          type="text"
          value={val}
          onChange={(e) => {
            if (typeof e === "number") {
              setVal(e.toString());
            } else {
              setVal(e.target.value);
            }
          }}
        />
      );
    };

    render(<Wrapper />);

    const inp = screen.getByLabelText("Email") as HTMLInputElement;
    expect(inp).toBeInTheDocument();
    expect(inp).toHaveValue("teste@exemplo.com");
  });
});
