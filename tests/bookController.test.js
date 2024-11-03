const request = require("supertest")
const app = require("../index")

describe("JSONPlaceholder API Tests", () => {
    it("should return a list of posts", async () => {
        const response = await request(app).get("/posts")
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("posts")
        expect(Array.isArray(response.body.posts)).toBe(true)
    })

    it("should return a list of posts for a specific userId", async () => {
        const response = await request(app).get("/posts?userId=1")
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("posts")
        expect(response.body.posts[0].userId).toBe(1)
    })

    it("should return post details for a valid post ID", async () => {
        const response = await request(app).get("/post/1")
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("body")
        expect(response.body.userId).toBe(1)
    })

    it("should return a 404 error for an invalid post ID", async () => {
        const response = await request(app).get("/post/99999")
        expect(response.statusCode).toBe(404)
    })
})
