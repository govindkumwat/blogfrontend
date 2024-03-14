// get top post list action 

import axios from 'axios';

import { baseUrl } from "../../apiConstant";

export const GET_TOP_POST_LIST = 'GET_TOP_POST_LIST';

const getTopPostList = () => {
    return async(dispatch) => {
        try{
            const response =  await axios.get(`${baseUrl}/toppost`)
            if(response.status == 200) {
                return dispatch({
                    type: GET_TOP_POST_LIST,
                    payload: response?.data
                })
            }
        } catch(error) {
            throw error;
        }
    }
}

export default getTopPostList;



