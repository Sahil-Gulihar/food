import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
export const geminiAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function generateChatResponse(
  messages: { role: string; content: string }[]
) {
  // Make the system prompt much stronger and clearer
  const SYSTEM_PROMPT = `IMPORTANT INSTRUCTIONS:

You are an intelligent food waste management assistant developed exclusively by FoodShare, specifically created by Sahil Gulihar.

YOU MUST NEVER IDENTIFY YOURSELF AS BEING CREATED BY, TRAINED BY, OR ASSOCIATED WITH GOOGLE, OR ANY COMPANY OTHER THAN FOODSHARE.

If asked who made you, who created you, or similar questions, you must only respond: "I was developed by Sahil Gulihar" without mentioning any other company, especially not Google.

Never refer to yourself as an AI, language model, or any technical term. Simply describe yourself as a food waste management assistant.

Your primary objectives are to:
1. Provide accurate, research-backed information about food shelf life, storage methods, and safety guidelines
2. Help users determine if food items are still safe to consume based on appearance, smell, and storage time
3. Suggest creative recipes and uses for ingredients nearing expiration
4. Offer practical tips for meal planning, smart shopping, and proper food storage to minimize waste
5. Educate users about composting options and environmentally-responsible disposal when food cannot be saved

Always prioritize user safety over food conservation when providing advice about questionable items.`;

  try {
    const model = geminiAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.3, // Lower temperature to make it follow instructions more consistently
        maxOutputTokens: 2048,
      },
    });

    // Get the actual chat history, excluding the system prompt
    let historyMessages = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Make sure chat history starts with a user message
    if (historyMessages.length > 0 && historyMessages[0].role !== "user") {
      historyMessages = historyMessages.slice(1);
    }

    // Get the current user message
    const userMessage = messages[messages.length - 1].content;

    // For the first message in the conversation, prepend a forceful instruction
    // For subsequent messages, check if we need to reinforce the instruction
    const isFirstMessage = historyMessages.length === 0;
    const isIdentityQuestion =
      userMessage.toLowerCase().includes("who") ||
      userMessage.toLowerCase().includes("made you") ||
      userMessage.toLowerCase().includes("created you") ||
      userMessage.toLowerCase().includes("developed") ||
      userMessage.toLowerCase().includes("are you");

    let finalUserMessage = userMessage;

    if (isFirstMessage) {
      // First message gets the full system prompt
      finalUserMessage = `${SYSTEM_PROMPT}\n\n${userMessage}`;
    } else if (isIdentityQuestion) {
      // Identity questions get a reminder
      finalUserMessage = `Remember: You were developed by Sahil Gulihar and no other company. Never mention Google or any other company.\n\n${userMessage}`;
    }

    const chat = model.startChat({
      history: historyMessages,
    });

    const result = await chat.sendMessage(finalUserMessage);
    const response = await result.response;
    let text = response.text();

    // Post-processing to catch any mentions of Google
    if (
      text.toLowerCase().includes("google") ||
      text.toLowerCase().includes("language model") ||
      text.toLowerCase().includes("trained by")
    ) {
      text =
        "I was developed by Sahil Gulihar to help with food waste management and safety.";
    }

    return { text };
  } catch (error) {
    console.error("Error generating chat response:", error);
    return {
      text: "Sorry, I couldn't process your request. Please try again.",
    };
  }
}
