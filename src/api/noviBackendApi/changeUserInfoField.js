import backendEndpoint from "./backendEndpoint.js";
import apiHandler from "../apiHelpers/apiHandler.js";

async function changeUserInfoField(ids) {

    return await apiHandler(
        backendEndpoint,
        'put',
        '/users/{username}',
        {info: JSON.stringify(ids)},
    )

}
export default changeUserInfoField;