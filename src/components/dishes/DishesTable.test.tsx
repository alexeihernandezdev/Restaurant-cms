import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { DishesTable } from "./DishesTable";

describe("DishesTable", () => {
  const mockCategories = [
    { id: "cat-1", name: "Entrantes" },
    { id: "cat-2", name: "Principales" },
  ];

  const mockDishes = [
    {
      id: "dish-1",
      name: "Paella",
      description: "Arroz con mariscos",
      price: 15.5,
      imageUrl: null,
      available: true,
      order: 0,
      categoryId: "cat-2",
      tenantId: "tenant-1",
    },
  ];

  it("renders empty state when no dishes", () => {
    render(<DishesTable dishes={[]} categories={mockCategories} />);
    expect(screen.getByText("No hay platos registrados")).toBeInTheDocument();
  });

  it("renders dish data correctly", () => {
    render(
      <DishesTable dishes={mockDishes as any} categories={mockCategories} />,
    );
    expect(screen.getByText("Paella")).toBeInTheDocument();
    expect(screen.getByText("$15.50")).toBeInTheDocument();
  });

  it("renders category names", () => {
    render(
      <DishesTable dishes={mockDishes as any} categories={mockCategories} />,
    );
    expect(screen.getByText("Principales")).toBeInTheDocument();
  });

  it("renders availability badges", () => {
    render(
      <DishesTable dishes={mockDishes as any} categories={mockCategories} />,
    );
    expect(screen.getByText("Sí")).toBeInTheDocument();
  });
});
