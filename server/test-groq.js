import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

async function testGroq() {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Give me a quick study tip." }]
      })
    });

    const data = await response.json();
    console.log("✅ AI Suggestion:", data.choices?.[0]?.message?.content || data);
  } catch (err) {
    console.error("❌ Groq error:", err.message);
  }
}

testGroq();
