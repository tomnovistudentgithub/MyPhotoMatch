import unsplashedEndpoint from './unsplashedEndpoint.js';

export const getTopics = async (page, itemsPerPage) => {


    try {
        const response = await unsplashedEndpoint.get('/topics?per_page=20');
        console.log("getTopics: ", response.data);

        let topics = response.data;
        let randomTopics = [];

        for (let i = 0; i < itemsPerPage; i++) {
            const randomIndex = Math.floor(Math.random() * topics.length);
            const [topic] = topics.splice(randomIndex, 1);
            randomTopics.push(topic);
        }
        return randomTopics;
    } catch (error) {
        console.error(error);
        throw error;
    }



}