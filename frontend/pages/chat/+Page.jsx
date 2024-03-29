import React, { useEffect } from "react";
import { ChatBase } from "./ChatBase";
import { ChatList } from "./ChatList";

export default Page;

function Page(pageProps) {
  console.log("pageProps", pageProps);

  return (
    <ChatBase>
      <ChatList chatSelected={false} />
    </ChatBase>
  );
}
