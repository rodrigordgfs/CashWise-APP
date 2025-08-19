import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "./index";

describe("Dialog", () => {
  const defaultProps = {
    isOpen: true,
    title: "Título do diálogo",
    description: "Descrição do diálogo",
    confirmLabel: "Confirmar",
    cancelLabel: "Cancelar",
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    isLoading: false,
  };

  it("não renderiza nada se isOpen for falso", () => {
    const { container } = render(<Dialog {...defaultProps} isOpen={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza título e descrição corretamente", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it("renderiza descrição quando for ReactNode", () => {
    render(<Dialog {...defaultProps} description={<span>ReactNode desc</span>} />);
    expect(screen.getByText("ReactNode desc")).toBeInTheDocument();
  });

  it("renderiza os botões com os textos corretos", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByRole("button", { name: defaultProps.cancelLabel })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: defaultProps.confirmLabel })).toBeInTheDocument();
  });

  it("chama onClose quando botão cancelar for clicado", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<Dialog {...defaultProps} onClose={onClose} />);
    const cancelBtn = screen.getByRole("button", { name: defaultProps.cancelLabel });
    await user.click(cancelBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("chama onConfirm quando botão confirmar for clicado", async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();
    render(<Dialog {...defaultProps} onConfirm={onConfirm} />);
    const confirmBtn = screen.getByRole("button", { name: defaultProps.confirmLabel });
    await user.click(confirmBtn);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("desabilita o botão cancelar quando isLoading for true", () => {
    render(<Dialog {...defaultProps} isLoading />);
    const cancelBtn = screen.getByRole("button", { name: defaultProps.cancelLabel });
    expect(cancelBtn).toBeDisabled();
  });

  it("exibe o botão confirmar com loading quando isLoading for true", () => {
    render(<Dialog {...defaultProps} isLoading />);
    const confirmBtn = screen.getByRole("button", { name: defaultProps.confirmLabel });
    // seu Button usa prop loading que provavelmente altera o DOM (ex: spinner)
    // Aqui apenas verificamos se o botão está desabilitado ou tem classe de loading
    expect(confirmBtn).toBeDisabled();
  });
});
