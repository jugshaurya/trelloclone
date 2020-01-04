import boardsActionTypes from "./boards.types";

// ============= GET ALL BOARDS =========================
const getAllBoardsASYNCStart = () => ({
  type: boardsActionTypes.GET_ALL_BOARDS_START,
  payload: null
});

const getAllBoardsASYNCSuccess = boards => ({
  type: boardsActionTypes.GET_ALL_BOARDS_SUCCESS,
  payload: boards
});

const getAllBoardsASYNCFailure = () => ({
  type: boardsActionTypes.GET_ALL_BOARDS_START,
  payload: null
});

export const getAllBoardsASYNC = () => async dispatch => {
  dispatch(getAllBoardsASYNCStart());
  try {
    const response = await fetch("http://localhost:5000/boards", {
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

// ============= GET ALL BOARDS  END ====================
// ============= CREATE A BOARD =========================
const createBoardASYNCStart = () => ({
  type: boardsActionTypes.CREATE_BOARD_START,
  payload: null
});

const createBoardASYNCSuccess = boards => ({
  type: boardsActionTypes.CREATE_BOARD_SUCCESS,
  payload: boards
});

const createBoardASYNCFailure = () => ({
  type: boardsActionTypes.CREATE_BOARD_START,
  payload: null
});

export const createBoardASYNC = (name, background) => async dispatch => {
  dispatch(createBoardASYNCStart());
  try {
    const newBoard = { name, background };
    const response = await fetch("http://localhost:5000/boards", {
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

// ============= CREATE A BOARD END =========================
