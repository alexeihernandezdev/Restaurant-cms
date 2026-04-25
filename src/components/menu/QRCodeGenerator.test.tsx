import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { QRCodeGenerator } from "./QRCodeGenerator";

describe("QRCodeGenerator", () => {
  it("renders QR button", () => {
    render(<QRCodeGenerator tenantSlug="test-restaurant" />);
    expect(screen.getByText("Ver QR")).toBeInTheDocument();
  });
});
