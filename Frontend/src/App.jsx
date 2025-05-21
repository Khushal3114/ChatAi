import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Chatlist from "./Components/Chatlist";
import ChatWindow from "./Components/ChatWindow";
import React from "react";
import AI from "./Components/AI";

// Mock chat data
const mockChats = [
  {
    id: 1,
    name: "Luis - Github",
    avatar: '../public/avtar-1.jpeg',
    messages: [
      {
        id: 1,
        from: "user",
        text: "I bought a product from your store in November...",
        time: "1min ago",
      },
      {
        id: 2,
        from: "admin",
        text: "Let me just look into this for you, Luis.",
        time: "Seen · 1min",
      },
    ],
  },
  {
    id: 2,
    name: "Ivan - Nike",
    avatar: "../public/avtar-2.jpeg",
    messages: [
      {
        id: 1,
        from: "user",
        text: "Hi, I need help with my order.",
        time: "3min ago",
      },
      {
        id: 2,
        from: "admin",
        text: "Sure, can you please provide your order ID?",
        time: "Seen · 1min",
      },
    ],
  },
  {
    id: 3,
    name: "Sophia - Amazon",
    avatar: "../public/avtar-3.jpeg",
    messages: [
      {
        id: 1,
        from: "user",
        text: "Can you help me track my package?",
        time: "5min ago",
      },
      {
        id: 2,
        from: "admin",
        text: "Sure, can you share your tracking ID?",
        time: "Seen · 4min",
      },
    ],
  },
  {
    id: 4,
    name: "Michael - Tesla",
    avatar: "../public/tesla.jpeg",
    messages: [
      {
        id: 1,
        from: "user",
        text: "I have an issue with my car's software update.",
        time: "10min ago",
      },
      {
        id: 2,
        from: "admin",
        text: "Let me connect you with our technical team.",
        time: "Seen · 9min",
      },
    ],
  },
  {
    id: 5,
    name: "Emma - Apple",
    avatar: "../public/Apple.jpeg",
    messages: [
      {
        id: 1,
        from: "user",
        text: "My iPhone is not charging properly.",
        time: "15min ago",
      },
      {
        id: 2,
        from: "admin",
        text: "Have you tried using a different cable?",
        time: "Seen · 14min",
      },
    ],
  },
  {
    id: 6,
    name: "Olivia - Microsoft",
    avatar: "../public/Micro.jpeg",
    messages: [
      {
        id: 1,
        from: "user",
        text: "I need help with my Office 365 subscription.",
        time: "20min ago",
      },
      {
        id: 2,
        from: "admin",
        text: "Sure, let me check your account details.",
        time: "Seen · 19min",
      },
    ],
  },
  {
    id: 7,
    name: "Liam - Netflix",
    avatar: "https://cdn.logojoy.com/wp-content/uploads/20231031154602/2016-netflix-logo.png",
    messages: [
      {
        id: 1,
        from: "user",
        text: "Why is my account showing an error?",
        time: "25min ago",
      },
      {
        id: 2,
        from: "admin",
        text: "Let me check your account status.",
        time: "Seen · 24min",
      },
    ],
  },
];

export default function App() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="pl-64">
        <Chatlist
          chats={mockChats}
          selectedId={selectedChat.id}
          onSelectChat={(chat) => setSelectedChat(chat)}
        />
      </div>
      <ChatWindow chat={selectedChat} />
      <AI />
    </div>
  );
}