import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import boardReducer from "./board/board.reducer";
import boardsReducer from "./boards/boards.reducer";
import listsReducer from "./lists/lists.reducer";
import cardsReducer from "./cards/cards.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardsReducer,
  board: combineReducers({
    boardData: boardReducer,
    boardLists: listsReducer,
    boardCards: cardsReducer
  })
});

export default rootReducer;
