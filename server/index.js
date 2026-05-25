const express = require("express")
const { PrismaClient } = require("@prisma/client")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(cors(
    {
        origin: "https://dev-snippets-eta.vercel.app"
    }
))
app.use(express.json())

app.get("/api/snippets", async (req, res) => {
  try {
    const snippets = await prisma.snippet.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    res.json(snippets)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch snippets" })
  }
})

app.post("/api/snippets", async (req, res) => {
  try {
    const { title, language, code, tags } = req.body

    const snippet = await prisma.snippet.create({
      data: {
        title,
        language,
        code,
        tags,
      },
    })

    res.json(snippet)
  } catch (err) {
    res.status(500).json({ error: "Failed to create snippet" })
  }
})

app.delete("/api/snippets/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    await prisma.snippet.delete({
      where: { id },
    })

    res.json({ message: "Deleted" })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete snippet" })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})