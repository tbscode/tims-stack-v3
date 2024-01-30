import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChatItem,
  ChatMessage,
  MessageSkelleton,
  ChatItemSkelleton,
  ChatList,
  ChatBox,
  ChatView,
} from "../../../atoms/chat";
import { ChatSplit } from "../../../atoms/chat-split";
import Cookies from "js-cookie";

export default Page;

function Page(pageProps) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  console.log("CHATS & MESSAGES", chat);

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
