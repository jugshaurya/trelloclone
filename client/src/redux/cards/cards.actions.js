import cardsActionTypes from "./cards.types";

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
  const boardId = getState().board.boardData.board._id;
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
  const boardId = getState().board.boardData.board._id;
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
  } catch (err) {
    dispatch(createCardASYNCFailure());
  }
};

// ============= CREATE A CARD END =========================
