import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ChatItem, ChatMessage, MessageSkelleton, ChatItemSkelleton } from '../../atoms/chat'
import { ChatSplit } from '../../atoms/chat-split'
import { fetchMessagesForChat } from '../../renderer/store/reducers/messagesReducer'

export { Page }

const sampleSide = arr => arr[Math.floor(Math.random() * arr.length)];
const randomMessageAmount = Math.floor(Math.random() * 10) + 1

function Page(pageProps) {
  const dispatch = useDispatch()
  const selectedChat = useSelector(state => state.chats.selectedChat)
  const chats = useSelector(state => state.chats)
  const user = useSelector(state => state.user)
  const messages = useSelector(state => state.messages)
  const selectedChatMessages = (selectedChat in messages) ? messages[selectedChat] : null
  
  useEffect(() => {
    /**
     * Chats & Messages might be pre fetched by the server
     */
    if(!chats.initalized && pageProps.chats)
      dispatch({
        type: 'initChats',
        payload: pageProps.chats
      })
    if(!messages.initalized && pageProps.messages)
      dispatch({
        type: 'initMessages',
        payload: pageProps.messages
      })
    if(!user.initalized && pageProps.user)
      dispatch({
        type: 'initUser',
        payload: pageProps.user
      })
  }, []);

  useEffect(() => {
    console.log("selectedChat", selectedChat)
    if (selectedChat)
      fetchMessagesForChat(selectedChat)(dispatch)
  }, [selectedChat]);

  return <ChatSplit 
    leftPanel={
      <div className="flex flex-col h-full pt-2">
        {(chats.initalized ? chats.results : pageProps.chats.results).map((chat) => {
          return <ChatItem
            chatText={chat.uuid}
            onSelected={() => {
              dispatch({
                type: 'selectChat',
                payload: chat.uuid
              })
            }}
            uuid={chat.uuid}
            key={chat.uuid}
          />})}
      </div>
    }
    rightPanel={
      <div className="flex flex-col h-full">
      {/** if chat selected & selected chat message not loaded -> render chat skelleton */}
      {(!selectedChatMessages && (selectedChat && (randomMessageAmount > 0))) && [...Array(randomMessageAmount)].map((e, i) => {
       return <MessageSkelleton
          isSelf={sampleSide([true, false])}
          id={i}
          key={i}
        />
      })}
      {/** if selectedChatMessages is populated, render the messages */}
      {selectedChatMessages && selectedChatMessages.results.map((message, i) => {
        return <ChatMessage
          senderName={message.recipient}
          senderImage={""}
          isSelf={message.sender === user?.uuid}
          message={message.text}
          timeSend={message.created}
          timeSeen={""}
          key={i} />
      })}
      </div>
    }
    leftPanelOnTop={false}
    isMobile={false}
    />
}