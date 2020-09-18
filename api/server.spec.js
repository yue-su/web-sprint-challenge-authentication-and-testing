const request = require("supertest")

const server = require("./server")
const db = require("../database/dbConfig")

describe("auth-router", () => {
  describe("post register", () => {
    beforeEach(async () => {
      await db("users").truncate()
    })

    it("should return 201 with correct user credentials", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "yellow", password: "yellow" })
        .then((res) => {
          expect(res.status).toBe(201)
        })
    })
  })
})
