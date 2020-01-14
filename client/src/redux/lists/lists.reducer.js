import listsActionTypes from "./lists.types";

const INITIAL_STATE = {
  lists: null,
  isFetchingLists: false,
  isCreatingList: false,
  isDeletingList: false
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

    case listsActionTypes.DELETE_LIST_START:
      return { ...state, isDeletingList: true };
    case listsActionTypes.DELETE_LIST_FAILURE:
      return { ...state, isDeletingList: false };
    case listsActionTypes.DELETE_LIST_SUCCESS:
      return {
        ...state,
        isDeletingList: false,
        lists: state.lists.filter(list => list._id !== action.payload._id)
      };

    default:
      return { ...state };
  }
};

export default listsReducer;
