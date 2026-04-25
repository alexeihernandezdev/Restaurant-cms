import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { DishModal } from "./DishModal";

describe("DishModal", () => {
  const mockCategories = [
    { id: "cat-1", name: "Entrantes" },
    { id: "cat-2", name: "Principales" },
  ];

  it("renders new dish button", () => {
    render(<DishModal categories={mockCategories} />);
    expect(screen.getByText("Nuevo Plato")).toBeInTheDocument();
  });
});
