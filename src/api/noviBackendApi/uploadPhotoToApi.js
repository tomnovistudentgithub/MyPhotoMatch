import backendEndpoint from "./backendEndpoint.js";
import apiHandler from "../apiHelpers/apiHandler.js";

async function uploadPhotoToApi(username, formData) {
    console.log('uploadPhotoToApi username:', username);
    console.log('uploadPhotoToApi formData:', formData);

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