import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export { Page }

function Page(pageProps) {
  const chats = useSelector((state) => state.chats)
  const messages = useSelector((state) => state.messages)
  const user = useSelector((state) => state.user)
    
  console.log("PAGE", chats, messages, user)


  return (
    <>
          <h1 className="text-7xl font-bold underline text-red">SSR</h1>
      <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
</div>
<div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-bubble">It was you who would bring balance to the Force</div>
</div>
<div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-bubble">Not leave it in Darkness</div>
</div>
    </>
  )
}