import React, { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Message } from "@/types";

interface ChatContainerProps {
  messages: Message[];
  loading: boolean;
  onSendMessage: (content: string) => void;
}

export function ChatContainer({
  messages,
  loading,
  onSendMessage,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="text-center p-8 rounded-xl bg-white shadow-sm border mb-8 border-gray-100">
              <p className="text-gray-600 font-medium mb-4">
                Ask me anything about food safety or volunteer opportunities!
              </p>
            </div>
            <div>
            <div className="space-y-2  ">
              <button
                onClick={() =>
                  onSendMessage("What are the basic food safety guidelines?")
                }
                className="block w-full p-2 text-left text-sm bg-blue-200 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
              >
                🔍 What are the basic food safety guidelines?
              </button>
              <button
                onClick={() =>
                  onSendMessage("How can I volunteer at a food bank?")
                }
                className="block w-full p-2 text-left text-sm bg-yellow-200 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
              >
                🤝 How can I volunteer at a food bank?
              </button>
              <button
                onClick={() =>
                  onSendMessage("What are safe food storage temperatures?")
                }
                className="block w-full p-2 text-left text-sm bg-green-200 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
              >
                🌡️ What are safe food storage temperatures?
              </button>
            </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-100 bg-white p-4">
        <ChatInput onSendMessage={onSendMessage} disabled={loading} />
      </div>
    </div>
  );
}
