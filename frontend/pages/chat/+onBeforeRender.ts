export default onBeforeRender;
import { render, redirect } from "vike/abort";
import { STATIC_EXPORT, INTERNAL_BACKEND_ROUTE } from "../../renderer/constants";

async function onBeforeRender(pageContext) {

  if (!pageContext.sessionId) {
    // no sessionId means unauthenticated!
    throw render("/login/");
  }
  // Still the sessionId could be expired, test by fetching user_data
  console.log("Fetching user_data", INTERNAL_BACKEND_ROUTE);
  const res = await fetch(`${INTERNAL_BACKEND_ROUTE}/api/user_data`, {
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
