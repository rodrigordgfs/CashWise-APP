import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./index";

describe("<Modal />", () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("não renderiza nada quando isOpen é false", () => {
    const { container } = render(
      <Modal isOpen={false} title="Título" onClose={onClose}>
        <p>Conteúdo</p>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renderiza título, descrição e children quando aberto", () => {
    render(
      <Modal
        isOpen={true}
        title="Meu Modal"
        description="Descrição aqui"
        onClose={onClose}
      >
        <p>Conteúdo do modal</p>
      </Modal>
    );

    expect(screen.getByText("Meu Modal")).toBeInTheDocument();
    expect(screen.getByText("Descrição aqui")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo do modal")).toBeInTheDocument();
  });

  it("renderiza apenas título e children quando descrição não fornecida", () => {
    render(
      <Modal isOpen={true} title="Modal sem descrição" onClose={onClose}>
        <span>Filhos</span>
      </Modal>
    );
    expect(screen.getByText("Modal sem descrição")).toBeInTheDocument();
    expect(screen.queryByText(/Descrição/)).toBeNull();
    expect(screen.getByText("Filhos")).toBeInTheDocument();
  });

  it("chama onClose ao clicar no botão cancelar", () => {
    render(
      <Modal isOpen={true} title="Test" onClose={onClose}>
        <p>Conteúdo</p>
      </Modal>
    );

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renderiza botão confirmar quando onConfirm é passado e chama onConfirm ao clicar", () => {
    render(
      <Modal
        isOpen={true}
        title="Test"
        onClose={onClose}
        onConfirm={onConfirm}
        confirmLabel="Confirmar"
      >
        <p>Conteúdo</p>
      </Modal>
    );

    const confirmButton = screen.getByRole("button", { name: /confirmar/i });
    expect(confirmButton).toBeInTheDocument();

    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("usa labels padrão para os botões quando não passados", () => {
    render(
      <Modal isOpen={true} title="Test" onClose={onClose} onConfirm={onConfirm}>
        <p>Conteúdo</p>
      </Modal>
    );

    expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("desabilita botões quando isLoading=true", () => {
    render(
      <Modal
        isOpen={true}
        title="Loading"
        onClose={onClose}
        onConfirm={onConfirm}
        isLoading={true}
      >
        <p>Conteúdo</p>
      </Modal>
    );

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    const confirmButton = screen.getByRole("button", { name: /salvar/i });

    expect(cancelButton).toBeDisabled();
    expect(confirmButton).toBeDisabled();
  });
});
