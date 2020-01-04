import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import boardReducer from "./board/board.reducer";
import boardsReducer from "./boards/boards.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
  boards: boardsReducer
});

export default rootReducer;
