import React, {useCallback, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PinnedPhotosContext from '../../contexts/PinnedPhotoContext';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faBan } from '@fortawesome/free-solid-svg-icons';
import styles from './PhotoPinner.module.css';
import Button from "../Button/Button.jsx";

function PhotoPinner({ photo, isTopicPage }) {
    const { pinnedPhotos, togglePinPhoto } = useContext(PinnedPhotosContext);
    const { isLoggedIn } = useContext(AuthContext);
    const [isPhotoPinned, setIsPhotoPinned] = useState(false);
    const navigate = useNavigate();
    const pinButtonContainerClass = isTopicPage ? styles['pinButtonContainerTopic'] : styles['pinButtonContainer'];


    const handlePinPhoto = useCallback(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            togglePinPhoto(photo);
        }
    }, [isLoggedIn, navigate, photo, togglePinPhoto]);

    const handleUnpinPhoto = useCallback(() => {
        console.log('handleUnpinPhoto called with photo:', photo);
        togglePinPhoto(photo);

    }, [photo, togglePinPhoto]);

    useEffect(() => {
        const isPinnedInDB = pinnedPhotos.some(pinnedPhoto => pinnedPhoto.id === photo.id);
        setIsPhotoPinned(isPinnedInDB);
    }, [photo.id, pinnedPhotos]);


    return (
        <div className={pinButtonContainerClass}>
            {isPhotoPinned ? (
                <Button onClick={handleUnpinPhoto}><FontAwesomeIcon icon={faBan}/> Unpin</Button>
            ) : (
                <Button onClick={handlePinPhoto}><FontAwesomeIcon icon={faThumbtack}/> Pin</Button>
            )}
        </div>
    );
}

export default PhotoPinner;