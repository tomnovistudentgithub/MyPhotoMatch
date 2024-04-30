import React, { useContext, useEffect } from 'react';

import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import styles from '../MyPins/MyPins.module.css';
import MostChosenTags from "../../Components/MostChosenTags.jsx"; 
import PhotoPinner from "../../Components/PhotoPinner/PhotoPinner.jsx";
function MyPins () {
    const { isLoggedIn } = useContext(AuthContext);
    const { tagCounts, pinnedPhotos } = useContext(PinnedPhotosContext);
    const navigate = useNavigate();



    return (
        <div className={styles['my-pins-container']}>
            {pinnedPhotos.length > 0 ? (
                <>
                    <h1 className={styles['my-pins-h1-pinned']}>My Pinned Photos</h1>
                    <div className={styles['grid-container']}>
                        {pinnedPhotos.map((photo, index) => (
                            <div key={photo.id} className={`${styles['grid-item']} ${styles[`grid-item-${index}`]}`}>
                                <img src={photo.url} alt={photo.alt_description}/>
                                <div className={styles['pinButtonContainer']}>
                                    <PhotoPinner photo={photo}/>
                                </div>
                                <p>{photo.username}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles['mypins-tag-container']}>
                        <MostChosenTags tagCounts={tagCounts}/>
                        <h1 className={styles['my-pins-h1-tagcounts']}>Tag counts</h1>
                    </div>
                </>

            ) : (
                <p className={styles['no-pins-p']}>Please start pinning more items and return to this page to see your pins. </p>
            )}
        </div>
    );
}

export default MyPins;