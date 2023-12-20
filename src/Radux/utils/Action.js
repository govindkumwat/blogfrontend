import axios from "axios";
function getHeaders() {
    const auth_token = window.localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
    };
}
function getToken() {
    return window.localStorage.getItem("token");
}

export const getApiCall = async (url, params = null) => {
    try {
        const token = getToken();
        axios.defaults.baseURL = 'http://localhost:3001/';
        if (navigator.onLine) {
            if (token) {
                return await axios.get(url, {
                    params: params,
                    headers: getHeaders(),
                });
            } else {
                // console.log("Kindly re-login as your session is expired.");
            }
        } else {
            console.log("You are offline kindly try after some time.");
        }
    } catch (error) {
        if (error?.response?.data?.status === 401) {
            localStorage.clear();
            window.location.reload(true);
            
        } else {
            // console.log(error?.response?.data?.message);
        }
        return error?.response;
    }
};

export const postApiCall = async (endPointURL, data, params = null) => {
    try {
        axios.defaults.baseURL = 'http://localhost:3001';
        if (navigator.onLine) {
            return await axios.post(endPointURL, data, {
                params: params,
                 headers: getHeaders(),
            });
        } else {
            console.log("You are offline kindly try after some time.");
        }
    } catch (error) {
        if (error?.response?.data?.status === 401) {
            localStorage.clear();
            window.location.reload(true);
            console.log("Kindly re-login as your session is expired.");
        } else {
            console.log(error?.response?.data?.message);
        }
        return error?.response;
    }
};

export const deleteApiCall = async (
    endPointURL,
    params = null,
    data = null
) => {
    try {
        axios.defaults.baseURL = 'http://localhost:3001';
        return await axios.delete(endPointURL, {
            params: params,
            headers: getHeaders(),
            data: data,
        });
    } catch (error) {
        if (error?.response?.data?.status === 401) {
            localStorage.clear();
            window.location.reload(true);
            console.log("Kindly re-login as your session is expired.");
        } else {
            // toast.error(error?.response?.data?.message);
        }
        return error?.response;
    }
};

export const putApiCall = async (endPointURL, data) => {
    try {
        axios.defaults.baseURL = 'http://localhost:3001';
        return await axios.put(endPointURL, data, {
            headers: getHeaders(),
        });
    } catch (error) {
        if (error?.response?.data?.status === 401) {
            localStorage.clear();
            window.location.reload(true);
            console.log("Kindly re-login as your session is expired.");
        } else {
            console.log(error?.response?.data?.message);
        }
        return error?.response;
    }
};