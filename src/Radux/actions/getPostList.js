import axios from "axios"
import { getApiCall } from "../utils/Action"
import { baseUrl } from "../../apiConstant"

export const GET_ALL_POST = 'GET_ALL_POST'
const getPostList = (page, search, tags) => {
    return async(dispatch) => {
        try{
            const response =  await axios.get(`${baseUrl}/posts?page=${page}&search=${search}&tags=${tags}`)
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