import unsplashedEndpoint from './unsplashedEndpoint.js';
import apiHandler from "../apiHelpers/apiHandler.js";

export const getTopic = async (topicId) => {
    const response = await apiHandler(
        unsplashedEndpoint,
        'get',
        `/topics/${topicId}`
    );
    return response.data;
}