import unsplashedEndpoint from './unsplashedEndpoint.js';

export const getTopic = async (topicId) => {
    const response = await unsplashedEndpoint.get(`/topics/${topicId}`);
    console.log("getTopic: ", response.data);
    return response.data;
}