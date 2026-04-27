import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { MenuStylesEditor } from "./MenuStylesEditor";

describe("MenuStylesEditor", () => {
  const mockMenuStyle = {
    id: "style-1",
    template: "classic",
    primaryColor: "#1a1a1a",
    secondaryColor: "#f5f5f5",
    accentColor: "#d4a574",
    fontFamily: "inter",
    logoUrl: null,
    coverImageUrl: null,
  };

  it("renders menu styles title", () => {
    render(<MenuStylesEditor menuStyle={mockMenuStyle as any} />);
    expect(screen.getByText("Estilos del Menú")).toBeInTheDocument();
  });

  it("renders template options", () => {
    render(<MenuStylesEditor menuStyle={mockMenuStyle as any} />);
    const options = screen.getAllByText("Clásico");
    expect(options.length).toBeGreaterThan(0);
    expect(screen.getByText("Moderno")).toBeInTheDocument();
    expect(screen.getByText("Minimalista")).toBeInTheDocument();
    expect(screen.getByText("Rústico")).toBeInTheDocument();
  });

  it("renders save button", () => {
    render(<MenuStylesEditor menuStyle={mockMenuStyle as any} />);
    expect(screen.getByText("Guardar Cambios")).toBeInTheDocument();
  });
});
