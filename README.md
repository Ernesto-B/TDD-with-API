# JSONPlaceholder API Testing with Express and Jest

This project is a demonstration of how to create a simple Express API that interacts with the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API and test it using `Jest` and `supertest`. It also demonstrates using `nock` to mock API requests in tests, allowing for efficient and isolated testing without relying on external API calls.

## Table of Contents
- [JSONPlaceholder API Testing with Express and Jest](#jsonplaceholder-api-testing-with-express-and-jest)
  - [Table of Contents](#table-of-contents)
  - [Project Files](#project-files)
  - [Endpoints](#endpoints)
  - [Usage](#usage)
  - [Testing Strategies](#testing-strategies)
    - [Integration Tests (bookControllerTest.test.js)](#integration-tests-bookcontrollertesttestjs)
    - [Mocked Tests (mockTest.test.js)](#mocked-tests-mocktesttestjs)
  - [Manual API Testing](#manual-api-testing)
  - [Notes](#notes)

---

## Project Files

- **index.js**: Main Express server code that provides routes for fetching posts from JSONPlaceholder.
- **bookControllerTest.test.js**: Contains integration tests for the `/posts` and `/post/:id` endpoints using real API requests.
- **mockTest.test.js**: Contains tests that use `nock` to mock API requests for the `/posts` and `/users` endpoints.
- **jest.config.js**: Configuration file for Jest to specify the test environment.

## Endpoints

1. **GET /posts**
   - Returns a list of posts.
   - Supports filtering by `userId` using a query parameter.

2. **GET /post/:id**
   - Returns details of a specific post by ID.
   - Returns a 404 status if the post is not found.

## Usage

1. **Install Dependencies**
   ```bash
   npm install
    ```
2. **Start the Server**
   ```bash
    node index.js
   ```
   - This server will run on port `3000` by default.
3. **Run the Tests** (Doesn't actually need the server to be running)
   ```bash
    npm test
   ```
    - This will run the test suites using Jest.
    - The `Users API Tests with Mocks` will fail, since the /users endpoint in `index.js` does not exist. I kept it in the project for the purposes of keeping notes and showing examples.

## Testing Strategies
### Integration Tests (bookControllerTest.test.js)
- Tests the `/posts` and `/post/:id` endpoints using `supertest` and real API calls.
- Verifies the correct status codes and response structures.

### Mocked Tests (mockTest.test.js)
- Uses `nock` to mock API requests, ensuring tests are isolated and independent of the real API.
- Includes a separate `describe` block for each set of endpoint tests:
    - **/posts API Tests with Mock:** Mocks requests to `/posts`.
    - **Users API Tests with Mocks:** Mocks requests to /users (note: this endpoint does not exist in index.js).

## Manual API Testing
- If you have `Thunder Client` extension installed, you can open the `requests.rest` file and click the `Send Request` button to test the API endpoints.
- Alternatively, use other API testing services like **Postman** or **Curl**.

## Notes
- **Using Mocks:** nock is used to mock external API calls, making tests faster and more reliable.
- **Isolating Tests:** Different describe blocks are used to ensure isolation, especially when testing multiple endpoints.