import backendEndpoint from "./backendEndpoint.js";
import checkTokenValidity from "../../helpers/checkTokenValidity.js";
import getToken from "../../helpers/getToken.js";
import apiHandler from "../apiHelpers/apiHandler.js";

async function uploadPhotoToApi(username, formData) {

     if (!formData) {
        throw new Error('No file provided');
    }

    const response = await apiHandler(
        backendEndpoint,
        'post',
        `/users/${username}/upload`,
        formData,
        'json',
        {
            'Content-Type': 'multipart/form-data',
            'Accept': '*/*'
        }
    );
    return response;
}

export default uploadPhotoToApi;