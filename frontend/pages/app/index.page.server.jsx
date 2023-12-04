
export { onBeforeRender }
async function onBeforeRender(pageContext) {

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
        chats: data.chats,
        messages: data.messages,
        user: data.user
      }
    }
  }
}
