import backendEndpoint from "./backendEndpoint.js";
import getUserFromTokenAndPassToken from "../../helpers/getUserFromTokenAndPassToken.js";

import checkTokenValidity from "../../helpers/checkTokenValidity.js";

async function changeUserInfoField(ids) {
    const userAndToken = getUserFromTokenAndPassToken();
    const userName = userAndToken.username;
    const token = userAndToken.token;
    console.log('ids:', ids);

    const isTokenValid = checkTokenValidity();
    console.log('isTokenValid:', isTokenValid);


    try {
        console.log(`Sending PUT request to /users/${userName} with token ${token}`);
        const responsePut = await backendEndpoint.put(`/users/${userName}`, { info: JSON.stringify(ids) }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (responsePut.status >= 200 && responsePut.status < 300) {
            console.log('User put info updated successfully');

        }

    } catch (error) {
        if (error.response) {
            console.error(`HTTP error status: ${error.response.status}`);
            console.log('Error message:', error.response.data);
            console.log('Error response:', error.response);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error', error.message);
        }
    }
}
export default changeUserInfoField;