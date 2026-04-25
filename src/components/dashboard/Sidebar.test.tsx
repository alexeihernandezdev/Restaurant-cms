import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardSidebar } from "./Sidebar";

describe("DashboardSidebar", () => {
  const mockUser = {
    name: "Test User",
    email: "test@example.com",
  };

  it("renders user information", () => {
    render(<DashboardSidebar user={mockUser} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    render(<DashboardSidebar user={mockUser} />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Platos")).toBeInTheDocument();
    expect(screen.getByText("Categorías")).toBeInTheDocument();
    expect(screen.getByText("Estilos del Menú")).toBeInTheDocument();
    expect(screen.getByText("Configuración")).toBeInTheDocument();
  });

  it("renders logout button", () => {
    render(<DashboardSidebar user={mockUser} />);
    expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
  });

  it("renders restaurant CMS brand", () => {
    render(<DashboardSidebar user={mockUser} />);
    expect(screen.getByText("RestaurantCMS")).toBeInTheDocument();
  });
});
