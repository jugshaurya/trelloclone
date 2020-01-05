import cardsActionTypes from "./cards.types";
import axios from "axios";

import { createNewActivityASYNC } from "../activities/activities.actions";
// ============= GET ALL CARDS =========================
const getAllCardsInBoardASYNCStart = () => ({
  type: cardsActionTypes.GET_ALL_CARDS_IN_BOARD_START,
  payload: null
});

const getAllCardsInBoardASYNCSuccess = cards => ({
  type: cardsActionTypes.GET_ALL_CARDS_IN_BOARD_SUCCESS,
  payload: cards
});

const getAllCardsInBoardASYNCFailure = () => ({
  type: cardsActionTypes.GET_ALL_CARDS_IN_BOARD_FAILURE,
  payload: null
});

export const getAllCardsInBoardASYNC = () => async (dispatch, getState) => {
  dispatch(getAllCardsInBoardASYNCStart());
  const boardId = getState().board.boardData.pageBoardId;

  try {
    const response = await fetch(`http://localhost:5000/cards/${boardId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const cards = await response.json();
    dispatch(getAllCardsInBoardASYNCSuccess(cards));
  } catch (err) {
    dispatch(getAllCardsInBoardASYNCFailure());
  }
};

// ============= GET ALL CARDS  END ====================
// ============= CREATE A CARD =========================

const createCardASYNCStart = () => ({
  type: cardsActionTypes.CREATE_CARD_START,
  payload: null
});

const createCardASYNCSuccess = card => ({
  type: cardsActionTypes.CREATE_CARD_SUCCESS,
  payload: card
});

const createCardASYNCFailure = () => ({
  type: cardsActionTypes.CREATE_CARD_START,
  payload: null
});

export const createCardASYNC = (listId, title) => async (
  dispatch,
  getState
) => {
  dispatch(createCardASYNCStart());
  const boardId = getState().board.boardData.pageBoardId;
  const newCard = {
    listId,
    title,
    description: "later", // will change later
    cardImage: "",
    labels: []
  };
  try {
    const response = await fetch(`http://localhost:5000/cards/${boardId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newCard)
    });

    const card = await response.json();
    dispatch(createCardASYNCSuccess(card));
    dispatch(createNewActivityASYNC(`created card **${card.title}**`));
  } catch (err) {
    dispatch(createCardASYNCFailure());
  }
};
// ============= CREATE A CARD END =========================

// ============= UPDATE A CARD : DROP/EDIT/UPLOADIMAGE =========================
const updateCardASYNCStart = EVENT => ({
  type: cardsActionTypes[`UPDATE_CARD_WHEN_${EVENT}_START`],
  payload: null
});

const updateCardASYNCSuccess = (EVENT, updatedCard) => ({
  type: cardsActionTypes[`UPDATE_CARD_WHEN_${EVENT}_SUCCESS`],
  payload: updatedCard
});

const updateCardASYNCFailure = EVENT => ({
  type: cardsActionTypes[`UPDATE_CARD_WHEN_${EVENT}_FAILURE`]
});

// NOte: DROP AND EDIT ARE ALMOST SAME just EVENT is different: believe me it was required!! :)
// DROP
// @ update is an object with properties required to be changed
export const updateCardWhenDropASYNC = (card, update) => async (
  dispatch,
  getState
) => {
  dispatch(updateCardASYNCStart("DROP"));
  const newCard = { ...card, ...update };
  const boardId = getState().board.boardData.pageBoardId;

  try {
    const response = await fetch(`http://localhost:5000/cards/${boardId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newCard)
    });

    const updatedCard = await response.json();
    dispatch(updateCardASYNCSuccess("DROP", updatedCard));

    const lists = getState().board.boardLists.lists;
    const fromList = lists.filter(list => list._id === card.listId)[0];
    const toList = lists.filter(list => list._id === updatedCard.listId)[0];
    dispatch(
      createNewActivityASYNC(
        `moved card **${card.title}** from **${fromList.name}** to **${toList.name}**`
      )
    );
  } catch (err) {
    dispatch(updateCardASYNCFailure("DROP"));
  }
};

// EDIT
// @ update is an object with properties required to be changed
export const updateCardWhenEditASYNC = (card, update) => async (
  dispatch,
  getState
) => {
  dispatch(updateCardASYNCStart("EDIT"));
  const newCard = { ...card, ...update };
  const boardId = getState().board.boardData.pageBoardId;
  try {
    const response = await fetch(`http://localhost:5000/cards/${boardId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newCard)
    });

    const updatedCard = await response.json();
    dispatch(updateCardASYNCSuccess("EDIT", updatedCard));
    dispatch(
      createNewActivityASYNC(
        `changed card title from **${card.title}** to **${updatedCard.title}**`
      )
    );
  } catch (err) {
    dispatch(updateCardASYNCFailure("EDIT"));
  }
};

// Upload Image
// @ update is an object with properties required to be changed
export const updateCardWhenUploadImageASYNC = (
  card,
  image
) => async dispatch => {
  if (image) {
    const data = new FormData();
    data.append("imageData", image);

    // Looping through arrays created from Object.keys
    const keys = Object.keys(card);
    for (const key of keys) {
      data.set(key, card[key]);
    }
    dispatch(updateCardASYNCStart("UPLOADIMAGE"));
    try {
      const response = await axios.post(
        `http://localhost:5000/cards/uploadmulter`,
        data,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const updatedCard = await response.data;
      dispatch(updateCardASYNCSuccess("UPLOADIMAGE", updatedCard));
      dispatch(
        createNewActivityASYNC(
          `added **${updatedCard.cardImage.slice("-")[1]}** image to **${
            card.title
          }**`
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(updateCardASYNCFailure("UPLOADIMAGE"));
    }
  }
};

// ============= UPDATE A CARD END : DROP/EDIT/UPLOADIMAGE =========================
