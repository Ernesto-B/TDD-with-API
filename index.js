const express = require("express")
const axios = require("axios") // Using axios for HTTP requests
const app = express()

app.use(express.json())

const JSON_PLACEHOLDER_API = "https://jsonplaceholder.typicode.com"

app.get("/posts", async (req, res) => {
    const { userId } = req.query
    const url = userId
        ? `${JSON_PLACEHOLDER_API}/posts?userId=${userId}`
        : `${JSON_PLACEHOLDER_API}/posts`

    try {
        const response = await axios.get(url)
        const posts = response.data.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
            userId: post.userId,
        }))

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).send("Failed to fetch posts")
    }
})


app.get("/post/:id", async (req, res) => {
    const { id } = req.params

    try {
        const response = await axios.get(`${JSON_PLACEHOLDER_API}/posts/${id}`)
        if (!response.data) {
            return res.status(404).send("Post not found")
        }

        const post = {
            id: response.data.id,
            title: response.data.title,
            body: response.data.body,
            userId: response.data.userId,
        }

        res.status(200).json(post)
    } catch (error) {
        res.status(404).send("Post not found")
    }
})

// Only start the server if not in test mode
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

module.exports = app // Export app for testing
