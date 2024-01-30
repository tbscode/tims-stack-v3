import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChatItem,
  ChatMessage,
  MessageSkelleton,
  ChatItemSkelleton,
  ChatList,
  ChatView,
} from "../../../atoms/chat";
import { ChatSplit } from "../../../atoms/chat-split";
import { fetchMessagesForChat } from "../../../renderer/store/reducers/messagesReducer";
import Cookies from "js-cookie";

export default Page;

function Page(pageProps, PRELOADED_STATE) {
  const dispatch = useDispatch();
  const selectedChatId = useSelector((state) => state.chats.selectedChatId);
  const chats = useSelector((state) => state.chats);
  const messages = useSelector((state) => state.messages);
  const selectedChat = chats?.results
    ? chats.results.find((chat) => chat.uuid === selectedChatId)
    : null;
  const messageInputRef = React.createRef();
  const user = useSelector((state) => state.user);
  const tmpMessages = useSelector((state) => state.tmpMessages);

  console.log("CHATS & MESSAGES", chats, messages);
  console.log("ROUTE", pageProps, PRELOADED_STATE);

  const selectedChatMessages =
    selectedChatId in messages ? messages[selectedChatId] : null;

  useEffect(() => {
    if (selectedChatId) fetchMessagesForChat(selectedChatId)(dispatch);
  }, [selectedChat]);

  return (
    <div className="flex flex-row h-screen">
      <ChatList chats={chats} chatSelected={true}></ChatList>
      <ChatView
        messages={selectedChatMessages}
        user={user}
        chatSelected={true}
      ></ChatView>
    </div>
  );
}
