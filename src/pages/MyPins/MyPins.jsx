import React, { useContext } from 'react';
import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";
import styles from '../MyPins/MyPins.module.css';
import MostChosenTags from "../../Components/MostChosenTags/MostChosenTags.jsx";
import PhotoPinner from "../../Components/PhotoPinner/PhotoPinner.jsx";
import ScrollIndicator from "../../Components/ScrollIndicator/ScrollIndicator.jsx";
function MyPins () {

    const { tagCounts, pinnedPhotos, isTopicPage, error } = useContext(PinnedPhotosContext);

    if (error) {
        return <div className={styles['error-message']}>{error}</div>;
    }

    return (
        <main className={styles['my-pins-container']}>
            {pinnedPhotos.length > 0 ? (
                <>
                    <h1 className={styles['my-pins-h1-pinned']}>My Pinned Photos</h1>
                    <section className={styles['grid-container']}>
                        {pinnedPhotos.map((photo, index) => (
                            <div key={photo.id} className={`${styles['grid-item']} ${styles[`grid-item-${index}`]}`}>
                                <img src={photo.url} alt={photo.alt_description}/>
                                <div className={styles['pinButtonContainer']}>
                                    <PhotoPinner photo={photo} isTopicPage={isTopicPage}/>
                                </div>
                                <p>{photo.username}</p>
                            </div>
                        ))}
                    </section>

                    <section className={styles['mypins-tag-container']}>
                        <h1 className={styles['my-pins-h1-tagcounts']}>Style of Chosen Photos</h1>
                        <MostChosenTags tagCounts={tagCounts}/>
                    </section>
                </>
            ) : (
                <p className={styles['no-pins-p']}>Please start pinning more items and return to this page to see your pins. </p>
            )}
            <ScrollIndicator/>
        </main>


    );

}

export default MyPins;