import backendEndpoint from "./backendEndpoint.js";
import axios from "axios";
import apiHandler from "../apiHelpers/apiHandler.js";


async function downloadPhotoFromApi(username) {

    const {data: photoData, error} = await apiHandler(
        backendEndpoint,
        'get',
        `/users/${username}/download`,
        null,
        'blob'
    )

    if (!photoData) {
        throw new Error('Failed to download photo, please check whether the user exists');
    }

    const photoUrl = URL.createObjectURL(photoData);
    const a = document.createElement('a');

    a.style.display = 'none';
    document.body.appendChild(a);
    a.href = photoUrl;
    a.download = 'photo.jpg';
    a.click();

    URL.revokeObjectURL(photoUrl);
    document.body.removeChild(a);

    return photoUrl;
}

export default downloadPhotoFromApi;