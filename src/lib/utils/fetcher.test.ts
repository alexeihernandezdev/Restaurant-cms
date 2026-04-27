import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetcher } from "./fetcher";

describe("fetcher", () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should set JSON content-type header", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: "test" }),
    });

    await fetcher("/api/test", { method: "GET" });

    expect(mockFetch).toHaveBeenCalledWith("/api/test", expect.objectContaining({
      headers: expect.objectContaining({ "Content-Type": "application/json" }),
    }));
  });

  it("should include custom headers", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: "test" }),
    });

    await fetcher("/api/test", {
      method: "GET",
      headers: { Authorization: "Bearer token" },
    });

    expect(mockFetch).toHaveBeenCalledWith("/api/test", expect.objectContaining({
      headers: expect.objectContaining({
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      }),
    }));
  });

  it("should stringify body for POST/PUT/PATCH", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1 }),
    });

    const body = { name: "Test Dish", price: 10 };

    await fetcher("/api/dishes", { method: "POST", body });

    expect(mockFetch).toHaveBeenCalledWith("/api/dishes", expect.objectContaining({
      body: JSON.stringify(body),
    }));
  });

  it("should not include body for GET requests", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    await fetcher("/api/dishes", { method: "GET" });

    expect(mockFetch).toHaveBeenCalledWith("/api/dishes", expect.objectContaining({
      body: undefined,
    }));
  });

  it("should return parsed JSON on success", async () => {
    const expectedData = { id: 1, name: "Pizza" };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expectedData),
    });

    const result = await fetcher<typeof expectedData>("/api/dishes/1", { method: "GET" });

    expect(result).toEqual(expectedData);
  });

  it("should throw error with message from response on non-ok", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: "Validation failed" }),
    });

    await expect(fetcher("/api/dishes", { method: "POST" })).rejects.toThrow("Validation failed");
  });

  it("should throw generic error when response has no error field", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });

    await expect(fetcher("/api/test", { method: "GET" })).rejects.toThrow("Failed to get /api/test");
  });

  it("should throw generic error when response JSON parsing fails", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.reject(new Error("parse error")),
    });

    await expect(fetcher("/api/test", { method: "GET" })).rejects.toThrow("Failed to get /api/test");
  });
});
