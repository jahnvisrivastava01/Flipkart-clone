import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server.js";

describe("Product API", () => {
  it("should return the product list", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
  });

  it("should reject an unauthenticated product creation request", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({
        title: "A",
        description: "Short",
        category: "",
        price: -100,
        mrp: 0,
      });

    expect(response.status).toBe(401);
  });
});