import { combineReducers } from "redux";
import getPostReducers from "./getPostReducers";
import setPostReducers from "./setPostReducers";
import loginReducer from "./loginReducers";
import postByIdReducer from "./postByIdReducer";

const createReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    getPostReducers,
    setPostReducers,
    loginReducer,
    postByIdReducer,
    ...asyncReducers
  });

  return (state, action) => {
    if (action.type === 'LOGOUT_ACTION') {
      // Clear only the login-related state
      state = {
        getPostReducers: state.getPostReducers,
        setPostReducers: state.setPostReducers,
        loginReducer: undefined, // Clear login state
        postByIdReducer: state.postByIdReducer,
        ...asyncReducers
      };
    }

    return appReducer(state, action);
  };
};

export default createReducer;
