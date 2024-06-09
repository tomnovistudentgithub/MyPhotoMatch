
import unsplashedEndpoint from './unsplashedEndpoint.js';
import apiHandler from "../apiHelpers/apiHandler.js";

export const getPhotos = async (page = 1) => {
    const response = await apiHandler(
        unsplashedEndpoint,
        'get',
        '/photos',
        null,
        'json',

            {},
            { page }

    );
    if (response.error) {
        throw new Error(response.error);
    }

    //promises worden gebruikt om de calls parallel uti te voeren
    const photoDetailsPromises = response.data.map(photo => getPhotoById(photo.id));
    const photosWithDetailsResponses = await Promise.all(photoDetailsPromises);
    const photosWithDetails = photosWithDetailsResponses.map(response => response.data);
    return photosWithDetails;
};

export const getPhotoById = async (id) => {
    const photoById = await unsplashedEndpoint.get(`/photos/${id}`);
    return photoById;
};