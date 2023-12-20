// reducer.js

import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
  } from './ActionTypes';
  
  const initialState = {
    isLoading: false,
    user: null,
    error: null,
  };
  
  const signupReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        return {
          ...state,
          isLoading: true,
          user: null,
          error: null,
        };
  
      case SIGNUP_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          error: null,
        };
  
      case SIGNUP_FAILURE:
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
  
  export default signupReducer;
  