import userActionTypes from "./user.types";

const getUserViaTokenASYNCStart = () => ({
  type: userActionTypes.GET_USER_VIA_TOKEN_START,
  payload: null
});

const getUserViaTokenASYNCSuccess = user => ({
  type: userActionTypes.GET_USER_VIA_TOKEN_SUCCESS,
  payload: user
});

const getUserViaTokenASYNCFailure = () => ({
  type: userActionTypes.GET_USER_VIA_TOKEN_START,
  payload: null
});

export const getUserViaTokenASYNC = () => async dispatch => {
  dispatch(getUserViaTokenASYNCStart());
  const token = localStorage.getItem("token");
  try {
    if (!token) throw new Error("No Token Available");

    const response = await fetch("http://localhost:5000/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    const user = await response.json();
    dispatch(getUserViaTokenASYNCSuccess(user));
  } catch (err) {
    dispatch(getUserViaTokenASYNCFailure());
  }
};
