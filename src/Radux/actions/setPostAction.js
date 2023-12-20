import axios from "axios"

export const SET_ALL_POST = 'SET_ALL_POST'
const setPostAction = (title, description, formattedTags) => {
    return async(dispatch) => {
        try{
            const response = await axios.post('http://localhost:3001/savepost', {
                title,
                description,
                ...formattedTags,
              });
            if(response) {
                return dispatch({
                    type: SET_ALL_POST,
                    payload: response.data
                })
            }
        } catch(error) {
            throw error;
        }
    }
}

export default setPostAction;