import sortTagCountsDescending from "./sortTagCountsDescending.js";

function countTagsInPhotos(photos) {

    const tagCounts = {};
    photos.forEach(photo => {
        photo.tags.forEach(tag => {
            const tagTitle = tag.title;
            if (tagCounts[tagTitle]) {
                tagCounts[tagTitle]++;
            } else {
                tagCounts[tagTitle] = 1;
            }
        });
    });

    return sortTagCountsDescending(tagCounts);
}

export default countTagsInPhotos;