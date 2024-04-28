import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getPhotos } from '../../api/unsplashedApi/getPhotos.js';
import { getTopics } from '../../api/unsplashedApi/getTopics.js';
import './HomePage.modules.css';
import PhotoCard from "../../components/PhotoCard/PhotoCard.jsx";
import {usePhotos} from "../../hooks/usePhotos.js";
import {useTopics} from "../../hooks/useTopics.js";
import PhotoPinner from "../../components/PhotoPinner/PhotoPinner.jsx";
import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";

function HomePage() {
    const { photos, isLoading: photosLoading, setPage, error } = usePhotos();
    const { topics, isLoading: topicsLoading } = useTopics();
    const { pinnedPhotos, pinPhoto } = useContext(PinnedPhotosContext);


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
        <div className="outer-section-homepage">
            <div className="header-container">
                <h2>Photo topics</h2>
            </div>

            <section className="outer-section-topics">
                {topics.map((topic) => (
                    <div className="topic" key={topic.id}>
                        {topic.cover_photo &&
                            <Link to={`/topic/${topic.id}`}>
                                <img src={topic.cover_photo.urls.small} alt={topic.cover_photo.alt_description}/>
                            </Link>
                        }
                        <Link to={`/topic/${topic.id}`}>
                            <h3>{topic.title}</h3>
                        </Link>
                        <p className="topic-description-homepage">{topic.description}</p>
                    </div>
                ))}
            </section>


            <div className="header-container">
                <h2>Photos</h2>
                <div className="homepage-buttons-container">
                    <button className="page-buttons-homepage" onClick={handlePrev}>Previous photos</button>
                    <button className="page-buttons-homepage" onClick={handleNext}>Next photos</button>
                </div>
                {error && <div className="error-message">{error}</div>}


                <p className="disclaimer-homepage"> *Please note that I use a developers license of the API and not a
                    production license. Therefore I have a very limited rate limit so please be gentle in hitting the
                    next button or you'll need to wait for 60 minutes. Over the course of some time these photos will change. So if you revisit you have more to pin!</p>
            </div>

            <section className="outer-section-photos-homepage">
                {photos.map((photo) => (
                    <PhotoCard key={photo.id} photo={photo}/>

                ))}

            </section>

        </div>

    );


}

export default HomePage;