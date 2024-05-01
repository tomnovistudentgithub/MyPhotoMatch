import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import unsplashedEndpoint from '../../api/unsplashedApi/unsplashedEndpoint.js';
import { getTopic } from '../../api/unsplashedApi/getTopic.js';
import { getTopicPhotos } from '../../api/unsplashedApi/getTopicPhotos.js'
import styles from './TopicPhotos.module.css';
import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";
import PhotoPinner from "../../Components/PhotoPinner/PhotoPinner.jsx";
import ScrollIndicator from "../../Components/ScrollIndicator/ScrollIndicator.jsx";
function TopicPhotos() {
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [showPhotos, setShowPhotos] = useState(false);
    const { pinnedPhotos, setPinnedPhotos } = useContext(PinnedPhotosContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                const data = await getTopicPhotos(topicId, 9);
                const photosWithOrientation = data.map(photo => {
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
                setPhotos(photosWithOrientation);
                setShowPhotos(true);
                setIsLoading(false);
            } catch (error) {

                if (error.response && error.response.status === 403 && error.response.data === 'Rate Limit Exceeded') {
                    setError('Rate limit exceeded. Please try again later.');
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

    const coverPhotoUrl = topic.cover_photo.urls.regular;


    return (
        <div className={styles['topic-photos-wrapper']} style={{backgroundImage: `url(${coverPhotoUrl})`}}>
            <div className={styles['overlay']}>
                <div className={styles['topic-content']}>
                    <div className={styles['topic-text']}>
                        <h1>{topic.title}</h1>
                        <p>{topic.description}</p>
                    </div>
                    {error ? (
                        <div className={styles['error']}>{error}</div>
                    ) : (
                        <div className={styles['photo-grid']}>
                            {showPhotos && photos.map((photo, index) => {
                                const gridRow = Math.floor(index / 3) + 1;
                                const gridColumn = index % 3 + 1;
                                const gridArea = `${gridRow} / ${gridColumn}`;
                                const photoClass = photo.orientation === 'landscape' ? styles['double-width'] : styles['double-height'];
                                return (
                                    <div key={photo.id} className={`${styles['photo-container']} ${photoClass}`}>
                                        <img src={photo.urls.small} alt={photo.alt_description} style={{gridArea}}/>
                                        <PhotoPinner photo={photo}/>
                                        {error && <p>{error}</p>}
                                    </div>
                                );
                            })}
                        </div>

                    )}
                </div>
                <ScrollIndicator/>

            </div>

        </div>
    );
}

export default TopicPhotos;