const request = require("supertest");
const app = require("../app");

describe("testing that api is working at all", () => {
  test('check that "/" sends back that the api is working', async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("api working");
  });
  test('check that "/" sends back a status of 200 if the server is up', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

describe('testing the authorication post endpoint "/auth/login" works in the way we expect', () => {
  test("if request body has wrong parameter send an error 404", async () => {
    const name = "harrison";
    const response = await request(app)
      .post("/send-data")
      .send({ name: name, password: "fghjsgfsjd", role: "admin" });
    expect(response.status).toBe(404);
  });
});
