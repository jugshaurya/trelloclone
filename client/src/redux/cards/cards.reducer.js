import cardsActionTypes from "./cards.types";

const INITIAL_STATE = {
  cards: null,
  isFetchingCards: false,
  isCreatingCard: false
};

const cardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cardsActionTypes.GET_ALL_CARDS_IN_BOARD_START:
      return { ...state, isFetchingCards: true, cards: null };
    case cardsActionTypes.GET_ALL_CARDS_IN_BOARD_SUCCESS:
    case cardsActionTypes.GET_ALL_CARDS_IN_BOARD_FAILURE:
      return { ...state, isFetchingCards: false, cards: action.payload };

    case cardsActionTypes.CREATE_CARD_START:
      return { ...state, isCreatingCard: true };
    case cardsActionTypes.CREATE_CARD_FAILURE:
      return { ...state, isCreatingCard: false };
    case cardsActionTypes.CREATE_CARD_SUCCESS:
      return {
        ...state,
        isCreatingCard: false,
        cards: [...state.cards, action.payload]
      };

    default:
      return { ...state };
  }
};

export default cardsReducer;
