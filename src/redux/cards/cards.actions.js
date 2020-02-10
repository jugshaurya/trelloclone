import cardsActionTypes from "./cards.types";
import axios from "axios";

import { createNewActivityASYNC } from "../activities/activities.actions";
const API_BASE_URL = "/api/v1";

// GET ALL CARDS
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
    const response = await fetch(`${API_BASE_URL}/cards/${boardId}`, {
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

// CREATE A CARD
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
    title
  };

  try {
    const response = await fetch(`${API_BASE_URL}/cards/${boardId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newCard)
    });

    const card = await response.json();
    dispatch(createCardASYNCSuccess(card));
    dispatch(
      createNewActivityASYNC({
        text: `created card **${card.title.trim()}**`,
        cardId: card._id
      })
    );
  } catch (err) {
    dispatch(createCardASYNCFailure());
  }
};

// UPDATE A CARD : DROP/EDIT/UPLOADIMAGE/EDITDESC

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

// @ update is an object with properties required to be changed
export const updateCardWhenDropASYNC = (card, update) => async (
  dispatch,
  getState
) => {
  dispatch(updateCardASYNCStart("DROP"));
  const newCard = { ...card, ...update };
  const boardId = getState().board.boardData.pageBoardId;

  try {
    const response = await fetch(`${API_BASE_URL}/cards/${boardId}`, {
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
      createNewActivityASYNC({
        text: `moved card **${card.title.trim()}** from **${fromList.name.trim()}** to **${toList.name.trim()}**`,
        cardId: card._id
      })
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
    const response = await fetch(`${API_BASE_URL}/cards/${boardId}`, {
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
      createNewActivityASYNC({
        text: `changed card title from **${card.title.trim()}** to **${updatedCard.title.trim()}**`,
        cardId: card._id
      })
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
        `${API_BASE_URL}/cards/uploadmulter`,
        data,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const updatedCard = await response.data;
      const index = updatedCard.cardImage.indexOf("-");
      dispatch(
        createNewActivityASYNC({
          text: `added **${updatedCard.cardImage
            .trim()
            .substring(index + 1)}** image to card **${card.title.trim()}**`,
          cardId: card._id
        })
      );
      dispatch(updateCardASYNCSuccess("UPLOADIMAGE", updatedCard));
    } catch (error) {
      dispatch(updateCardASYNCFailure("UPLOADIMAGE"));
    }
  }
};

// EDITDESC
// @ update is an object with properties required to be changed
export const updateCardWhenEditDescriptionASYNC = (card, update) => async (
  dispatch,
  getState
) => {
  dispatch(updateCardASYNCStart("EDITDESC"));
  const newCard = { ...card, ...update };
  const boardId = getState().board.boardData.pageBoardId;
  try {
    const response = await fetch(`${API_BASE_URL}/cards/${boardId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newCard)
    });

    const updatedCard = await response.json();
    dispatch(updateCardASYNCSuccess("EDITDESC", updatedCard));
    dispatch(
      createNewActivityASYNC({
        text: `changed card **${card.title.trim()}**'s description from **${card.description.trim()}** to **${updatedCard.description.trim()}**`,
        cardId: card._id
      })
    );
  } catch (err) {
    dispatch(updateCardASYNCFailure("EDITDESC"));
  }
};
