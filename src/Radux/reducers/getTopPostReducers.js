import * as Actions from "../actions/getTopPostList";

const initialState = {
    data: []
};

const getTopPostReducers = (state = initialState, action) => {
    switch (action?.type) {
        case Actions.GET_TOP_POST_LIST: {
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

export default getTopPostReducers;