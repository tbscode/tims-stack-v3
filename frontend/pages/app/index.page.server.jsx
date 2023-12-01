import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import fetch from 'node-fetch'


export { Page }
export { onBeforeRender }

async function onBeforeRender(pageContext) {
  // 1. We take the headers and cookies from the intial request and use it to fetch the user_data  
  const res = await fetch("http://host.docker.internal:8000/api/user_data", {
    headers: {
      cookie: pageContext.requestHeaders.cookie,
      'X-CSRFToken': pageContext.xcsrfToken,
    },
    method: 'GET',
    credentials: 'include'
  })
  const data = await res.json()


  return {
    pageContext: {
      shell: "dashboard",
      pageProps: {

      }
    }
  }
}

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