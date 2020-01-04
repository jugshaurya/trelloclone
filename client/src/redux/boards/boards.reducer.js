import boardsActionTypes from "./boards.types";

const INITIAL_STATE = {
  boards: null,
  isFetchingBoards: false,
  isCreatingBoard: false
};

const boardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case boardsActionTypes.GET_ALL_BOARDS_START:
      return { ...state, isFetchingBoards: true, boards: null };
    case boardsActionTypes.GET_ALL_BOARDS_SUCCESS:
    case boardsActionTypes.GET_ALL_BOARDS_FAILURE:
      return { ...state, isFetchingBoards: false, boards: action.payload };

    case boardsActionTypes.CREATE_BOARD_START:
      return { ...state, isCreatingBoard: true };
    case boardsActionTypes.CREATE_BOARD_FAILURE:
      return { ...state, isCreatingBoard: false };
    case boardsActionTypes.CREATE_BOARD_SUCCESS:
      return {
        ...state,
        isCreatingBoard: true,
        boards: [...state.boards, action.payload]
      };

    default:
      return { ...state };
  }
};

export default boardsReducer;
