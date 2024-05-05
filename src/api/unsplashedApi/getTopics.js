import unsplashedEndpoint from './unsplashedEndpoint.js';
import apiHandler from "../apiHelpers/apiHandler.js";

export const getTopics = async (itemsPerPage) => {
        const response = await apiHandler(
            unsplashedEndpoint,
            'get',
            `/topics?per_page=${itemsPerPage}`,
            null,
            'json',
            {
            }

        );
    if (response.error) {
        throw new Error(response.error);
    }
        return response.data
}



