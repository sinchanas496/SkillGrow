// server/utils/suggestions.js
import axios from "axios";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export const getSuggestions = async (userInput) => {
  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: "mixtral-8x7b-32768", // you can also use "llama2-70b-4096"
        messages: [
          {
            role: "system",
            content: "You are a study assistant that gives clear, practical, and motivational study tips.",
          },
          {
            role: "user",
            content: `Suggest some study tips for: ${userInput}`,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("❌ Groq error:", error.response?.data || error.message);
    return "Failed to fetch suggestions. Try again later.";
  }
};
