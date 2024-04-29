
import unsplashedEndpoint from './unsplashedEndpoint.js';
import countTagsInPhotos from "../../helpers/countTagsInPhotos.js";



export const getPhotos = async (page = 1) => {
    try {
        const response = await unsplashedEndpoint.get('/photos', {
            params: {
                page
            }
        });

        //de opgehaalde data bevat het ID dat gebruikt
        // kan worden voor het ophalen van de tags.
        // promise.all wordt gebruikt zodat de
        // calls parallel worden uitgevoerd
        // in plaats van stuk voor stuk zoals met await zou gebeuren.

        //TODO: getPhotoById is op twee plekken gedefinieerd in getPhotos.js en in pinnedPhotosProvider.jsx en
        const photoDetailsPromises = response.data.map(photo => getPhotoById(photo.id));
        const photosWithDetailsResponses = await Promise.all(photoDetailsPromises);


        const photosWithDetails = photosWithDetailsResponses.map(response => response.data);
        console.log(photosWithDetails);

        photosWithDetails.forEach(photo => {
            const photoUrl = photo.urls.regular;
            console.log(photoUrl);
        });

        console.log("photoswithdetails " + photosWithDetails);

        return photosWithDetails;
    } catch (error) {
        console.log(error.response);
        throw error;
    }
};


//TODO: getPhotoById is op twee plekken gedefinieerd in getPhotos.js en in
export const getPhotoById = async (id) => {
    try {
        const response = await unsplashedEndpoint.get(`/photos/${id}`);
        // console.log(response);
        return response;
    } catch (error) {
        // console.log(error.response);
        throw error;
    }
};


