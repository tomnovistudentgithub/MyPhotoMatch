import backendEndpoint from "./backendEndpoint.js";
import axios from "axios";


async function downloadPhotoFromApi(username) {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token provided');
    }


    try {
        const response = await backendEndpoint.get(`/users/${username}/download`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'blob' //
        });

        console.log('Response:', response);
        const photoData = response.data;
        console.log('Photo Data:', photoData);  const photoBlob = new Blob([photoData], {type: 'image/jpeg'});
        const photoUrl = URL.createObjectURL(photoBlob);
        console.log('Photo URL:', photoUrl);

        const a = document.createElement('a');
        a.style.display = 'none';
        document.body.appendChild(a);

        a.href = photoUrl;
        a.download = 'photo.jpg';

        a.click();

        URL.revokeObjectURL(photoUrl);
        document.body.removeChild(a);

        return photoUrl;
    } catch (error) {
        console.error('Error downloading photo:', error);

        throw error;
    }
}

export default downloadPhotoFromApi;