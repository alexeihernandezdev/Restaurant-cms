import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { CategoryActions } from "./CategoryActions";

describe("CategoryActions", () => {
  const mockCategory = {
    id: "cat-1",
    name: "Entrantes",
    description: "Para compartir",
  };

  it("renders edit and delete buttons", () => {
    render(<CategoryActions category={mockCategory} />);
    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });
});
