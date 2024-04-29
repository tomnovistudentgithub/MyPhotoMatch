import axios from 'axios';
import unsplashedEndpoint from "./unsplashedApi/unsplashedEndpoint.js";

export default async function getPhotoFromDBWithId(id) {


    try {
        const response = await unsplashedEndpoint.get(`/photos/${id}`);
        if (response.status >= 200 && response.status < 300) {
            console.log(`Fetched photo with ID ${id}:`, response.data);
            return response.data;
        } else {
            console.error(`Failed to fetch photo with ID ${id}: status ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error(`Failed to fetch photo with ID ${id}:`, error);
        return null;
    }
}
