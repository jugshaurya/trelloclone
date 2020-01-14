import cardsActionTypes from "./cards.types";

const INITIAL_STATE = {
  cards: null,
  isFetchingCards: false,
  isCreatingCard: false,
  isUpdatingCardWhileDropping: false,
  isUpdatingCardWhileEditing: false,
  isUpdatingCardWhileUploading: false,
  isUpdatingCardWhileEditingDesc: false
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
    case cardsActionTypes.UPDATE_CARD_WHEN_DROP_START:
      return { ...state, isUpdatingCardWhileDropping: true };
    case cardsActionTypes.UPDATE_CARD_WHEN_DROP_FAILURE:
      return { ...state, isUpdatingCardWhileDropping: false };
    case cardsActionTypes.UPDATE_CARD_WHEN_DROP_SUCCESS:
      return {
        ...state,
        isUpdatingCardWhileDropping: false,
        cards: state.cards.map(card =>
          card._id === action.payload._id ? action.payload : card
        )
      };

    case cardsActionTypes.UPDATE_CARD_WHEN_EDIT_START:
      return { ...state, isUpdatingCardWhileEditing: true };
    case cardsActionTypes.UPDATE_CARD_WHEN_EDIT_FAILURE:
      return { ...state, isUpdatingCardWhileEditing: false };
    case cardsActionTypes.UPDATE_CARD_WHEN_EDIT_SUCCESS:
      return {
        ...state,
        isUpdatingCardWhileEditing: false,
        cards: state.cards.map(card =>
          card._id === action.payload._id ? action.payload : card
        )
      };

    case cardsActionTypes.UPDATE_CARD_WHEN_UPLOADIMAGE_START:
      return { ...state, isUpdatingCardWhileUploading: true };
    case cardsActionTypes.UPDATE_CARD_WHEN_UPLOADIMAGE_FAILURE:
      return { ...state, isUpdatingCardWhileUploading: false };
    case cardsActionTypes.UPDATE_CARD_WHEN_UPLOADIMAGE_SUCCESS:
      return {
        ...state,
        isUpdatingCardWhileUploading: false,
        cards: state.cards.map(card =>
          card._id === action.payload._id ? action.payload : card
        )
      };

    case cardsActionTypes.UPDATE_CARD_WHEN_EDITDESC_START:
      return { ...state, isUpdatingCardWhileEditingDesc: true };
    case cardsActionTypes.UPDATE_CARD_WHEN_EDITDESC_FAILURE:
      return { ...state, isUpdatingCardWhileEditingDesc: false };
    case cardsActionTypes.UPDATE_CARD_WHEN_EDITDESC_SUCCESS:
      return {
        ...state,
        isUpdatingCardWhileEditingDesc: false,
        cards: state.cards.map(card =>
          card._id === action.payload._id ? action.payload : card
        )
      };
    default:
      return state;
  }
};

export default cardsReducer;
