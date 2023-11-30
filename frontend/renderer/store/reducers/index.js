import { combineReducers } from 'redux';
import { messagesReducer } from './messagesReducer';
import { chatsReducer } from './chatsReducer';
import { userReducer } from './userReducer';
export const rootReducer = combineReducers({
    messages: messagesReducer,
    chats: chatsReducer,
    user: userReducer,
});