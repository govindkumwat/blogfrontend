// reducers/fetchPosts.js
const initialState = {
    postdata: [],
    isLoading: false,
    error: null,
  };
  
  const ActionTypes = {
    FETCH_POST_SUCCESS: "FETCH_POST_SUCCESS",
    FETCH_POST_FAILURE: "FETCH_POST_FAILURE",
    LOADING_DATA: "LOADING_DATA",
    FETCH_POST_REQUEST: "FETCH_POST_REQUEST",
  };
  const fetchPostReducers = (state = initialState, action) => {
    switch (action) {
      case ActionTypes.FETCH_POST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          postdata: action.payload,
        };
      case ActionTypes.FETCH_POST_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case ActionTypes.LOADING_DATA:
        return {
          ...state,
          isLoading: true,
        };
      case ActionTypes.FETCH_POST_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      default:
        return state;
    }
  };
  
  export default fetchPostReducers;
  