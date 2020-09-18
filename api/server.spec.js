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

  it("should added user to the db", () => {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "blue", password: "blue" })
      .then((res) => {
        expect(res.body.data.username).toBe("blue")
      })
  })

  describe("login", () => {
    it("user should be able to login", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "yellow", password: "yellow" })
        .then((res) => {
          expect(res.status).toBe(200)
        })
    })
    it("user should be able to login", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "yellow", password: "yellow" })
        .then((res) => {
          expect(res.body.message).toBe("welcome back")
        })
    })
  })
    

})
