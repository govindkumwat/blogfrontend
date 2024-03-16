// get top post list action 

import axios from 'axios';

import { baseUrl } from "../../apiConstant";

export const SET_POST_VIEW = 'GET_POST_VIEW';

const setPageView = (detailPost, totalPageView) => {
    return async(dispatch) => {
        try{
                const response = detailPost?._id && await axios.put(`${baseUrl}/setPostView`,{
                    postId: detailPost?._id,
                totalPageView: detailPost?.postView + 1
            })
            if(response?.status == 200) {
                return dispatch({
                    type: SET_POST_VIEW,
                    payload: response?.data
                })
            }
        } catch(error) {
            throw error;
        }
    }
}

export default setPageView;



