import React, { useEffect, useState } from "react";
import { navigate } from "vike/client/router";
import { redirect } from "vike/abort";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

export function ChatListItem({ chat, isSelected }) {
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
            <h3>{chat.uuid}</h3>
          </div>
        </div>
      </a>
    </li>
  );
}

function ThemeSelector() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.localSettings?.theme);

  useEffect(() => {
    const currentDocumentTheme =
      document.documentElement.getAttribute("data-theme");

    if (currentDocumentTheme !== theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <select
      onChange={(e) => {
        console.log("THEME", e.target.value);
        dispatch({
          type: "changeTheme",
          payload: e.target.value,
        });
        Cookies.set("localSettings_Theme", e.target.value);
      }}
      value={theme}
      className="select w-full"
    >
      <option>dark</option>
      <option>light</option>
      <option>cupcake</option>
      <option>retro</option>
    </select>
  );
}

function ChatListNav({ chat, viewActive, chatSelected, setViewActive }) {
  const redirectRoute =
    viewActive == "profile"
      ? chatSelected
        ? `/chat/${chat?.uuid}`
        : `/chat/`
      : `/chat/profile` + (chatSelected ? `?chatId=${chat?.uuid}` : "");
  return (
    <div className="w-full bg-error flex flex-row justify-start items-center content-center p-1 rounded-xl relative">
      <a href={redirectRoute} className="avatar border-2 rounded-xl">
        <div className="w-12 rounded-xl">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </a>
      <div className="flex flex-row justify-end items-center content-center h-full w-full gap-2">
        <button className="btn btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button className="btn btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function ListViewChats({ chat, chats, chatSelected }) {
  return (
    <>
      <div className="w-full flex flex-row justify-center items-center content-center my-2">
        <div className="flex h-full content-center items-center justify-center px-1">
          <kbd className="kbd kbd-sm">/</kbd>
        </div>
        <input
          type="text"
          placeholder="search"
          className="input input-ghost input-sm w-full mx-2"
        />
      </div>
      <ul>
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
        <li className="" key={2}></li>
        <li className="relative w-full" key={3}>
          <ThemeSelector />
        </li>
      </ul>
    </>
  );
}

function ListViewProfile({}) {
  return (
    <div id="listViewProfile" className="flex flex-col w-full gap-2 pt-2">
      <input
        type="text"
        placeholder="First name"
        className="input input-bordered input-accent w-full"
      />
      <input
        type="text"
        placeholder="Second name"
        className="input input-bordered input-accent w-full"
      />
    </div>
  );
}

export function ChatList({
  chat,
  chats,
  chatSelected,
  initalViewActive = "chats",
}) {
  const [viewActive, setViewActive] = useState(initalViewActive);
  return (
    <div
      className={`menu bg-base-200 w-full h-full max-w-md min-w-md rounded-box relative ${
        chatSelected ? "hidden xl:block" : ""
      }`}
    >
      <ChatListNav
        chat={chat}
        viewActive={viewActive}
        chatSelected={chatSelected}
        setViewActive={setViewActive}
      />
      {viewActive == "chats" && (
        <ListViewChats chats={chats} chat={chat} chatSelected={chatSelected} />
      )}
      {viewActive == "profile" && <ListViewProfile />}
    </div>
  );
}
