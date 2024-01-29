export function messagesReducer(
  state = {
    initalized: false,
    errors: null,
  },
  action
) {
  switch (action.type) {
    case "initMessages":
      return { ...state, ...action.payload, initalized: true };
    case "initChatMessages":
      return {
        ...state,
        [action.payload.chat]: action.payload.data,
        errors: null,
      };
    default:
      return state;
  }
}

export function fetchMessagesForChat(chatId) {
  return async (dispatch) => {
    const res = await fetch(`/api/messages/${chatId}/`);
    const data = await res.json();

    dispatch({
      type: "initChatMessages",
      payload: { chat: chatId, data: data },
    });
  };
}
