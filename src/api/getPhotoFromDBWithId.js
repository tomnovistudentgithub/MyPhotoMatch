
import unsplashedEndpoint from "./unsplashedApi/unsplashedEndpoint.js";
import responseOk from "./apiHelpers/responseOk.js";

export default async function getPhotoFromDBWithId(id) {

    try {
        const response = await unsplashedEndpoint.get(`/photos/${id}`);

        if (responseOk(response.status)) {
            return response.data;
        } else {
            throw new Error(`Failed to fetch photo with ID ${id}: ${response.status}, possibly due to the rate limit`)
        }
    } catch (error) {
        throw error;
    }
}
