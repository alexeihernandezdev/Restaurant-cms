import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { CategoryModal } from "./CategoryModal";

describe("CategoryModal", () => {
  it("renders new category button", () => {
    render(<CategoryModal />);
    expect(screen.getByText("Nueva Categoría")).toBeInTheDocument();
  });
});
