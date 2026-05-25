import { useEffect, useState } from "react"
import axios from "axios"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

const API = "https://dashboard.render.com/web/srv-d8a32vog4nts73d4cegg"
function App() {
  const [snippets, setSnippets] = useState([])
  const [form, setForm] = useState({
    title: "",
    language: "javascript",
    code: "",
    tags: "",
  })

  const fetchSnippets = async () => {
    const res = await axios.get(API)
    setSnippets(res.data)
  }

  useEffect(() => {
    fetchSnippets()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post(API, form)

    setForm({
      title: "",
      language: "javascript",
      code: "",
      tags: "",
    })

    fetchSnippets()
  }

  const deleteSnippet = async (id) => {
    await axios.delete(`${API}/${id}`)
    fetchSnippets()
  }

  return (
   <div className="min-h-screen p-6 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">
        DevSnippet
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-slate-800 p-6 rounded-xl mb-10"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full p-3 rounded bg-slate-700 mb-4"
          required
        />
        <input
          type="text"
          placeholder="Language"
          value={form.language}
          onChange={(e) =>
            setForm({ ...form, language: e.target.value })
          }
          className="w-full p-3 rounded bg-slate-700 mb-4"
        />

        <input
          type="text"
          placeholder="Tags"
          value={form.tags}
          onChange={(e) =>
            setForm({ ...form, tags: e.target.value })
          }
          className="w-full p-3 rounded bg-slate-700 mb-4"
        />
        <textarea
          rows="10"
          placeholder="Paste your code here..."
          value={form.code}
          onChange={(e) =>
            setForm({ ...form, code: e.target.value })
          }
          className="w-full p-3 rounded bg-slate-700 mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
        >
          Save Snippet
        </button>
      </form>
      <div className="grid gap-6 max-w-5xl mx-auto">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-slate-800 p-5 rounded-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  {snippet.title}
                </h2>

                <p className="text-gray-400">
                  {snippet.language} • {snippet.tags}
                </p>
              </div>
               <button
                onClick={() => deleteSnippet(snippet.id)}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>

            <SyntaxHighlighter
              language={snippet.language}
              style={vscDarkPlus}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
  </div>
  )
}

export default App
