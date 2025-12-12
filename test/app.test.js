const request = require("supertest");
const app = require("../app");

describe("API /api/productos", () => {
  test("Devuelve lista de productos (array) y longitud 5", async () => {
    const res = await request(app).get("/api/productos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(5);
  });
});
