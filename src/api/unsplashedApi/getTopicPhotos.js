import unsplashedEndpoint from './unsplashedEndpoint.js';

export async function getTopicPhotos(topicId, perPage) {
    try {
        const response = await unsplashedEndpoint.get(`topics/${topicId}/photos`, {
            params: {
                per_page: perPage,
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        if (error.response && error.response.status === 403 && error.response.data === 'Rate Limit Exceeded') {
            throw new Error('Rate limit exceeded. Please try again later.');
        } else {
            throw error;
        }
    }
}