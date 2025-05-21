import React, { useState, useEffect } from "react";

export default function ChatWindow({ chat }) {
  const [messages, setMessages] = useState([]); // Local state for messages
  const [input, setInput] = useState(""); // State to manage input value

  // Predefined AI responses for each chat
  const aiResponses = {
    1: [
      "Thank you for reaching out, Luis! How can I assist you further?",
      "Let me check that for you, Luis. Please hold on for a moment.",
      "I appreciate your patience, Luis. Let me assist you with that.",
    ],
    2: [
      "Hi Ivan! Could you provide your order ID so I can assist you?",
      "I’m here to help, Ivan! Let me check your order details.",
      "Thank you for contacting us, Ivan. I’ll look into this for you.",
    ],
    3: [
      "Hi Sophia! I’ll help you track your package right away.",
      "Could you share your tracking ID, Sophia? I’ll assist you further.",
      "Thank you for reaching out, Sophia. Let me check your package status.",
    ],
    4: [
      "Hi Michael! I’ll connect you with our technical team shortly.",
      "Thank you for reporting this, Michael. Let me assist you.",
      "I’m looking into your car’s software update issue, Michael.",
    ],
    5: [
      "Hi Emma! Have you tried using a different charging cable?",
      "Let me assist you with your iPhone charging issue, Emma.",
      "Thank you for reaching out, Emma. I’ll help you resolve this.",
    ],
    6: [
      "Hi Olivia! Let me check your Office 365 subscription details.",
      "Could you provide more details about your subscription, Olivia?",
      "Thank you for contacting us, Olivia. I’ll assist you with this.",
    ],
    7: [
      "Hi Liam! Let me check your account status right away.",
      "Thank you for reaching out, Liam. I’ll assist you with the error.",
      "I’m looking into your Netflix account issue, Liam. Please hold on.",
    ],
  };

  // Sync messages with the selected chat when the chat changes
  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add the user's message
    const newMessage = {
      id: messages.length + 1,
      from: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate an AI reply after a delay
    setTimeout(() => {
      const randomReply =
        aiResponses[chat.id][Math.floor(Math.random() * aiResponses[chat.id].length)]; // Randomly select a reply for the specific chat

      const aiReply = {
        id: messages.length + 2,
        from: "admin",
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prevMessages) => [...prevMessages, aiReply]);
    }, 1000); // 1-second delay for the AI reply
  };

  if (!chat) {
    return (
      <div className="flex-grow flex items-center justify-center text-gray-500">
        Select a chat to start
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow bg-white border-r shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-100">
        <h2 className="font-semibold text-gray-800 text-base md:text-lg">{chat.name}</h2>
        <button className="text-sm text-gray-600 hover:text-red-500 transition duration-200">
          ✖ Close
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[80%] md:max-w-md px-4 py-3 rounded-lg text-sm shadow ${
              msg.from === "admin"
                ? "bg-blue-500 text-white self-end text-right"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            <p>{msg.text}</p>
            <div className="text-xs text-gray-300 mt-1">{msg.time}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t px-4 py-3 flex items-center gap-2 bg-gray-100">
        <button className="text-xl text-gray-600 hover:text-yellow-500 transition duration-200">
          😊
        </button>
        <button className="text-xl text-gray-600 hover:text-green-500 transition duration-200">
          📎
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}