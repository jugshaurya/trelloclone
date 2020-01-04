import listsActionTypes from "./lists.types";

const INITIAL_STATE = {
  lists: null,
  isFetchingLists: false,
  isCreatingList: false
};

const listsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case listsActionTypes.GET_ALL_LISTS_IN_BOARD_START:
      return { ...state, isFetchingLists: true, lists: null };
    case listsActionTypes.GET_ALL_LISTS_IN_BOARD_SUCCESS:
    case listsActionTypes.GET_ALL_LISTS_IN_BOARD_FAILURE:
      return { ...state, isFetchingLists: false, lists: action.payload };

    case listsActionTypes.CREATE_LIST_START:
      return { ...state, isCreatingList: true };
    case listsActionTypes.CREATE_LIST_FAILURE:
      return { ...state, isCreatingList: false };
    case listsActionTypes.CREATE_LIST_SUCCESS:
      return {
        ...state,
        isCreatingList: false,
        lists: [...state.lists, action.payload]
      };

    default:
      return { ...state };
  }
};

export default listsReducer;
