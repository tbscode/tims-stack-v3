import React from "react";

export function ChatListItem({ chat, isSelected }) {
  return (
    <li
      key={chat?.uuid}
      className={`bg-base-300 border rounded-xl mb-2 ${
        isSelected ? "bg-primary text-base-200" : ""
      }`}
    >
      <a href={`/chat/${chat.uuid}`}>
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
            <h3>{chat.uuid}</h3>
          </div>
        </div>
      </a>
    </li>
  );
}

export function ChatList({ chat, chats, chatSelected }) {
  return (
    <ul
      className={`menu bg-base-200 w-full sm:max-w-md min-w-md rounded-box ${
        chatSelected ? "hidden lg:block" : ""
      }`}
    >
      {chats?.results?.map((_chat, i) => {
        return (
          <ChatListItem
            key={_chat.uuid}
            chat={_chat}
            isSelected={chat?.uuid == _chat.uuid}
          />
        );
      })}
      <li className="" key={0}></li>
      <li className="bg-base-200" key={1}>
        {chats.count} chats, on {chats.last_page} pages
      </li>
    </ul>
  );
}
