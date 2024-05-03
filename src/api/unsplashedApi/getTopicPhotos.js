import unsplashedEndpoint from './unsplashedEndpoint.js';
import apiHandler from "../apiHelpers/apiHandler.js";

export async function getTopicPhotos(topicId, perPage) {
    const response = await apiHandler(
        unsplashedEndpoint,
        'get',
        `/topics/${topicId}/photos`,
        null,
        'json',
        {
            params: {
                per_page: perPage,
            }
        }
    );
    return response.data;
}