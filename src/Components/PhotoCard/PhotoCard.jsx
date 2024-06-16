import React, {useContext} from 'react';
import styles from './PhotoCard.module.css';
import PhotoPinner from "../PhotoPinner/PhotoPinner.jsx";
import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";
import classNames from 'classnames';

function PhotoCard({ photo, className, hidePinButton }) {

    const {error, isTopicPage} = useContext(PinnedPhotosContext);

    return (
        <div className={classNames(styles['photo-card-inner-container'], {[styles[className]]: className})}>
            <div className={styles['photo-card-image-container']}>
                <img className={styles['photo-card-image']}
                     src={photo.urls && photo.urls.small ? photo.urls.small : photo.url} alt={photo.alt_description}/>
                {!hidePinButton && <PhotoPinner photo={photo} isTopicPage={isTopicPage}/>}
            </div>
            {className !== "photo-card-contact" && (
                <div className={styles['photo-card-info']}>
                    <p>{photo.user && "Photo from Unsplashed user: "} </p>
                    <b> {photo.user ? photo.user.username : photo.username}</b>
                    {error && <p>{error}</p>}
                </div>
            )}
        </div>
    );
}

export default PhotoCard;