import { combineReducers } from "redux"
import getPostReducers from "./getPostReducers"
import setPostReducers from "./setPostReducers"
import loginReducer from "./loginReducers"

const createReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    getPostReducers,
    setPostReducers,
    loginReducer,
    ...asyncReducers
  })
  return (state, action) => {
    if(action.type == 'LOG_OUT'){
      state = {}
    }
    return appReducer(state, action)
  }
}

export default createReducer;