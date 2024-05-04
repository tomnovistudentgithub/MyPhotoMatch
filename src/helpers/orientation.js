export function photoOrientation(photos) {

    return photos.map(photo => {
        const aspectRatio = photo.width / photo.height;
        let orientation = '';
        if (aspectRatio > 1) {
            orientation = 'landscape';
        } else if (aspectRatio < 1) {
            orientation = 'portrait';
        } else {
            orientation = 'square';
        }
        return {...photo, orientation};
    });
}

export const isPortrait = (width, height) => {
    return height > width;
};

export const isLandscape = (width, height) => {
    return width > height;
};

export function classifyTopicsByOrientation(topicData) {
    const portraitTopics = topicData.filter(topic =>
        topic.cover_photo &&
        isPortrait(topic.cover_photo.width, topic.cover_photo.height)
    );

    const landscapeTopics = topicData.filter(topic =>
        topic.cover_photo &&
        isLandscape(topic.cover_photo.width, topic.cover_photo.height)
    );

    return { portraitTopics, landscapeTopics };
}