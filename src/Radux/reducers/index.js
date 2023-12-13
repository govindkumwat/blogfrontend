// reducers/index.js
import { combineReducers } from "redux";
import fetchPostReducers from "./fetchPosts";

export default combineReducers({
  fetchPostReducers,
});