import { useState, useEffect } from 'react';
import { getTopics } from '../api/unsplashedApi/getTopics.js';
import getRandomElements from "../helpers/getRandomElements.js";
import {classifyTopicsByOrientation} from "../helpers/orientation.js";



export const useTopics = () => {
    const [topics, setTopics] = useState({portraitTopics: [], landscapeTopics: []});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayOrientation, setDisplayOrientation] = useState(localStorage.getItem('displayOrientation') || 'portrait');




    useEffect(() => {
        const fetchTopics = async () => {
            try {
                    const topicData = await getTopics(25);

                const { portraitTopics, landscapeTopics } = classifyTopicsByOrientation(topicData);

                setTopics({
                    portraitTopics: getRandomElements(portraitTopics, 4),
                    landscapeTopics: getRandomElements(landscapeTopics, 4)
                });
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };
        fetchTopics();
    }, [displayOrientation]);

    useEffect(() => {
        const toggleOrientation = () => {
            const newOrientation = displayOrientation === 'portrait' ? 'landscape' : 'portrait';
            setDisplayOrientation(newOrientation);
            localStorage.setItem('displayOrientation', newOrientation);
        };

        window.addEventListener('beforeunload', toggleOrientation);

        return () => {
            window.removeEventListener('beforeunload', toggleOrientation);
        };
    }, [displayOrientation]);

    return {topics, isLoading, error, displayOrientation};
}