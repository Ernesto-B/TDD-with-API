// Recommended to use mocks in testing API's when possible
// since it avoids calls to the actual API which could be slow,
// require authentication, or internet.

const nock = require("nock")
const request = require("supertest")
const app = require("../index")    // the Express app

// Have different describe blocks for testing different endpoints, since the beforeEach block will always test the same one.
describe("/posts API Tests with Mock", () => {
    // Runs before each test, usually used for mocking API requests or initializing db connection.
    // Also provides isolation for each test.
    beforeEach(() => {
        // Mock the API request
        nock("https://jsonplaceholder.typicode.com")
            .get("/posts")
            .reply(200, [
                { id: 1, title: "Test Post", body: "This is a mock post", userId: 1 },
            ])
    })

    // runs after each test
    afterEach(() => {
        nock.cleanAll() // Clean all mocks after each test
    })

    it("should return a list of mocked posts", async () => {
        const response = await request(app).get("/posts")
        expect(response.statusCode).toBe(200)
        expect(response.body.posts[0].title).toBe("Test Post")
    })
})

// Tests for /users endpoint (WONT WORK BC THE ROUTE IN index.js IS MISSING)
describe("Users API Tests with Mocks", () => {
    beforeEach(() => {
        // Mock the /users API request
        nock("https://jsonplaceholder.typicode.com")
            .get("/users")
            .reply(200, [
                { id: 1, name: "John Doe", email: "johndoe@example.com" },
            ])
    })

    afterEach(() => {
        nock.cleanAll() // Clean all mocks after each test
    })

    it("should return a list of mocked users", async () => {
        const response = await request(app).get("/users")
        expect(response.statusCode).toBe(200)
        expect(response.body.users[0].name).toBe("John Doe")
    })
})