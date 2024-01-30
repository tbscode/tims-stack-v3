import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChatItem,
  ChatMessage,
  MessageSkelleton,
  ChatItemSkelleton,
  ChatBox,
  ChatList,
} from "../../atoms/chat";
import { ChatSplit } from "../../atoms/chat-split";
import Cookies from "js-cookie";

export default Page;

const sampleSide = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomMessageAmount = Math.floor(Math.random() * 10) + 1;

async function requestAiResponse() {
  const aborter = new AbortController();

  const response = await fetch("/api/prompt/", {
    signal: aborter.signal,
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken"),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      prompt: "How are you doing? Please write me a long poem.",
    }),
  });
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      // Do something with last chunk of data then exit reader
      return;
    }
    console.log("Chunk", value);
    // Otherwise do something here to process current chunk
  }
}

function Page(pageProps) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);

  console.log("CHATS ONLY", chats);

  return (
    <ChatBox>
      <ChatList chats={chats} chatSelected={false}></ChatList>
    </ChatBox>
  );
}
