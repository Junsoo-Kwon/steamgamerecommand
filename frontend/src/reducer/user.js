export default function UserReducer(state, action) {
  if (state === undefined) {
    return { account: {} };
  }
  var newState;
  switch (action.type) {
    case "UPDATE_ACCOUNT":
      newState = {
        ...state,
        account: action.data,
      };
      break;
    default:
      break;
  }

  return newState;
}
