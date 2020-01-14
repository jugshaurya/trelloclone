import boardsActionTypes from "./boards.types";
const API_BASE_URL = "http://localhost:5000/api/v1";

// GET ALL BOARDS
const getAllBoardsASYNCStart = () => ({
  type: boardsActionTypes.GET_ALL_BOARDS_START,
  payload: null
});

const getAllBoardsASYNCSuccess = boards => ({
  type: boardsActionTypes.GET_ALL_BOARDS_SUCCESS,
  payload: boards
});

const getAllBoardsASYNCFailure = () => ({
  type: boardsActionTypes.GET_ALL_BOARDS_FAILURE,
  payload: []
});

export const getAllBoardsASYNC = () => async dispatch => {
  dispatch(getAllBoardsASYNCStart());
  try {
    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const boards = await response.json();
    dispatch(getAllBoardsASYNCSuccess(boards));
  } catch (err) {
    dispatch(getAllBoardsASYNCFailure());
  }
};

// CREATE A BOARD
const createBoardASYNCStart = () => ({
  type: boardsActionTypes.CREATE_BOARD_START,
  payload: null
});

const createBoardASYNCSuccess = board => ({
  type: boardsActionTypes.CREATE_BOARD_SUCCESS,
  payload: board
});

const createBoardASYNCFailure = () => ({
  type: boardsActionTypes.CREATE_BOARD_FAILURE,
  payload: null
});

export const createBoardASYNC = (name, background) => async dispatch => {
  dispatch(createBoardASYNCStart());
  try {
    const newBoard = { name, background };
    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBoard)
    });

    const board = await response.json();
    dispatch(createBoardASYNCSuccess(board));
  } catch (err) {
    dispatch(createBoardASYNCFailure());
  }
};

// DELETE A BOARD
const deleteBoardASYNCStart = () => ({
  type: boardsActionTypes.DELETE_BOARD_START,
  payload: null
});

const deleteBoardASYNCSuccess = board => ({
  type: boardsActionTypes.DELETE_BOARD_SUCCESS,
  payload: board
});

const deleteBoardASYNCFailure = () => ({
  type: boardsActionTypes.DELETE_BOARD_FAILURE,
  payload: null
});

export const deleteBoardASYNC = board => async dispatch => {
  dispatch(deleteBoardASYNCStart());
  const boardObj = {
    _id: board._id
  };

  try {
    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(boardObj)
    });

    const board = await response.json();
    dispatch(deleteBoardASYNCSuccess(board));
  } catch (err) {
    dispatch(deleteBoardASYNCFailure());
  }
};
