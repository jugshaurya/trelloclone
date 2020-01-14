import userActionTypes from "./user.types";

const API_BASE_URL = "http://localhost:5000/api/v1";

// Fetching User
const getUserViaTokenASYNCStart = () => ({
  type: userActionTypes.GET_USER_VIA_TOKEN_START,
  payload: null
});

const getUserViaTokenASYNCSuccess = user => ({
  type: userActionTypes.GET_USER_VIA_TOKEN_SUCCESS,
  payload: user
});

const getUserViaTokenASYNCFailure = () => ({
  type: userActionTypes.GET_USER_VIA_TOKEN_FAILURE,
  payload: null
});

export const getUserViaTokenASYNC = () => async dispatch => {
  dispatch(getUserViaTokenASYNCStart());
  const token = localStorage.getItem("token");
  try {
    if (!token) throw new Error("No Token Available");
    const response = await fetch(`${API_BASE_URL}/user`, {
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

// SIGN-IN USER
const signInUserASYNCStart = () => ({
  type: userActionTypes.SIGN_IN_USER_START,
  payload: null
});

const signInUserASYNCSuccess = (message, user) => ({
  type: userActionTypes.SIGN_IN_USER_SUCCESS,
  payload: { message, user }
});

const signInUserASYNCFailure = error => ({
  type: userActionTypes.SIGN_IN_USER_FAILURE,
  payload: error
});

export const signInUserASYNC = (
  username,
  password,
  history
) => async dispatch => {
  dispatch(signInUserASYNCStart());
  try {
    const response = await fetch(`${API_BASE_URL}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.ok && response.status === 200) {
      const { message, token, user } = await response.json();
      dispatch(signInUserASYNCSuccess(message, user));
      localStorage.setItem("token", token);
      history.push("/");
    } else {
      throw new Error("Invalid Username or Password");
    }
  } catch (err) {
    dispatch(signInUserASYNCFailure(err.message));
  }
};

//  SIGN-UP USER
const signUpUserASYNCStart = () => ({
  type: userActionTypes.SIGN_UP_USER_START,
  payload: null
});

const signUpUserASYNCSuccess = message => ({
  type: userActionTypes.SIGN_UP_USER_SUCCESS,
  payload: message
});

const signUpUserASYNCFailure = error => ({
  type: userActionTypes.SIGN_UP_USER_FAILURE,
  payload: error
});

export const signUpUserASYNC = (userCredentials, history) => async dispatch => {
  dispatch(signUpUserASYNCStart());
  const {
    username,
    email,
    password,
    confirmPassword,
    avatarUrl
  } = userCredentials;

  try {
    // Checking Passwords matches
    if (password !== confirmPassword) {
      throw new Error("Passwords don't Match");
    }

    const response = await fetch(`${API_BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        confirmPassword,
        email,
        avatarUrl
      })
    });

    const { message } = await response.json();
    if (!response.ok || !response.status === 201) {
      throw new Error(message);
    }
    dispatch(signUpUserASYNCSuccess(message));
    history.push("/signin");
  } catch (err) {
    dispatch(signUpUserASYNCFailure(err.message));
  }
};

// SIGN-OUT User
export const signOutUser = history => {
  localStorage.removeItem("token");
  history.push("/");
  return {
    type: userActionTypes.SIGN_OUT_USER
  };
};
