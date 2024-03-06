import axios from "axios"
import { baseUrl } from "../../apiConstant"

export const SET_ALL_POST = 'SET_ALL_POST'
const setPostAction = ( userId, userName, title, description, tags) => {
    console.log(tags, 'tagsmyhand')
    return async(dispatch) => {
        try{
            const response = await axios.post(`${baseUrl}/savepost`, {
                userId,
                userName,
                title,
                description,
                tags,
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