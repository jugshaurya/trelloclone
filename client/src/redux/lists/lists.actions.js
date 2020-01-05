import listsActionTypes from "./lists.types";

import { createNewActivityASYNC } from "../activities/activities.actions";
// ============= GET ALL LISTS =========================
const getAllListsInBoardASYNCStart = () => ({
  type: listsActionTypes.GET_ALL_LISTS_IN_BOARD_START,
  payload: null
});

const getAllListsInBoardASYNCSuccess = lists => ({
  type: listsActionTypes.GET_ALL_LISTS_IN_BOARD_SUCCESS,
  payload: lists
});

const getAllListsInBoardASYNCFailure = () => ({
  type: listsActionTypes.GET_ALL_LISTS_IN_BOARD_FAILURE,
  payload: null
});

export const getAllListsInBoardASYNC = () => async (dispatch, getState) => {
  dispatch(getAllListsInBoardASYNCStart());
  const boardId = getState().board.boardData.pageBoardId;
  try {
    const response = await fetch(`http://localhost:5000/lists/${boardId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const lists = await response.json();
    dispatch(getAllListsInBoardASYNCSuccess(lists));
  } catch (err) {
    dispatch(getAllListsInBoardASYNCFailure());
  }
};

// ============= GET ALL LISTS  END ====================
// ============= CREATE A LIST =========================
const createListASYNCStart = () => ({
  type: listsActionTypes.CREATE_LIST_START,
  payload: null
});

const createListASYNCSuccess = list => ({
  type: listsActionTypes.CREATE_LIST_SUCCESS,
  payload: list
});

const createListASYNCFailure = () => ({
  type: listsActionTypes.CREATE_LIST_START,
  payload: null
});

export const createListASYNC = name => async (dispatch, getState) => {
  dispatch(createListASYNCStart());
  const boardId = getState().board.boardData.pageBoardId;

  const newList = { name };
  console.log(name);
  try {
    const response = await fetch(`http://localhost:5000/lists/${boardId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newList)
    });

    const list = await response.json();
    dispatch(createListASYNCSuccess(list));
    dispatch(createNewActivityASYNC(`created list **${list.name}**`));
  } catch (err) {
    dispatch(createListASYNCFailure());
  }
};

// ============= CREATE A LIST END =========================
