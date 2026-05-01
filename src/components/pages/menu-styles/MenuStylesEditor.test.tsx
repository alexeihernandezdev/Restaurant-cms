import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { MenuStylesEditor } from "./MenuStylesEditor";

describe("MenuStylesEditor", () => {
  const mockMenuStyle = {
    id: "style-1",
    tenantId: "tenant-1",
    template: "classic",
    primaryColor: "#1a1a1a",
    secondaryColor: "#f5f5f5",
    accentColor: "#d4a574",
    backgroundColor: "#ffffff",
    fontFamily: "inter",
    headingFont: "playfair",
    layout: "grid",
    cardStyle: "elevated",
    borderRadius: "medium",
    spacing: "cozy",
    showImages: true,
    showDescriptions: true,
    priceStyle: "inline",
    headerStyle: "centered",
    dividerStyle: "line",
    currency: "$",
    tagline: null,
    logoUrl: null,
    coverImageUrl: null,
  };

  it("renders menu styles title", () => {
    render(<MenuStylesEditor menuStyle={mockMenuStyle as any} />);
    expect(screen.getByText("Estilos del Menú")).toBeInTheDocument();
  });

  it("renders all template presets", () => {
    render(<MenuStylesEditor menuStyle={mockMenuStyle as any} />);
    const labels = [
      "Clásico",
      "Moderno",
      "Minimalista",
      "Rústico",
      "Elegante",
      "Bistró",
      "Editorial",
      "Tropical",
      "Noir",
      "Botánico",
    ];
    for (const label of labels) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("renders save button", () => {
    render(<MenuStylesEditor menuStyle={mockMenuStyle as any} />);
    expect(screen.getByText("Guardar Cambios")).toBeInTheDocument();
  });

  it("renders configuration sections", () => {
    render(<MenuStylesEditor menuStyle={mockMenuStyle as any} />);
    expect(screen.getByText("Plantilla")).toBeInTheDocument();
    expect(screen.getByText("Colores")).toBeInTheDocument();
    expect(screen.getByText("Tipografía")).toBeInTheDocument();
    expect(screen.getByText("Disposición")).toBeInTheDocument();
    expect(screen.getByText("Cabecera")).toBeInTheDocument();
    expect(screen.getByText("Detalles del menú")).toBeInTheDocument();
  });

  it("renders live preview header", () => {
    render(<MenuStylesEditor menuStyle={mockMenuStyle as any} />);
    expect(screen.getByText(/Vista previa en vivo/i)).toBeInTheDocument();
  });
});
