import * as Actions from "../actions/getPostList";

const initialState = {
    data: []
};

const getPostReducers = (state = initialState, action) => {
    switch (action?.type) {
        case Actions.GET_ALL_POST: {
            return {
                ...state,
                data: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default getPostReducers;