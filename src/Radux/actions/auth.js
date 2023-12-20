
import axios from 'axios';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../ActonTypes';
import { postApiCall } from '../utils/Action';

const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

const signupSuccess = (userData) => ({
  type: SIGNUP_SUCCESS,
  payload: userData,
});

const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

const loginRequest = () => ({
    type: LOGIN_REQUEST,
  });
  
  const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData,
  });
  
  const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
  });

export const signup = (name, username, email, password) => {
  return (dispatch) => {
    // Dispatch the signup request action
    dispatch(signupRequest());

    // Make the API call to signup
    axios.post('http://localhost:3001/signup',  name, username, email, password)
      .then((response) => {
        // Dispatch the signup success action with the received data
        dispatch(signupSuccess(response.data));
      })
      .catch((error) => {
        // Dispatch the signup failure action with the error
        dispatch(signupFailure(error.message));
      });
  };
  
};

export const login = (credentials) => {
    return (dispatch, getState) => {
        const currentState = getState();
        console.log(currentState);
      dispatch(loginRequest());
  
      postApiCall('/login', credentials)
        .then((response) => {
            console.log(response.data, 'res')
        if(response) {
            localStorage.setItem('token', response.data.token)
            dispatch(loginSuccess(response.data));
        }
         
        })
        .catch((error) => {
          dispatch(loginFailure(error.message));
        });
    };
  };
