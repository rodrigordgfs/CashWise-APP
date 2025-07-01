import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterCard } from "./index";

jest.useFakeTimers();

describe("FilterCard", () => {
  it("alterna visibilidade ao clicar no botão", async () => {
    const user = userEvent.setup({ delay: null }); // para controle manual do tempo
    render(
      <FilterCard>
        <p>Conteúdo de filtros</p>
      </FilterCard>
    );

    const toggleBtn = screen.getByRole("button", { name: "toggle-filters" });

    // Clica para esconder
    await act(async () => {
      await user.click(toggleBtn);
      jest.advanceTimersByTime(300); // avanço da animação
    });

    await waitFor(() => {
      const wrapper = screen
        .getByText("Conteúdo de filtros")
        .parentElement?.parentElement;
      expect(wrapper).toHaveStyle({ height: "0px" });
    });

    // Clica novamente para mostrar
    await act(async () => {
      await user.click(toggleBtn);
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      const wrapper = screen
        .getByText("Conteúdo de filtros")
        .parentElement?.parentElement;
      expect(wrapper).toHaveStyle({ height: "auto" });
    });
  });
});
