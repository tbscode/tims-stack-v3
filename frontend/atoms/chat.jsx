import React from "react";

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
            isSelected={chat.uuid == _chat.uuid}
          />
        );
      })}
    </ul>
  );
}

export function ChatBox({ children }) {
  return (
    <div className="flex flex-col h-screen w-screen p-1 md:p-2 xl:p-8 2xl:p-16 gap-1">
      <div className="flex flex-row w-full h-full">{children}</div>
    </div>
  );
}

export function ChatListItem({ chat, isSelected }) {
  return (
    <li
      key={chat?.uuid}
      className={`bg-base-300 rounded-xl mb-2 ${isSelected ? "bg-error" : ""}`}
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

export function ChatView({ chat, messages, user, chatSelected }) {
  //console.log("MESSAGES", chat, messages, user);
  return (
    <div
      className={`w-full h-full bg-base-100 rounded-xl p-1 ${
        chatSelected ? "" : "hidden md:block"
      }`}
    >
      <div className="flex flex-row bg-info rounded-xl justify-left items-center p-2 md:p-3">
        <kbd
          className={`kbd h-10 w-10 xl:h-12 xl:w-12 ${
            chatSelected ? "lg:hidden" : ""
          }`}
        >
          ◀︎
        </kbd>
        <div className="flex flex-col px-4">
          <h1 className="text-xl">
            {chat.partner.first_name} {chat.partner.second_name}
          </h1>
          <h3>{chat.uuid}</h3>
        </div>
      </div>
    </div>
  );
}

export function ChatItem({ partnerImage, chatText, onSelected, uuid }) {
  return (
    <button
      key={uuid}
      className="btn"
      onClick={() => {
        onSelected();
      }}
    >
      {chatText}
    </button>
  );
}

export function ChatItemSkelleton({}) {
  return (
    <button className="btn skeleton">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full"></div>
      </div>
    </button>
  );
}

export function ChatMessage({
  senderName,
  senderImage,
  isSelf,
  message,
  timeSend,
  timeSeen,
}) {
  return (
    <div className={`chat chat-${isSelf ? "end" : "start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={senderImage} />
        </div>
      </div>
      <div className="chat-header">
        {senderName}
        <time className="text-xs opacity-50">{timeSend}</time>
      </div>
      <div className="chat-bubble">{message}</div>
      {timeSeen && <div className="chat-footer opacity-50">{timeSeen}</div>}
      {!timeSeen && <div className="chat-footer opacity-50">Sending...</div>}
    </div>
  );
}

export function MessageSkelleton({ isSelf, id }) {
  return (
    <div key={id} className={`chat chat-${isSelf ? "end" : "start"}`}>
      <div className="skeleton chat-image avatar">
        <div className="w-10 rounded-full"></div>
      </div>
      <div className="skeleton chat-header">
        <time className="text-xs opacity-50"></time>
      </div>
      <div className="skeleton chat-bubble">
        {"                                   "}
      </div>
      <div className="chat-footer opacity-50"></div>
      <div className="chat-footer opacity-50"></div>
    </div>
  );
}
