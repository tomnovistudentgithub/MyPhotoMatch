import axios from "axios";
import backendEndpoint from "./backendEndpoint.js";
import checkTokenValidity from "../../helpers/checkTokenValidity.js";
import getToken from "../../helpers/getToken.js";

async function uploadPhotoToApi(username, formData) {

    checkTokenValidity();
    const token = getToken();

    if (!token) {
        throw new Error('No token provided');
    }


    if (!formData) {
        throw new Error('No file provided');
    }

    try {
        const response = await backendEndpoint.post(`/users/${username}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log('Photo uploaded successfully');
        } else {
            console.log('Photo upload failed');
        }
        return response;
    } catch (error) {
        console.error('Error uploading photo:', error);
        throw error;
    }
}

export default uploadPhotoToApi;