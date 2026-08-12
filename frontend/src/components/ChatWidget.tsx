"use client";

import { useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Namaste! Looking for something specific — a festival, an occasion, a budget?",
    },
  ]);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Calls the FastAPI /api/chatbot endpoint. Falls back to a static
    // reply if the backend isn't running yet, so the widget still works
    // during frontend-only development.
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I'm still being connected to the catalog — try again shortly." },
      ]);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col overflow-hidden rounded-card border border-sage/15 bg-white shadow-lg">
          <div className="flex items-center justify-between bg-sage-dark px-4 py-3">
            <p className="text-sm font-medium text-sandstone-light">CraftMela assistant</p>
            <button aria-label="Close chat" onClick={() => setOpen(false)} className="text-sandstone-light">
              <FiX className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-terracotta text-sandstone-light"
                    : "bg-sandstone text-charcoal"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 border-t border-sage/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a product..."
              className="flex-1 rounded-full border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-dark text-sandstone-light"
            >
              <FiSend className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-sandstone-light shadow-lg hover:bg-terracotta-light"
      >
        {open ? <FiX className="h-6 w-6" /> : <FiMessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
