"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";


import { ChatContainer } from "@/components/ui/ChatContainer";
import { Message, ChatState } from "@/types";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function ChatbotPage() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    loading: false,
  });

  const sendMessage = async (content: string) => {
    // Create a new user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    // Update state with the user message
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      loading: true,
    }));

    try {
      // Create messages array for API
      const messagesForApi = [
        ...chatState.messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          content: msg.content,
        })),
        { role: "user", content },
      ];

      // Send to API
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesForApi }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      // Create assistant message from response
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      // Update state with assistant message
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        loading: false,
      }));
    } catch (error) {
      console.error("Error sending message:", error);

      // Create error message
      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      // Update state with error message
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        loading: false,
      }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Food Safety Chatbot" />
        <div className="flex-1 overflow-hidden">
          <ChatContainer
            messages={chatState.messages}
            loading={chatState.loading}
            onSendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
