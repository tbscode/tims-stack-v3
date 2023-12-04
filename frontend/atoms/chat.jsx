export function ChatItem({
    partnerImage,
    chatText,
    onSelected,
    uuid
}){
    return <button key={uuid} className="btn" onClick={() => {
      onSelected();
    }}>
  {chatText}
</button>
}

export function ChatItemSkelleton({}){
    return <button className="btn skeleton">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
        </div>
    </div>
</button>
}

export function ChatMessage({
    senderName,
    senderImage,
    isSelf,
    message,
    timeSend,
    timeSeen
}) {

   return <div className={`chat chat-${isSelf ? 'end' : 'start'}`}>
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
      {timeSeen && <div className="chat-footer opacity-50">
        {timeSeen}
      </div>}
      {!timeSeen && <div className="chat-footer opacity-50">
        Sending... 
      </div>}
    </div>
}

export function MessageSkelleton({
    isSelf,
    id
}) {

   return <div key={id} className={`chat chat-${isSelf ? 'end' : 'start'}`}>
      <div className="skeleton chat-image avatar">
        <div className="w-10 rounded-full">
        </div>
      </div>
      <div className="skeleton chat-header">
        <time className="text-xs opacity-50"></time>
      </div>
      <div className="skeleton chat-bubble">
        {"                                   "}
      </div>
      <div className="chat-footer opacity-50">
      </div>
      <div className="chat-footer opacity-50">
      </div>
    </div>
}