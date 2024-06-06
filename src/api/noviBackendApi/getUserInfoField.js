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
                   throw new Error(`Error in getUserInfoField: ${error}`);
               }
               return userInfo;
           } catch (error) {
               throw new Error(`Error in getUserInfoField: ${error.message}`);
           }
}

export default getUserInfoField;