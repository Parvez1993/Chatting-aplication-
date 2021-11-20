import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./index";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

export default store;
