import boardActionTypes from "./board.types";

const getBoardASYNCStart = () => ({
  type: boardActionTypes.GET_SPECIFIC_BOARD_START,
  payload: null
});

const getBoardASYNCSuccess = board => ({
  type: boardActionTypes.GET_SPECIFIC_BOARD_SUCCESS,
  payload: board
});

const getBoardASYNCFailure = () => ({
  type: boardActionTypes.GET_SPECIFIC_BOARD_START,
  payload: null
});

export const getBoardASYNC = () => async (dispatch, getState) => {
  dispatch(getBoardASYNCStart());
  try {
    const boardId = getState().board.boardData.pageBoardId;
    const response = await fetch(`http://localhost:5000/boards/${boardId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const board = await response.json();
    dispatch(getBoardASYNCSuccess(board));
  } catch (err) {
    dispatch(getBoardASYNCFailure());
  }
};

export const getPageBoardId = boardId => {
  return {
    type: boardActionTypes.GET_PAGE_BOARD_ID,
    payload: boardId
  };
};
