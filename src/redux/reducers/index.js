import { combineReducers } from "redux";
import { REMOVE_USER, SET_USER } from "../actions/type";

const initialState = {
  currentUser: null,
  isLoading: true,
};
const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case REMOVE_USER:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: user_reducer,
});
