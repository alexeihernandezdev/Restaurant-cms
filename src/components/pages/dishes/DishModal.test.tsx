import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DishModal } from "./DishModal";
import { createDish } from "@lib/api/dishes";

vi.mock("@lib/api/dishes", () => ({
  createDish: vi.fn().mockResolvedValue({ id: "new-dish-id" }),
}));

vi.mock("@lib/api/upload", () => ({
  uploadImage: vi
    .fn()
    .mockResolvedValue({ url: "http://example.com/image.jpg" }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

vi.mock("browser-image-compression", () => ({
  default: vi.fn().mockResolvedValue(new File([], "image.jpg")),
}));

describe("DishModal", () => {
  const mockCategories = [
    { id: "cat-1", name: "Entrantes" },
    { id: "cat-2", name: "Principales" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders new dish button", () => {
    render(<DishModal categories={mockCategories} />);
    expect(screen.getByText("Nuevo Plato")).toBeInTheDocument();
  });

  it("creates a new dish with all form fields", async () => {
    const user = userEvent.setup();
    render(<DishModal categories={mockCategories} />);

    await user.click(screen.getByText("Nuevo Plato"));

    await user.type(screen.getByPlaceholderText("Nombre del plato"), "Paella");
    await user.type(
      screen.getByPlaceholderText("Descripción (opcional)"),
      "Arroz con marisco",
    );
    await user.type(screen.getByPlaceholderText("Precio"), "15.99");

    const submitButton = screen.getByRole("button", { name: /crear plato/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createDish).toHaveBeenCalledWith({
        name: "Paella",
        description: "Arroz con marisco",
        price: 15.99,
        categoryId: "cat-1",
        available: true,
        imageUrl: "",
      });
    });
  });
});
