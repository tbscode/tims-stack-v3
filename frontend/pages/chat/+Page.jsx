import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChatItem,
  ChatMessage,
  MessageSkelleton,
  ChatItemSkelleton,
} from "../../atoms/chat";
import { ChatSplit } from "../../atoms/chat-split";
import { fetchMessagesForChat } from "../../renderer/store/reducers/messagesReducer";
import Cookies from 'js-cookie'


export { Page };

const sampleSide = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomMessageAmount = Math.floor(Math.random() * 10) + 1;

async function requestAiResponse(){

  const aborter = new AbortController();

  const response = await fetch('/api/prompt/',{
      signal: aborter.signal,
      headers: {
        "X-CSRFToken": Cookies.get('csrftoken'),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "prompt": "How are you doing? Please write me a long poem." 
      })
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
  const selectedChatId = useSelector((state) => state.chats.selectedChatId);
  const chats = useSelector((state) => state.chats);
  const selectedChat = chats.results.find(
    (chat) => chat.uuid === selectedChatId
  );
  const user = useSelector((state) => state.user);
  const messages = useSelector((state) => state.messages);
  const tmpMessages = useSelector((state) => state.tmpMessages);
  const messageInputRef = React.createRef();

  const selectedChatMessages =
    selectedChatId in messages ? messages[selectedChatId] : null;

  const sendMessage = (chatUuid, message) => {
    fetch(`/api/messages/${chatUuid}/send/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        text: message,
      }),
    }).then((res) => {
      if (res.status === 200) {
        // sesnd the message to the store
        const msgObj = {
          sender: user.uuid,
          recipient: selectedChat.u2,
          text: message,
          created: new Date().toISOString(),
        };
        dispatch({
          type: "addTmpMessage",
          payload: {
            chatUuid,
            message: msgObj,
          },
        });
      }
    });
  };

  useEffect(() => {
    if (selectedChatId) fetchMessagesForChat(selectedChatId)(dispatch);
  }, [selectedChat]);

  return (
    <ChatSplit
      leftPanel={
        <div className="flex flex-col h-full pt-2">
          {chats.results &&
            chats.results.map((chat) => {
              return (
                <ChatItem
                  chatText={chat.uuid}
                  onSelected={() => {
                    dispatch({
                      type: "selectChat",
                      payload: chat.uuid,
                    });
                  }}
                  uuid={chat.uuid}
                  key={chat.uuid}
                />
              );
            })}
        </div>
      }
      rightPanel={
        <div className="flex flex-col h-full">
          {/** if chat selected & selected chat message not loaded -> render chat skelleton */}
          {!selectedChatMessages &&
            selectedChatId &&
            randomMessageAmount > 0 &&
            [...Array(randomMessageAmount)].map((e, i) => {
              return (
                <MessageSkelleton
                  isSelf={sampleSide([true, false])}
                  id={i}
                  key={i}
                />
              );
            })}
          {/** if selectedChatMessages is populated, render the messages */}
          {selectedChatMessages &&
            selectedChatMessages.results.map((message, i) => {
              return (
                <ChatMessage
                  senderName={message.recipient}
                  senderImage={""}
                  isSelf={message.sender === user?.uuid}
                  message={message.text}
                  timeSend={message.created}
                  timeSeen={""}
                  key={i}
                />
              );
            })}
          {selectedChatMessages &&
            tmpMessages[selectedChatId] &&
            tmpMessages[selectedChatId].map((message, i) => {
              return (
                <ChatMessage
                  senderName={user?.username}
                  senderImage={""}
                  isSelf={true}
                  message={message}
                  timeSend={""}
                  timeSeen={""}
                  key={i}
                />
              );
            })}
          <div>
            <input
              className="input input-bordered"
              placeholder="Message"
              ref={messageInputRef}
            />
            <button
              onClick={() => {
                console.log("SEND", messageInputRef.current.value);
                sendMessage(selectedChatId, messageInputRef.current.value);
              }}
              className="btn btn-primary"
            >
              Send
            </button>
            <button
              onClick={() => {
                requestAiResponse(pageProps.xcsrfToken).then((res) => {
                  console.log(res);
                })
              }}
              className="btn btn-primary"
            >
              AI
            </button>
          </div>
        </div>
      }
      leftPanelOnTop={false}
      isMobile={false}
    />
  );
}
