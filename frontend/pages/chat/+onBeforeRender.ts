export default onBeforeRender;
import { render, redirect } from "vike/abort";
import { STATIC_EXPORT, INTERNAL_BACKEND_ROUTE } from "../../renderer/constants";

async function onBeforeRender(pageContext) {

  if (!pageContext.sessionId) {
    // no sessionId means unauthenticated!
    throw render("/login/");
  }
  // Still the sessionId could be expired, test by fetching user_data
  const res = await fetch(INTERNAL_BACKEND_ROUTE, {
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

  return {
    pageContext: {
      xcsrfToken: pageContext.xcsrfToken,
      shell: "dashboard",
      INJECT_REDUX_STATE: {
        chats: data.chats,
        user: data.user,
      },
    },
  };
}
