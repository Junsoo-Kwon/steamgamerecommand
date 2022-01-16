export const addSurvey = (clickedId) => ({
  type: "ADD_SURVEY",
  data: clickedId,
});

export const deleteSurvey = (clickedId) => ({
  type: "DELETE_SURVEY",
  data: clickedId,
});
