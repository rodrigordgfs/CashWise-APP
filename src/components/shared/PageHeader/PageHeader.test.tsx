import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PageHeader } from "./index";

jest.mock("@/components/shared/Button", () => {
  const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    onClick,
    disabled,
  }) => (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
  return { Button };
});

const MockIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => <svg data-testid="icon" ref={ref} {...props} />
);
MockIcon.displayName = "MockIcon";

describe("<PageHeader />", () => {
  it("renderiza título e subtítulo", () => {
    render(<PageHeader title="Título Principal" subtitle="Subtítulo legal" />);
    expect(screen.getByText("Título Principal")).toBeInTheDocument();
    expect(screen.getByText("Subtítulo legal")).toBeInTheDocument();
  });

  it("renderiza apenas o título quando não há subtítulo", () => {
    render(<PageHeader title="Só o título" />);
    expect(screen.getByText("Só o título")).toBeInTheDocument();
    expect(screen.queryByText("Subtítulo legal")).not.toBeInTheDocument();
  });

  it("renderiza botão de ação e chama onActionClick", () => {
    const onActionClick = jest.fn();
    render(
      <PageHeader
        title="Com Ação"
        actionTitle="Botão Ação"
        actionIcon={MockIcon}
        onActionClick={onActionClick}
      />
    );
    const button = screen.getByRole("button", { name: /botão ação/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onActionClick).toHaveBeenCalledTimes(1);
  });

  it("renderiza botão de segunda ação e chama onSecondActionClick", () => {
    const onSecondActionClick = jest.fn();
    render(
      <PageHeader
        title="Com Segunda Ação"
        actionTitle="Botão Ação"
        actionIcon={MockIcon}
        onActionClick={() => {}}
        secondActionTitle="Segundo Botão"
        secondActionIcon={MockIcon}
        onSecondActionClick={onSecondActionClick}
      />
    );
    const secondButton = screen.getByRole("button", { name: /segundo botão/i });
    expect(secondButton).toBeInTheDocument();
    fireEvent.click(secondButton);
    expect(onSecondActionClick).toHaveBeenCalledTimes(1);
  });

  it("desabilita botões conforme props", () => {
    render(
      <PageHeader
        title="Desabilitados"
        actionTitle="Botão Ação"
        actionIcon={MockIcon}
        onActionClick={() => {}}
        actionDisabled={true}
        secondActionTitle="Segundo Botão"
        secondActionIcon={MockIcon}
        onSecondActionClick={() => {}}
        secondActionDisabled={true}
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });
});
