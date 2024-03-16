import * as Actions from "../actions/setPageViewAction";

const initialState = {
    data: []
};

const postByIdReducer = (state = initialState, action) => {
    switch (action?.type) {
        case Actions.GET_POST_VIEW: {
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