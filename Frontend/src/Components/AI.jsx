import React, { useState } from "react";

export default function AI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // Chat history
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      from: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();

      const aiMsg = {
        from: "ai",
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Error:", err);
      const errorMsg = {
        from: "ai",
        text: "❌ Error: Could not get response. Try again later.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col border-l bg-gradient-to-br from-white to-[#f9f9ff] shadow-lg rounded-lg md:max-w-lg lg:max-w-xl">
      {/* Header */}
      <div className="p-4 border-b bg-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 animate-fade-in">
          🤖 Fin AI Copilot
        </h2>
        <p className="text-xs text-gray-500">Ask anything about your issue</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] rounded-lg px-4 py-2 text-sm shadow-md transition-transform duration-300 ${
              msg.from === "user"
                ? "bg-blue-100 text-blue-900 self-end ml-auto animate-slide-in-right"
                : "bg-gray-100 text-gray-800 self-start animate-slide-in-left"
            }`}
          >
            <p>{msg.text}</p>
            <div className="text-[10px] text-gray-400 text-right mt-1">{msg.time}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-gray-50 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-transform duration-300 hover:scale-105"
        >
          {loading ? (
            <span className="animate-spin">...</span>
          ) : (
            "Ask"
          )}
        </button>
      </div>
    </div>
  );
}