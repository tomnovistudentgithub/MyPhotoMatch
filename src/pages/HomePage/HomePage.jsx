import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import {usePhotos} from "../../hooks/usePhotos.js";
import {useTopics} from "../../hooks/useTopics.js";
import PhotoCard from "../../Components/PhotoCard/PhotoCard.jsx";
import ScrollIndicator from "../../Components/ScrollIndicator/ScrollIndicator.jsx";

function HomePage() {
    const { photos, isLoading: photosLoading, setPage, error } = usePhotos();
    const { topics, isLoading: topicsLoading, displayOrientation } = useTopics();

    if (photosLoading || topicsLoading) {
        return <div>Loading...</div>;
    }

    const handleNext = () => {
        setPage(prevPage => prevPage + 1);

    };

    const handlePrev = () => {
        setPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
    };

    const displayTopics = displayOrientation === 'portrait' ? topics.portraitTopics.slice(0, 4) : topics.landscapeTopics.slice(0, 4);

    return (
        <>
        <main>
            <header className={styles['header-container']}>
                <h2>Photo topics</h2>
                <p>Here are some of the most popular topics. Click on the topic to discover and pin photos or scroll
                    downward to see photos from all topics</p>
            </header>

            <section className={`${styles['outer-section-topics']} ${displayOrientation}`}>
                {displayTopics.map((topic) => (
                    <article className={styles['topic']} key={topic.id}>
                        {topic.cover_photo &&
                            <Link to={`/topic/${topic.id}`}>
                                <img src={topic.cover_photo.urls.small} alt={topic.cover_photo.alt_description}/>
                            </Link>
                        }
                        <Link to={`/topic/${topic.id}`}>
                            <h3>{topic.title}</h3>
                        </Link>
                        <p className={styles['topic-description-homepage']}>{topic.description}</p>
                    </article>
                ))}
            </section>


            <div className={styles['header-container']}>
                <h2>Photos</h2>
                <div className={styles['homepage-buttons-container']}>
                    <button className={styles['page-buttons-homepage']} onClick={handlePrev}>Previous photos
                    </button>
                    <button className={styles['page-buttons-homepage']} onClick={handleNext}>Next photos</button>
                </div>
                {error && <div className={styles['error-message']}>{error}</div>}
                <p className={styles['disclaimer-homepage']}> *Please note that I use a developers license of the
                    API. Therefore I have a very limited rate limit so please be gentle in hitting
                    the
                    next button or you'll potentially need to wait for quite some while before data can be obtained.
                    Over the course of some time these photos
                    will change. So if you revisit you have more to pin!</p>
            </div>
            <section className={styles['outer-section-photos-homepage']}>
                {photos.map((photo) => (
                    <PhotoCard key={photo.id} photo={photo}/>
                ))}
            </section>


        </main>
    <footer>
        <ScrollIndicator/>
    </footer>
        </>
);
}

export default HomePage;