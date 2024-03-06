import axios from "axios"
import { baseUrl } from "../../apiConstant"

export const DELETE_POST_BY_ID = 'DELETE_POST_BY_ID'
const deletePostById = (id) => {
    return async(dispatch) => {
        try{
            const response =  await axios.delete(`${baseUrl}/deletepost/${id}`)
            if(response.status == 200) {
                return dispatch({
                    type: DELETE_POST_BY_ID,
                    payload: response.data
                })
            }
        } catch(error) {
            throw error;
        }
    }
}

export default deletePostById;