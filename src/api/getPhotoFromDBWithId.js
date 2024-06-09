
import unsplashedEndpoint from "./unsplashedApi/unsplashedEndpoint.js";

export default async function getPhotoFromDBWithId(id) {

    try {
        const response = await unsplashedEndpoint.get(`/photos/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

