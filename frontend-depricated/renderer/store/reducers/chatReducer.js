export function chatReducer(state = null, action) {
  switch (action.type) {
    case "initChat":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
