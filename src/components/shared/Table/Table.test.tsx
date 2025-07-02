import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./index";

// Mock do contexto de diálogo
const showDialogMock = jest.fn();
jest.mock("@/context/dialogContext", () => ({
  useDialog: () => ({
    showDialog: showDialogMock,
  }),
}));

// Mock da tradução
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "transactions.dialogDeleteTitle": "Confirmar exclusão",
        "transactions.dialogDeleteDescription":
          "Tem certeza que deseja excluir?",
        "transactions.dialogDeleteConfirm": "Excluir",
        "transactions.dialogDeleteCancel": "Cancelar",
      };
      return translations[key] ?? key;
    },
  }),
}));

describe("<Table />", () => {
  const mockData = [
    { id: 1, name: "Exemplo 1" },
    { id: 2, name: "Exemplo 2" },
  ] as const;

  const columns: {
    key: "name" | "actions" | "id";
    label: string;
    hidden?: boolean;
  }[] = [
    { key: "name", label: "Nome" },
    { key: "actions", label: "Ações" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza cabeçalho e linhas", () => {
    render(
      <Table>
        <Table.Header columns={columns} />
        <Table.Body>
          {mockData.map((item) => (
            <Table.Row key={item.id} data={item} columns={columns} />
          ))}
        </Table.Body>
      </Table>
    );

    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Exemplo 1")).toBeInTheDocument();
    expect(screen.getByText("Exemplo 2")).toBeInTheDocument();
  });

  it("chama onClickEdit e showDialog ao clicar nos botões", () => {
    const onClickEdit = jest.fn();

    render(
      <Table>
        <Table.Header columns={columns} />
        <Table.Body>
          <Table.Row
            data={mockData[0]}
            columns={columns}
            onClickEdit={onClickEdit}
            onClickDelete={() => showDialogMock()}
          />
        </Table.Body>
      </Table>
    );

    fireEvent.click(screen.getByRole("button", { name: /editar/i }));
    expect(onClickEdit).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /excluir/i }));
    expect(showDialogMock).toHaveBeenCalledTimes(1);
    expect(showDialogMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Confirmar exclusão",
        description: "Tem certeza que deseja excluir?",
        confirmLabel: "Excluir",
        cancelLabel: "Cancelar",
      })
    );
  });

  it("não renderiza colunas escondidas", () => {
    const hiddenColumns: {
      key: "name" | "actions" | "id";
      label: string;
      hidden?: boolean;
    }[] = [{ key: "name", label: "Nome", hidden: true }];

    render(
      <Table>
        <Table.Header columns={hiddenColumns} />
        <Table.Body>
          <Table.Row data={mockData[0]} columns={hiddenColumns} />
        </Table.Body>
      </Table>
    );

    expect(screen.queryByText("Nome")).not.toBeInTheDocument();
    expect(screen.queryByText("Exemplo 1")).not.toBeInTheDocument();
  });
});
