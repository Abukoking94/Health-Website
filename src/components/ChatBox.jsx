import { useState, useEffect, useRef } from "react";
import useStore from "../store/useStore";
import { getConversationId } from "../utils/chat";
import { SendHorizontal } from "lucide-react";

export default function ChatBox({ otherUser }) {
  const user = useStore((state) => state.user);
  const addMessage = useStore((state) => state.addMessage);
  const conversations = useStore((state) => state.conversations);

  if (!user || !otherUser?.username) return null;

  const conversationId = getConversationId(user.username, otherUser.username);
  const messages = conversations[conversationId] || [];

  const [text, setText] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;

    addMessage(conversationId, {
      id: Date.now(),
      sender: user.username,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-96 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex-1 overflow-y-auto mb-3 space-y-3 px-1">
        {messages.map((m) => {
          const isSelf = m.sender === user.username;
          return (
            <div
              key={m.id}
              className={`flex items-end gap-2 ${
                isSelf ? "justify-end" : "justify-start"
              }`}
            >
              {!isSelf && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
                  {m.sender.charAt(0).toUpperCase()}
                </div>
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-xl text-sm shadow-md ${
                  isSelf
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                }`}
              >
                <p>{m.text}</p>
                <span className="block text-[10px] opacity-70 mt-1 text-right">
                  {m.time}
                </span>
              </div>
              {isSelf && (
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold">
                  {m.sender.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="flex items-center gap-2 border-t pt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full"
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
