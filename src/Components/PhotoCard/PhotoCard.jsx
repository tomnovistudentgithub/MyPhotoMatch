import React, {useContext} from 'react';
import styles from './PhotoCard.module.css';
import PhotoPinner from "../PhotoPinner/PhotoPinner.jsx";
import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";

function PhotoCard({ photo }) {

    const {error} = useContext(PinnedPhotosContext);
    const { isTopicPage } = useContext(PinnedPhotosContext);


    return (
        <div className={styles['photo-card-inner-container']}>
            <div className={styles['photo-card-image-container']}>
                <img className={styles['photo-card-image']} src={photo.urls.small} alt={photo.alt_description}/>
                <PhotoPinner photo={photo} isTopicPage={isTopicPage}/>
            </div>
            <div className={styles['photo-card-info']}>
                <p>{photo.user && "Photo from Unsplashed user: "} </p>
                <b> {photo.user.username}</b>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default PhotoCard;