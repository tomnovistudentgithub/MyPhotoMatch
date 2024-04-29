import getUserFromTokenAndPassToken from "../../helpers/getUserFromTokenAndPassToken.js";
import backendEndpoint from "./backendEndpoint.js";
import checkTokenValidity from "../../helpers/checkTokenValidity.js";


async function getUserInfoField({ username, token } = {}) {
    if (!username || !token) {
        const result = getUserFromTokenAndPassToken();

        if (result) {
            username = result.username;
            token = result.token;
        }
    }

    const isTokenValid = checkTokenValidity();
    console.log('isTokenValid:', isTokenValid);

    if (username && token) {
        try {
            const response = await backendEndpoint.get(`/users/${username}/info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status >= 200 && response.status < 300) {
                const userInfo = response.data;
                console.log('userInfoField a:', userInfo);
                return userInfo;
            } else {
                throw new Error('Error getting user info');
            }
        } catch (error) {
            console.error('Error getting user info:', error);
            return null;
        }
    }
    return null;
}
export default getUserInfoField;