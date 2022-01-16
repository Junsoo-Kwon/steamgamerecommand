export default function SurveyReducer(state, action) {
  if (state === undefined) {
    return { clickedArray: [] };
  }
  var newState;
  var newArray;
  var newData;
  switch (action.type) {
    case "ADD_SURVEY":
      newArray = [];
      newData = { id: action.data };
      state.clickedArray.map((item) => newArray.push(item));
      newArray.push(newData);
      newState = {
        ...state,
        clickedArray: newArray,
      };
      break;
    case "DELETE_SURVEY":
      newArray = [];
      newData = { id: action.data };
      state.clickedArray.map((item) =>
        item.id !== newData.id ? newArray.push(item) : ""
      );
      newState = {
        ...state,
        clickedArray: newArray,
      };
      break;
    default:
      break;
  }

  return newState;
}
