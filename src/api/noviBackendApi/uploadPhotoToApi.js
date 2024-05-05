import backendEndpoint from "./backendEndpoint.js";
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
    if (response.error) {
        throw new Error(response.error);
    }

    return response;
}


export default uploadPhotoToApi;