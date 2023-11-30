export function chatsReducer(state = {}, action) {
    switch (action.type) {
      case 'init':
        return { ...state, ...action.payload }
      default:
        return state
    }
}