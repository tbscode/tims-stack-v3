import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChatView } from "../../../atoms/chat/chat-view";
import { ChatList } from "../../../atoms/chat/chat-list";
import { ChatBox } from "../../../atoms/chat/base";
import { ChatSplit } from "../../../atoms/chat-split";
import Cookies from "js-cookie";

export default Page;

function Page(pageProps) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  console.log(
    "SELECTED CHAT & CHATS & MESSAGES & USER",
    chat,
    chats,
    messages,
    user
  );

  return (
    <ChatBox>
      <ChatList chat={chat} chats={chats} chatSelected={true}></ChatList>
      <ChatView
        chat={chat}
        messages={messages}
        user={user}
        chatSelected={true}
      ></ChatView>
    </ChatBox>
  );
}
