import { createStore, applyMiddleware } from "redux";

import rootReducer from "./rootReducer";

import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
