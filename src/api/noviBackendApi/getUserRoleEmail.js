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

            if (error) {
                throw new Error(error);
            }

            if (!userInfo) {
                throw new Error('User info is null');
            }

            return {
                username: userInfo.username,
                userRole: userInfo.authorities[0].authority,
                email: userInfo.email
            };

        } catch (error) {
            return null;
        }
}

export default getUserRoleEmail;