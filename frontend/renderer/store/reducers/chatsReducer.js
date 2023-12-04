export function chatsReducer(state = {
  initalized: false,
  selectedChat: null
}, action) {
    switch (action.type) {
      case 'initChats':
        return { ...state, ...action.payload, initalized: true }
      case 'selectChat':
        return { ...state, selectedChat: action.payload }
      default:
        return state
    }
}

export function initChats(data) {
  return dispatch => {
    dispatch({ type: 'initChats', payload: data })
  }
}