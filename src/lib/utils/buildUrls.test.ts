import { describe, it, expect } from "vitest";
import buildUrl from "./buildUrl";

describe("buildUrl", () => {
  it("should build a URL with no query parameters", () => {
    const result = buildUrl("/api/products", {});
    expect(result).toBe(import.meta.env.VITE_API_URL + "/api/products");
  });

  it("should build a URL with a single query parameter", () => {
    const result = buildUrl("/api/products", { page: 1 });
    expect(result).toBe(import.meta.env.VITE_API_URL + "/api/products?page=1");
  });

  it("should build a URL with multiple query parameters", () => {
    const result = buildUrl("/api/products", { page: 1, limit: 10 });
    expect(result).toBe(
      import.meta.env.VITE_API_URL + "/api/products?page=1&limit=10"
    );
  });

  it("should handle string and number parameter values", () => {
    const result = buildUrl("/api/search", { q: "test", page: 2 });
    expect(result).toBe(
      import.meta.env.VITE_API_URL + "/api/search?q=test&page=2"
    );
  });

  it("should encode special characters in parameter values", () => {
    const result = buildUrl("/api/search", { q: "test & demo" });
    expect(result).toBe(
      import.meta.env.VITE_API_URL + "/api/search?q=test+%26+demo"
    );
  });

  it("should handle empty string as a parameter value", () => {
    const result = buildUrl("/api/filter", { category: "" });
    expect(result).toBe(import.meta.env.VITE_API_URL + "/api/filter?category=");
  });

  it("should handle zero as a parameter value", () => {
    const result = buildUrl("/api/products", { minPrice: 0 });
    expect(result).toBe(
      import.meta.env.VITE_API_URL + "/api/products?minPrice=0"
    );
  });

  it("should handle a base path with existing query parameters", () => {
    const result = buildUrl("/api/products?featured=true", { sort: "price" });
    expect(result).toBe(
      import.meta.env.VITE_API_URL + "/api/products?featured=true&sort=price"
    );
  });

  it("should handle a base path with a trailing slash", () => {
    const result = buildUrl("/api/categories/", { id: 5 });
    expect(result).toBe(import.meta.env.VITE_API_URL + "/api/categories/?id=5");
  });
});
