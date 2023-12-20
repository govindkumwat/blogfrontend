import * as Actions from "../actions/setPostAction";

const initialState = {
    data: []
};

const setPostReducers = (state = initialState, action) => {
    switch (action?.type) {
        case Actions.SET_ALL_POST: {
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

export default setPostReducers;