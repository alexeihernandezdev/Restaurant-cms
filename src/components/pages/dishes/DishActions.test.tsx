import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { DishActions } from "./DishActions";

describe("DishActions", () => {
  const mockCategories = [
    { id: "cat-1", name: "Entrantes" },
    { id: "cat-2", name: "Principales" },
  ];

  const mockDish = {
    id: "dish-1",
    name: "Paella",
    description: "Arroz con mariscos",
    price: 15.5,
    imageUrl: null,
    available: true,
    order: 0,
    categoryId: "cat-2",
    tenantId: "tenant-1",
  };

  it("renders edit and delete buttons", () => {
    render(<DishActions dish={mockDish as any} categories={mockCategories} />);
    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });
});
