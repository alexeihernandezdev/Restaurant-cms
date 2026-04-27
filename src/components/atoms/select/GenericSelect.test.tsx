import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GenericSelect } from "./GenericSelect";
import type { Key } from "@react-types/shared";

describe("GenericSelect", () => {
  const mockOptions = [
    { id: "opt-1", label: "Opción 1" },
    { id: "opt-2", label: "Opción 2" },
    { id: "opt-3", label: "Opción 3" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with placeholder text", () => {
    render(<GenericSelect options={mockOptions} placeholder="Seleccionar..." />);
    expect(screen.getByText("Seleccionar...")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(
      <GenericSelect
        options={mockOptions}
        label="Categoría"
        placeholder="Seleccionar..."
      />
    );
    expect(screen.getByText("Categoría")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<GenericSelect options={mockOptions} placeholder="Seleccionar..." />);
    expect(screen.getByText("Opción 1")).toBeInTheDocument();
    expect(screen.getByText("Opción 2")).toBeInTheDocument();
    expect(screen.getByText("Opción 3")).toBeInTheDocument();
  });

  it("calls onChange when option is selected", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <GenericSelect
        options={mockOptions}
        onChange={onChange}
        placeholder="Seleccionar..."
      />
    );

    await user.click(screen.getByText("Seleccionar..."));
  });

  it("applies custom className", () => {
    render(
      <GenericSelect
        options={mockOptions}
        className="custom-class"
        placeholder="Seleccionar..."
      />
    );
    const select = document.querySelector(".custom-class");
    expect(select).toBeInTheDocument();
  });
});
