import backendEndpoint from "./backendEndpoint.js";
import apiHandler from "../apiHelpers/apiHandler.js";

async function getUserInfoField() {

           try {
               const { data: userInfo, error } = await apiHandler(
                   backendEndpoint,
                   'get',
                   '/users/{username}/info'
               );

               if (error) {
                   throw new Error(error);
               }

               if (!userInfo) {
                   throw new Error('User info is null');
               }

               return userInfo;
           } catch (error) {
               return error;
           }
}

export default getUserInfoField;