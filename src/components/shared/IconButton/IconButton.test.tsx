import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "./index";
import { Plus } from "lucide-react";

describe("IconButton", () => {
  it("renderiza o botão com o ícone e o nome acessível", () => {
    render(<IconButton icon={Plus} name="Adicionar" onClick={() => {}} />);
    
    const button = screen.getByRole("button", { name: /adicionar/i });
    expect(button).toBeInTheDocument();
  });

  it("chama onClick ao clicar no botão", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<IconButton icon={Plus} name="Adicionar" onClick={handleClick} />);
    
    const button = screen.getByRole("button", { name: /adicionar/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("não chama onClick se estiver desabilitado", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <IconButton
        icon={Plus}
        name="Adicionar"
        onClick={handleClick}
        disabled
      />
    );

    const button = screen.getByRole("button", { name: /adicionar/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
