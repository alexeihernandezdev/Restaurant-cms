import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { CategoriesList } from "./CategoriesList";

describe("CategoriesList", () => {
  const mockCategories = [
    {
      id: "cat-1",
      name: "Entrantes",
      description: "Para compartir",
      order: 0,
      tenantId: "tenant-1",
      _count: { dishes: 5 },
    },
    {
      id: "cat-2",
      name: "Principales",
      description: "Platos fuertes",
      order: 1,
      tenantId: "tenant-1",
      _count: { dishes: 10 },
    },
  ];

  it("renders empty state when no categories", () => {
    render(<CategoriesList categories={[]} />);
    expect(
      screen.getByText(/No hay categorías registradas/i),
    ).toBeInTheDocument();
  });

  it("renders category cards", () => {
    render(<CategoriesList categories={mockCategories as any} />);
    expect(screen.getByText("Entrantes")).toBeInTheDocument();
    expect(screen.getByText("Principales")).toBeInTheDocument();
  });

  it("renders dish counts", () => {
    render(<CategoriesList categories={mockCategories as any} />);
    expect(screen.getByText("5 platos")).toBeInTheDocument();
    expect(screen.getByText("10 platos")).toBeInTheDocument();
  });
});
