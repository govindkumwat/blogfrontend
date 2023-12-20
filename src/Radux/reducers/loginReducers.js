// reducer.js

import * as ActionTypes from '../ActonTypes';

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        user: null,
        error: null,
      };

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };

    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default loginReducer;
