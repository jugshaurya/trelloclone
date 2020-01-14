import userActionTypes from "./user.types";

const INITIAL_STATE = {
  user: null,

  isSignIn: false,
  signInError: null,
  signInSuccessMessage: null,

  isSignUp: false,
  signUpError: null,
  signUpSuccessMessage: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.GET_USER_VIA_TOKEN_START:
    case userActionTypes.GET_USER_VIA_TOKEN_SUCCESS:
    case userActionTypes.GET_USER_VIA_TOKEN_FAILURE:
      return {
        ...state,
        user: action.payload
      };

    case userActionTypes.SIGN_IN_USER_START:
      return {
        ...state,
        isSignIn: true,
        user: null,
        signInError: null,
        signInSuccessMessage: null
      };
    case userActionTypes.SIGN_IN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isSignIn: false,
        signInError: null,
        signInSuccessMessage: action.payload.message
      };
    case userActionTypes.SIGN_IN_USER_FAILURE:
      return {
        ...state,
        user: null,
        isSignIn: false,
        signInError: action.payload,
        signInSuccessMessage: null
      };

    case userActionTypes.SIGN_UP_USER_START:
      return {
        ...state,
        isSignUp: true,
        signUpError: null,
        signUpSuccessMessage: null
      };
    case userActionTypes.SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        isSignUp: false,
        signUpError: null,
        signUpSuccessMessage: action.payload
      };
    case userActionTypes.SIGN_UP_USER_FAILURE:
      return {
        ...state,
        isSignUp: false,
        signUpError: action.payload,
        signUpSuccessMessage: null
      };

    case userActionTypes.SIGN_OUT_USER:
      // Basicallly Resetting Everything
      return {
        ...state,
        user: null,
        isSignIn: false,
        signInError: null,
        signInSuccessMessage: null,
        isSignUp: false,
        signUpError: null,
        signUpSuccessMessage: null
      };

    default:
      return state;
  }
};

export default userReducer;
