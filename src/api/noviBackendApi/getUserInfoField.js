import backendEndpoint from "./backendEndpoint.js";
import apiHandler from "../apiHelpers/apiHandler.js";

async function getUserInfoField() {

           try {
               const { data: userInfo, error } = await apiHandler(
                   backendEndpoint,
                   'get',
                   '/users/{username}/info'
               );

               if (userInfo) {
                   return userInfo;
               } else {
                   throw new Error('Error getting user info');
               }
        } catch (error) {
            return null;
        }
    }

export default getUserInfoField;