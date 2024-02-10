export { ChatList };

import { withFallback } from "vike-react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { navigate } from "vike/client/router";
import { useState } from "react";

function ChatListItem({ chat, isSelected }) {
  return (
    <li
      key={chat?.uuid}
      className={`bg-base-100 border rounded-xl mb-2 active:-translate-y-1 ${
        isSelected ? "text-base-content shadow-inner border-2" : "shadow-md"
      }`}
    >
      <a href={`/chat/${isSelected ? "" : chat.uuid}`}>
        <div className="flex flex-row justify-center content-center items-center">
          <div className="avatar">
            <div className="w-10 rounded-xl">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="flex flex-col px-4">
            <h1 className="text-xl">
              {chat.partner.first_name} {chat.partner.second_name}
            </h1>
            <h3>{chat.description}</h3>
          </div>
        </div>
      </a>
    </li>
  );
}

const ChatListItems = withFallback(() => {
  const result = useSuspenseQuery({
    queryKey: ["chats"],
    queryFn: getChatsList,
  });

  return <>{JSON.stringify(result?.data)}</>;
}, "Loading messages...");

function ChatList({ chatSelected }) {
  const [viewActive, setViewActive] = useState("chats");
  return (
    <div
      className={`menu bg-base-200 w-full h-full max-w-md min-w-md rounded-box relative ${
        chatSelected ? "hidden xl:block" : ""
      }`}
    >
      Test
      <ChatListItems />
    </div>
  );
}

async function getChatsList() {
  // Simulate slow network
  const response = await fetch("http://backend:8000/api/chats");
  let data = await response.json();
  return data;
}
