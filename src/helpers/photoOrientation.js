import React from 'react';

function PhotoOrientation(photos) {

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

export default PhotoOrientation;