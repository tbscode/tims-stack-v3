export default onBeforeRender;
import { render, redirect } from "vike/abort";
import {
  STATIC_EXPORT,
  INTERNAL_BACKEND_ROUTE,
} from "../../renderer/constants";

async function onBeforeRender(pageContext) {
  if (!pageContext.sessionId) {
    // no sessionId means unauthenticated!
    throw render("/login/");
  }
  // Still the sessionId could be expired, test by fetching user_data
  let chatId = pageContext.routeParams.chatId;
  console.log("CONTEXT", pageContext);

  // special routing for sub settings pages
  let fetchUrl = `${INTERNAL_BACKEND_ROUTE}/api/user_data`;
  if (chatId) {
    fetchUrl = `${INTERNAL_BACKEND_ROUTE}/api/user_data/${chatId}`;
  } else if (pageContext.urlParsed.search?.chatId) {
    chatId = pageContext.urlParsed.search.chatId;
    fetchUrl = `${INTERNAL_BACKEND_ROUTE}/api/user_data/${chatId}`;
  }

  const res = await fetch(fetchUrl, {
    headers: {
      cookie: pageContext.requestHeaders.cookie,
      "X-CSRFToken": pageContext.xcsrfToken,
    },
    method: "GET",
    credentials: "include",
  });

  if (res.status === 403) {
    throw redirect("/login/");
  }

  const data = await res.json();

  console.log("CONTEXT", pageContext.PRELOADED_STATE);

  const baseReduxState = {
    ...pageContext.PRELOADED_STATE,
    chats: data.chats,
    user: data.user,
  };

  return {
    pageContext: {
      xcsrfToken: pageContext.xcsrfToken,
      chatId,
      INJECT_REDUX_STATE: chatId
        ? { ...baseReduxState, messages: data.messages, chat: data.chat }
        : baseReduxState,
    },
  };
}
