import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MenuDisplay } from "./MenuDisplay";

describe("MenuDisplay", () => {
  const baseStyle = {
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

  const mockTenant = {
    name: "Restaurante Ejemplo",
    slug: "ejemplo",
    logoUrl: null,
    menuStyle: baseStyle,
    categories: [
      {
        id: "cat-1",
        name: "Entrantes",
        description: "Para compartir",
        dishes: [
          {
            id: "dish-1",
            name: "Ensalada",
            description: "Fresca y deliciosa",
            price: 8.5,
            imageUrl: null,
            available: true,
          },
        ],
      },
    ],
  };

  it("renders restaurant name", () => {
    render(<MenuDisplay tenant={mockTenant as any} />);
    expect(screen.getByText("Restaurante Ejemplo")).toBeInTheDocument();
  });

  it("renders category name", () => {
    render(<MenuDisplay tenant={mockTenant as any} />);
    expect(screen.getByText("Entrantes")).toBeInTheDocument();
  });

  it("renders dish name and price", () => {
    render(<MenuDisplay tenant={mockTenant as any} />);
    expect(screen.getByText("Ensalada")).toBeInTheDocument();
    expect(screen.getByText("$8.50")).toBeInTheDocument();
  });

  it("renders custom currency", () => {
    const tenant = {
      ...mockTenant,
      menuStyle: { ...baseStyle, currency: "€" },
    };
    render(<MenuDisplay tenant={tenant as any} />);
    expect(screen.getByText("€8.50")).toBeInTheDocument();
  });

  it("renders empty state when no categories", () => {
    const emptyTenant = { ...mockTenant, categories: [] };
    render(<MenuDisplay tenant={emptyTenant as any} />);
    expect(screen.getByText(/no tiene platos/i)).toBeInTheDocument();
  });

  it("hides description when showDescriptions is false", () => {
    const tenant = {
      ...mockTenant,
      menuStyle: { ...baseStyle, showDescriptions: false },
    };
    render(<MenuDisplay tenant={tenant as any} />);
    expect(screen.queryByText("Fresca y deliciosa")).not.toBeInTheDocument();
  });

  it("renders tagline when set", () => {
    const tenant = {
      ...mockTenant,
      menuStyle: { ...baseStyle, tagline: "Cocina con alma" },
    };
    render(<MenuDisplay tenant={tenant as any} />);
    expect(screen.getByText("Cocina con alma")).toBeInTheDocument();
  });
});
