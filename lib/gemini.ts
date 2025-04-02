import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
export const geminiAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function generateChatResponse(
  messages: { role: string; content: string }[]
) {
    const SYSTEM_PROMPT =
      "You are a food safety assistant for FoodShare. Provide accurate, concise information about food handling, storage, and safety guidelines. Be helpful and prioritize user safety.";

  try {
    const model = geminiAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: SYSTEM_PROMPT }],
      })),
    });

    const result = await chat.sendMessage(
      messages[messages.length - 1].content
    );
    const response = await result.response;
    const text = response.text();

    return { text };
  } catch (error) {
    console.error("Error generating chat response:", error);
    return {
      text: "Sorry, I couldn't process your request. Please try again.",
    };
  }
}
