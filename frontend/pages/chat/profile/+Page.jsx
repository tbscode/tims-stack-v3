import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChatList } from "../../../atoms/chat/chat-list";
import { ChatView } from "../../../atoms/chat/chat-view";
import { ChatBox } from "../../../atoms/chat/base";
import Cookies from "js-cookie";

export default Page;

function Page(pageProps) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  console.log("PAGE PROPS", pageProps);
  // following are actually only request if `chatId` param is present
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  console.log("chat", chat);

  return (
    <ChatBox>
      <ChatList
        user={user}
        chat={chat}
        chats={chats}
        chatSelected={chat}
        initalViewActive="profile"
      ></ChatList>
      <ChatView
        chats={chats}
        chatSelected={chat}
        chat={chat}
        user={user}
        messages={messages}
      />
    </ChatBox>
  );
}
