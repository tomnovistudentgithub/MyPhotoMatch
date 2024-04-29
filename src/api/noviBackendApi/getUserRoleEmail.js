import backendEndpoint from "./backendEndpoint.js";
import getUserFromTokenAndPassToken from "../../helpers/getUserFromTokenAndPassToken.js";
import checkTokenValidity from "../../helpers/checkTokenValidity.js";

async function getUserRoleEmail({ username, token } = {}) {
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
            const response = await backendEndpoint.get(`/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status >= 200 && response.status < 300) {
                const userInfo = response.data;
                console.log('userInfo a:', userInfo);

                return {
                    username: userInfo.username,
                    userRole: userInfo.authorities[0].authority,
                    email: userInfo.email
                };
            } else {
                throw new Error('Error getting user info');
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                throw new Error('Rate limit exceeded, please try again later.');
            }
            console.error('Error getting user info:', error);
            return null;
        }
    }
    return null;
}

export default getUserRoleEmail;