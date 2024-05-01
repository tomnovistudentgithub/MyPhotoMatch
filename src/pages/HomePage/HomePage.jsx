import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import {usePhotos} from "../../hooks/usePhotos.js";
import {useTopics} from "../../hooks/useTopics.js";
import PhotoCard from "../../Components/PhotoCard/PhotoCard.jsx";
import ScrollIndicator from "../../Components/ScrollIndicator/ScrollIndicator.jsx";

function HomePage() {
    const { photos, isLoading: photosLoading, setPage, error } = usePhotos();
    const { topics, isLoading: topicsLoading } = useTopics();

    if (photosLoading || topicsLoading) {
        return <div>Loading...</div>;
    }

    const handleNext = () => {
        setPage(prevPage => prevPage + 1);

    };

    const handlePrev = () => {
        setPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
    };

    return (
        <>
        <div className={styles['outer-section-homepage']}>
            <div className={styles['header-container']}>
                <h2>Photo topics</h2>
                <p> Here are some of the most popular topics. Click on the topic to see and pin photos or scroll
                    downward to see photos from all topics</p>
            </div>

            <section className={styles['outer-section-topics']}>
                {topics.map((topic) => (
                    <div className={styles['topic']} key={topic.id}>
                        {topic.cover_photo &&
                            <Link to={`/topic/${topic.id}`}>
                                <img src={topic.cover_photo.urls.small} alt={topic.cover_photo.alt_description}/>
                            </Link>
                        }
                        <Link to={`/topic/${topic.id}`}>
                            <h3>{topic.title}</h3>
                        </Link>
                        <p className={styles['topic-description-homepage']}>{topic.description}</p>
                    </div>
                ))}
            </section>


            <div className={styles['header-container']}>
                <h2>Photos</h2>
                <div className={styles['homepage-buttons-container']}>
                    <button className={styles['page-buttons-homepage']} onClick={handlePrev}>Previous photos</button>
                    <button className={styles['page-buttons-homepage']} onClick={handleNext}>Next photos</button>
                </div>
                {error && <div className={styles['error-message']}>{error}</div>}
                <p className={styles['disclaimer-homepage']}> *Please note that I use a developers license of the API and not a
                    production license. Therefore I have a very limited rate limit so please be gentle in hitting the
                    next button or you'll need to wait for 60 minutes. Over the course of some time these photos will
                    change. So if you revisit you have more to pin!</p>
            </div>
            <section className={styles['outer-section-photos-homepage']}>
                {photos.map((photo) => (
                    <PhotoCard key={photo.id} photo={photo}/>
                ))}
            </section>

        </div>
    <ScrollIndicator/>
    </>
    );
}

export default HomePage;