import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinnedPhotosContext from '../../contexts/PinnedPhotoContext';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faBan } from '@fortawesome/free-solid-svg-icons';
import styles from './PhotoPinner.module.css';

function PhotoPinner({ photo }) {
    const { pinnedPhotos, setPinnedPhotos, togglePinPhoto } = useContext(PinnedPhotosContext);
    const { isLoggedIn } = useContext(AuthContext);
    const [isPhotoPinned, setIsPhotoPinned] = useState(false);
    const navigate = useNavigate();

    const handlePinPhoto = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            togglePinPhoto(photo);
        }
    }

    const handleUnpinPhoto = () => {
        togglePinPhoto(photo);
    }

    useEffect(() => {
        const isPinnedInDB = pinnedPhotos.some(pinnedPhoto => pinnedPhoto.id === photo.id);
        setIsPhotoPinned(isPinnedInDB);
    }, [photo.id, pinnedPhotos]);


    return (
        <div className={styles.pinButtonContainer}>
            {isPhotoPinned ? (
                <button onClick={handleUnpinPhoto}><FontAwesomeIcon icon={faBan}/> Unpin</button>
            ) : (
                <button onClick={handlePinPhoto}><FontAwesomeIcon icon={faThumbtack}/> Pin</button>
            )}
        </div>
    );
}

export default PhotoPinner;