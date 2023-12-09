export function chatsReducer(state = {
  selectedChat: null
}, action) {
    switch (action.type) {
      case 'initChats':
        return { ...state, ...action.payload}
      case 'selectChat':
        return { ...state, selectedChat: action.payload }
      default:
        return state
    }
}