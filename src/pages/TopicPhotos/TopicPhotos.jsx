import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getTopic } from '../../api/unsplashedApi/getTopic.js';
import { getTopicPhotos } from '../../api/unsplashedApi/getTopicPhotos.js'
import styles from './TopicPhotos.module.css';
import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";
import PhotoPinner from "../../Components/PhotoPinner/PhotoPinner.jsx";
import ScrollIndicator from "../../Components/ScrollIndicator/ScrollIndicator.jsx";
import {photoOrientation} from "../../helpers/orientation.js";

function TopicPhotos() {
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [showPhotos, setShowPhotos] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isTopicPage } = useContext(PinnedPhotosContext);

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const data = await getTopic(topicId);
                setTopic(data);
            } catch (error) {
                setError(error.message);
                throw error;
            }
        }
        fetchTopic();
    }, [topicId]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const topicPhotos = await getTopicPhotos(topicId, 9);
                const topicPhotosWithOrientation = photoOrientation(topicPhotos);
                setPhotos(topicPhotosWithOrientation);
                setShowPhotos(true);
                setIsLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 403 && error.response.data === 'Rate Limit Exceeded') {
                    setError('Rate limit exceeded. Cannot obtain data. Please try again later.');
                } else {
                    setError(error.message);
                }
                setIsLoading(false);
                throw error;
            }
        };
        fetchPhotos();
    }, [topicId]);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return  <div className={styles['error-message']}>{error}</div>;
    }

    let coverPhotoUrl;
    if (topic.cover_photo) {
        coverPhotoUrl = topic.cover_photo.urls.regular;
    } else if (topic.photos && topic.photos.length > 0) {
        coverPhotoUrl = topic.photos[0].urls.small;
    } else {
        coverPhotoUrl = null;
    }

    return (
        <main className={styles['topic-photos-wrapper']} style={{backgroundImage: `url(${coverPhotoUrl})`}}>
            <div className={styles['overlay']}>
                <section className={styles['topic-content']}>
                    <article className={styles['topic-text']}>
                        <h1>{topic.title}</h1>
                        <p>{topic.description}</p>
                    </article>
                    {error ? (
                        <div className={styles['error']}>{error}</div>
                    ) : (
                        <section className={styles['photo-grid']}>
                            {showPhotos && photos.map((photo, index) => {
                                const gridRow = Math.floor(index / 3) + 1;
                                const gridColumn = index % 3 + 1;
                                const gridArea = `${gridRow} / ${gridColumn}`;
                                const photoClass = photo.orientation === 'landscape' ? styles['double-width'] : styles['double-height'];
                                return (
                                    <div key={photo.id} className={`${styles['photo-container']} ${photoClass}`}>
                                        <img src={photo.urls.small} alt={photo.alt_description} style={{gridArea}}/>
                                        <PhotoPinner photo={photo} isTopicPage={isTopicPage}/>
                                        {error && <p>{error}</p>}
                                    </div>
                                );
                            })}
                        </section>
                    )}
                </section>
                <ScrollIndicator/>
            </div>
        </main>
    );
}

export default TopicPhotos;