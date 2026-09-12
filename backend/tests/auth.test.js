import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server.js";

describe("Auth API", () => {
  it("should reject an invalid email during registration", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "invalid-email",
        password: "password123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Please enter a valid email address"
    );
  });

  it("should reject a short password during registration", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Password must be at least 6 characters"
    );
  });

  it("should reject an invalid email during login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "invalid-email",
        password: "password123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Please enter a valid email address"
    );
  });
});