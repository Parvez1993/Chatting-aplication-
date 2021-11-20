import { combineReducers } from "redux";
import { SET_USER } from "../actions/type";

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
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: user_reducer,
});
