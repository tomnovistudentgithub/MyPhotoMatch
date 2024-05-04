import responseOk from "../apiHelpers/responseOk.js";
import handleError from "../apiHelpers/handleError.js";
import getUserFromTokenAndPassToken from "../../helpers/getUserFromTokenAndPassToken.js";
import checkTokenValidity from "../../helpers/checkTokenValidity.js";

async function apiHandler(axiosInstance, method, endpoint, data = null, responseType = 'json', headers = {} ) { // token
    let url = endpoint;
    let token = null;
    let username = null;

    if (!axiosInstance.defaults.baseURL.includes('https://api.unsplash.com')) {
        const result = getUserFromTokenAndPassToken();
        if (result) {
            token = result.token;
            username = result.username;
        }

        if (token && !checkTokenValidity(token)) {
            throw new Error('Token is not valid');
        }

        if (url.includes('{username}')) {
            if (!username) {
                throw new Error('Username is not available');
            }
            url = url.replace('{username}', username);
        }
    }

    const defaultHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    const mergedHeaders = {...defaultHeaders, ...headers};


    try {
        const response = await axiosInstance({ method, url, headers: mergedHeaders, data, responseType });

        if (responseOk(response.status)){
            if (responseType === 'blob') {
                return response;
            }
            return { data: response.data, error: null };

        } else {
            throw new Error('Server responded with a non-2xx status code');
        }

    } catch (error) {
        let errorMessage = handleError(error);
        return { data: null, error: errorMessage };
    }

}
export default apiHandler;