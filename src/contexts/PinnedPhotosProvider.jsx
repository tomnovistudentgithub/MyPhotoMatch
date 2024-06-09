import React, {useContext, useEffect, useState} from 'react';
import PinnedPhotosContext from './PinnedPhotoContext.js';
import changeUserInfoField from "../api/noviBackendApi/changeUserInfoField.js";
import getUserInfoField from "../api/noviBackendApi/getUserInfoField.js";
import countTagsInPhotos from "../helpers/countTagsInPhotos.js";
import getPhotoFromDBWithId from "../api/getPhotoFromDBWithId.js";
import {AuthContext} from "./AuthContext.jsx";
import {useLocation} from "react-router-dom";

const PinnedPhotosProvider = ({ children }) => {
    const [pinnedPhotosIds, setPinnedPhotosIds] = useState([]);
    const [pinnedPhotos, setPinnedPhotos] = useState([]);
    const [tagCounts, setTagCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useContext(AuthContext);
    const [error, setError] = useState(null);


    const location = useLocation();
    const isTopicPage = location.pathname.includes('topic') || location.pathname.includes('mypins');

    const fetchPinnedPhotos = async () => {
        let userInfo = await getUserInfoField();
        if (userInfo instanceof Error) {
            setError(userInfo.message);
        } else {
            if (typeof userInfo === 'string') {
                userInfo = [userInfo];
            }
            setPinnedPhotosIds(userInfo || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setPinnedPhotos([]);
            setTagCounts({});
        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetchPinnedPhotos();
    }, [isLoggedIn]);

    useEffect(() => {
        const fetchPhotosByIds = async () => {
            setLoading(true);
            const validIds = pinnedPhotosIds.filter(id => id !== '');
            const photosPromises = validIds.map(id => getPhotoFromDBWithId(id));
            try {
                let photos = await Promise.all(photosPromises);
                photos = photos.filter(photo => photo !== null);

            const photosWithDetails = photos.map(photo => {
                let tags;

                if (photo && photo.tags && photo.tags.length > 0) {
                    tags = photo.tags;
                } else {
                    tags = [];
                }

                return {
                    id: photo.id,
                    alt_description: photo.alt_description,
                    tags: tags,
                    url: photo.urls.regular ? photo.urls.regular : photo.urls.small,
                    username: photo.user.name,
                };
            });
            setPinnedPhotos(photosWithDetails);
                console.log('photosWithDetails:', photosWithDetails);
            } catch (error) {
                setError(error.response.data);
            } finally {
                setLoading(false);
            }
        };

        if (pinnedPhotosIds.length > 0) {
            fetchPhotosByIds();
        }
    }, [pinnedPhotosIds]);

    useEffect(() => {
        if (pinnedPhotos && pinnedPhotos.length > 0) {
            const counts = countTagsInPhotos(pinnedPhotos);
            setTagCounts(counts);

            const filteredCounts = Object.fromEntries(
                Object.entries(counts).filter(([tag, count]) => count > 5)
            );
            localStorage.setItem('tagCounts', JSON.stringify(filteredCounts));
        }
    }, [pinnedPhotos]);

    const togglePinPhoto = async (photo) => {
        let updatedPinnedPhotos;

        if (pinnedPhotosIds.includes(photo.id)) {
            updatedPinnedPhotos = pinnedPhotosIds.filter(pinnedPhotoId => pinnedPhotoId !== photo.id);
        } else {
            updatedPinnedPhotos = [...pinnedPhotosIds, photo.id];
        }

        console.log('updatedPinnedPhotos before state update:', updatedPinnedPhotos);

        try {
            await changeUserInfoField(updatedPinnedPhotos);
            setPinnedPhotosIds(updatedPinnedPhotos);
            console.log('updatedPinnedPhotos after state update:', updatedPinnedPhotos);
            setError(null);
        } catch (error) {
            setError('Failed to pin/unpin photo. Please try again later.' + error.response.data);
        }
    }

    return (
        <PinnedPhotosContext.Provider value={{ pinnedPhotos, setPinnedPhotos, togglePinPhoto, fetchPinnedPhotos, tagCounts, error, isTopicPage}}>
            {children}
        </PinnedPhotosContext.Provider>
    );
};

export default PinnedPhotosProvider;