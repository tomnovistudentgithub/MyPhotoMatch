import backendEndpoint from "./backendEndpoint.js";
import getUserFromTokenAndPassToken from "../../helpers/getUserFromTokenAndPassToken.js";
import checkTokenValidity from "../../helpers/checkTokenValidity.js";
import apiHandler from "../apiHelpers/apiHandler.js";

async function getUserRoleEmail() {

        try {
            const { data: userInfo, error } = await apiHandler(
                backendEndpoint,
                'get',
                '/users/{username}'
            );

            if (userInfo) {
                return {
                    username: userInfo.username,
                    userRole: userInfo.authorities[0].authority,
                    email: userInfo.email
                };
            } else {
                throw new Error('Error getting user info');
            }
        } catch (error) {
            return null;
        }
}

export default getUserRoleEmail;