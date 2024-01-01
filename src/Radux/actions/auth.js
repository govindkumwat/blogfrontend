
import axios from 'axios';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_ACTION
} from '../ActonTypes';
import { getApiCall, postApiCall } from '../utils/Action';
import { toast } from 'react-hot-toast';
import { baseUrl } from '../../apiConstant';

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
    axios.post(`${baseUrl}/signup`,  name, username, email, password)
      .then((response) => {
        console.log(response)
        if(response.status == 201) {
          toast.success('Signup Success, Login with your Credentials')
        } else {
          toast.error(response.message)
        }
       
        // Dispatch the signup success action with the received data
        dispatch(signupSuccess(response.data));
      })
      .catch((error) => {
        toast.error("Somthing went wrong, Try again!")
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
  
      axios.post(`${baseUrl}/login`, credentials)
        .then((response) => {
          toast.success('Login Success')
        if(response) {
            localStorage.setItem('token', response.data.token)
            dispatch(loginSuccess(response.data));
        }
         
        })
        .catch((error) => {
          toast.error('Invalid Credentials')
          dispatch(loginFailure(error.message));
        });
    };
  };

  export const userDetails = () => {
    return (dispatch) => {
      getApiCall(`${baseUrl}/user-details`)
        .then((response) => {
            console.log(response.data, 'res')
        if(response) {
            dispatch(loginSuccess(response));
            if(response.status == 401) {
              localStorage.removeItem('token')
            }
        }
         
        })
        .catch((error) => {
          dispatch(loginFailure(error.message));
          localStorage.removeItem('token')
        });
    };
  };

  export const performLogOutAction = (history) => {
    return async (dispatch) => {
        try {
            await postApiCall("/logout");
            localStorage.clear();
            window.history.pushState([], [], window.location.href);
            window.onpopstate = function (event) {
                history.go(0);
            };
            dispatch({ type: LOGOUT_ACTION });
        } catch (error) {
            throw error;
        }
    };
};