import { useState } from "react";
import axios from "axios";

export default function SuggestionPage() {
  const [prompt, setPrompt] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setSuggestion("");

    try {
      const res = await axios.post("http://localhost:5000/api/suggestions", {
        prompt,
      });
      setSuggestion(res.data.suggestion);
    } catch (error) {
      console.error(error);
      setSuggestion("❌ Failed to fetch suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">💡 AI Suggestions</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Ask something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Thinking..." : "Get Suggestion"}
        </button>
      </form>

      {suggestion && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <strong>Response:</strong>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
}
