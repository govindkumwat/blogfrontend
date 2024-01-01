import axios from "axios"
import { baseUrl } from "../../apiConstant"

export const GET_POST_BY_ID = 'GET_POST_BY_ID'
const postById = (id) => {
    return async(dispatch) => {
        try{
            const response =  await axios.get(`${baseUrl}/posts/${id}`)
            if(response.status == 200) {
                return dispatch({
                    type: GET_POST_BY_ID,
                    payload: response.data
                })
            }
        } catch(error) {
            throw error;
        }
    }
}

export default postById;