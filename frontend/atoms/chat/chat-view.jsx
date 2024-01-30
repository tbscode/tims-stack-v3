import React, { useRef, useEffect } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyBlock, dracula } from "react-code-blocks";
import atomdark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";

import remarkGfm from "remark-gfm";

function ChatNav({ chat, chatSelected }) {
  return (
    <div className="flex flex-row bg-base-200 border rounded-xl justify-left items-center p-2 md:p-3">
      <a href="/chat/">
        <kbd
          className={`kbd h-10 w-10 xl:h-12 xl:w-12 ${
            chatSelected ? "lg:hidden" : ""
          }`}
        >
          ◀︎
        </kbd>
      </a>
      <div className="flex flex-col px-4">
        <h1 className="text-xl font-bold">
          {chat.partner.first_name} {chat.partner.second_name}
        </h1>
        <h3>{chat.uuid}</h3>
      </div>
    </div>
  );
}

function stringify(obj) {
  let cache = [];
  let str = JSON.stringify(obj, function (key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // reset the cache
  return str;
}

function ChatMessage({ message, isSelf }) {
  return (
    <div className="max-w-full overflow-x-auto">
      <div
        className={`flex flex-row content-center items-center pt-1 ${
          isSelf ? "justify-end" : "justify-start"
        }`}
      >
        <div className="flex flex-col max-w-full">
          <div className="w-fit bg-base-300 p-1 px-2 rounded-xl">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h3(props) {
                  return <h3 className="text-xl" {...props} />;
                },
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  console.log("CODE", match);
                  return (
                    <SyntaxHighlighter
                      language={match ? match[1] : null}
                      style={atomdark}
                    >
                      {children}
                    </SyntaxHighlighter>
                  );
                },
              }}
            >
              {message.text}
            </Markdown>
            <div className="flex flex-row justify-end text-xs">
              {new Date(message.created)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatInput({}) {
  return (
    <div className="bg-base-200 h-fit flex flex-row w-full rounded-xl mt-2 border p-2 gap-2">
      <textarea
        className="textarea flex flex-grow"
        placeholder="Send a message"
      ></textarea>
      <div className="flex flex-row content-center items-center justify-end">
        <button className="btn btn-lg bg-base-100">Large</button>
      </div>
    </div>
  );
}

function ChatBase({ chat, messages, user, chatSelected }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="w-full overflow-y-scroll">
        {messages?.results?.map((_message, i) => {
          return (
            <ChatMessage
              message={_message}
              isSelf={_message.sender == user.uuid}
              key={i}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput />
    </>
  );
}

export function ChatView({ chat, messages, user, chatSelected }) {
  return (
    <div
      className={`w-full h-full bg-base-100 rounded-xl p-1 relative ${
        chatSelected ? "" : "hidden md:block"
      }`}
    >
      <div className="flex flex-col h-full relative">
        <ChatNav chat={chat} chatSelected={chatSelected} />
        <ChatBase
          chat={chat}
          messages={messages}
          user={user}
          chatSelected={chatSelected}
        />
      </div>
    </div>
  );
}
