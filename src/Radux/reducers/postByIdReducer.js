import * as Actions from "../actions/postById";

const initialState = {
    data: []
};

const postByIdReducer = (state = initialState, action) => {
    switch (action?.type) {
        case Actions.GET_POST_BY_ID: {
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

export default postByIdReducer;