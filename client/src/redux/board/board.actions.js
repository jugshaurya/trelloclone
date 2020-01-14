import boardActionTypes from "./board.types";
const API_BASE_URL = "http://localhost:5000/api/v1";

const getBoardASYNCStart = () => ({
  type: boardActionTypes.GET_SPECIFIC_BOARD_START,
  payload: null
});

const getBoardASYNCSuccess = board => ({
  type: boardActionTypes.GET_SPECIFIC_BOARD_SUCCESS,
  payload: board
});

const getBoardASYNCFailure = errMessage => ({
  type: boardActionTypes.GET_SPECIFIC_BOARD_FAILURE,
  payload: errMessage
});

export const getBoardASYNC = () => async (dispatch, getState) => {
  dispatch(getBoardASYNCStart());
  try {
    const boardId = getState().board.boardData.pageBoardId;
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const boardOrError = await response.json();
    if (response.status >= 400) {
      throw new Error(boardOrError.message);
    }
    dispatch(getBoardASYNCSuccess(boardOrError));
  } catch (err) {
    dispatch(getBoardASYNCFailure(err.message));
  }
};

export const getPageBoardId = boardId => {
  return {
    type: boardActionTypes.GET_PAGE_BOARD_ID,
    payload: boardId
  };
};
