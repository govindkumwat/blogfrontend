import axios from "axios"

export const GET_ALL_POST = 'GET_ALL_POST'
const getPostList = () => {
    return async(dispatch) => {
        try{
            const response =  await axios(`http://localhost:3001/posts`)
            if(response.status == 200) {
                return dispatch({
                    type: GET_ALL_POST,
                    payload: response.data
                })
            }
        } catch(error) {
            throw error;
        }
    }
}

export default getPostList;