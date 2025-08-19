import React from "react";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./index";

describe("<ProgressBar />", () => {
  it("renderiza corretamente com progresso normal (< 75%)", () => {
    render(<ProgressBar percentage={50} />);

    const progressText = screen.getByText("50%");
    expect(progressText).toBeInTheDocument();
    expect(progressText).toHaveClass("text-zinc-500");

    const progressFill = screen.getByRole("progressbar");
    expect(progressFill).toHaveStyle("width: 50%");
    expect(progressFill).toHaveClass("bg-emerald-500");
  });

  it("aplica estilo de aviso quando percentage >= 75 e < 90", () => {
    render(<ProgressBar percentage={80} />);

    expect(screen.getByText("80%")).toHaveClass("text-amber-500");
    expect(screen.getByRole("progressbar")).toHaveClass("bg-amber-500");
  });

  it("aplica estilo de perigo quando percentage >= 90", () => {
    render(<ProgressBar percentage={95} />);

    expect(screen.getByText("95%")).toHaveClass("text-red-500");
    expect(screen.getByRole("progressbar")).toHaveClass("bg-red-500");
  });

  it("limita o progresso máximo a 100%", () => {
    render(<ProgressBar percentage={150} />);

    expect(screen.getByText("150%")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveStyle("width: 100%");
  });
});
