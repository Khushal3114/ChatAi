import React from "react";

export default function Chatlist({ chats, selectedId, onSelectChat }) {
  return (
    <div className="w-72 border-r flex flex-col bg-white shadow-md md:w-64 lg:w-80">
      {/* Header */}
      <div className="p-4 border-b bg-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Your Inbox</h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center px-4 py-2 border-b text-sm text-gray-600 bg-gray-50">
        <div className="font-medium">{chats.length} Open</div>
        <div className="text-blue-600 cursor-pointer hover:underline">
          Waiting longest ▼
        </div>
      </div>

      {/* Chat Items */}
      <div className="overflow-y-auto flex-1 bg-white">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`px-4 py-3 border-b cursor-pointer flex items-center transition duration-200 ${
              selectedId === chat.id
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "hover:bg-gray-100"
            }`}
          >
            {/* Avatar */}
            <img
              src={chat.avatar}
              alt={`${chat.name}'s avatar`}
              className="w-10 h-10 rounded-full mr-3 shadow-sm"
            />

            {/* Chat Details */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{chat.name}</span>
                <span className="text-xs text-gray-500">1m</span>
              </div>
              <div className="text-sm text-gray-500 truncate">
                {chat.messages[0]?.text.slice(0, 30)}...
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}