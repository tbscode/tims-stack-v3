import { combineReducers } from "redux";
import { messagesReducer } from "./messagesReducer";
import { chatsReducer } from "./chatsReducer";
import { tmpMessagesReducer } from "./tmpMessagesReducer";
import { userReducer } from "./userReducer";
import { chatReducer } from "./chatReducer";
export const rootReducer = combineReducers({
  messages: messagesReducer,
  tmpMessages: tmpMessagesReducer,
  chats: chatsReducer,
  user: userReducer,
  chat: chatReducer,
});
