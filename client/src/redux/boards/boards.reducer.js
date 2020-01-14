import boardsActionTypes from "./boards.types";

const INITIAL_STATE = {
  boards: null,
  isFetchingBoards: false,
  isCreatingBoard: false,
  isDeletingBoard: false
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
        isCreatingBoard: false,
        boards: [...state.boards, action.payload]
      };

    case boardsActionTypes.DELETE_BOARD_START:
      return { ...state, isDeletingBoard: true };
    case boardsActionTypes.DELETE_BOARD_FAILURE:
      return { ...state, isDeletingBoard: false };
    case boardsActionTypes.DELETE_BOARD_SUCCESS:
      return {
        ...state,
        isDeletingBoard: false,
        boards: state.boards.filter(board => board._id !== action.payload._id)
      };

    default:
      return { ...state };
  }
};

export default boardsReducer;
