import activitiesActionTypes from "./activities.types";

// GET all activities
const getAllActivitiesASYNCStart = () => ({
  type: activitiesActionTypes.GET_ALL_ACTIVITIES_START,
  payload: null
});

const getAllActivitiesASYNCSuccess = activities => ({
  type: activitiesActionTypes.GET_ALL_ACTIVITIES_SUCCESS,
  payload: activities
});

const getAllActivitiesASYNCFailure = () => ({
  type: activitiesActionTypes.GET_ALL_ACTIVITIES_FAILURE,
  payload: null
});

export const getAllActivitiesASYNC = () => async (dispatch, getState) => {
  dispatch(getAllActivitiesASYNCStart());
  try {
    const boardId = getState().board.boardData.pageBoardId;
    const response = await fetch(
      `http://localhost:5000/activities/${boardId}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    const activities = await response.json();
    dispatch(getAllActivitiesASYNCSuccess(activities));
  } catch (err) {
    dispatch(getAllActivitiesASYNCFailure());
  }
};
// Create new Activity
const createNewActivityASYNCStart = () => ({
  type: activitiesActionTypes.CREATE_NEW_ACTIVITY_START,
  payload: null
});

const createNewActivityASYNCSuccess = activity => ({
  type: activitiesActionTypes.CREATE_NEW_ACTIVITY_SUCCESS,
  payload: activity
});

const createNewActivityASYNCFailure = () => ({
  type: activitiesActionTypes.CREATE_NEW_ACTIVITY_FAILURE,
  payload: null
});

export const createNewActivityASYNC = ({ text, cardId }) => async (
  dispatch,
  getState
) => {
  dispatch(createNewActivityASYNCStart());
  try {
    const boardId = getState().board.boardData.pageBoardId;
    const newActivity = { text, cardId };
    const response = await fetch(
      `http://localhost:5000/activities/${boardId}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newActivity)
      }
    );
    const activity = await response.json();
    dispatch(createNewActivityASYNCSuccess(activity));
  } catch (err) {
    dispatch(createNewActivityASYNCFailure());
  }
};
