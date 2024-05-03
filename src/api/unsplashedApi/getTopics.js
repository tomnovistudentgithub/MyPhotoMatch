import unsplashedEndpoint from './unsplashedEndpoint.js';
import apiHandler from "../apiHelpers/apiHandler.js";
import getRandomElements from "../../helpers/getRandomElements.js";

export const getTopics = async (page, itemsPerPage) => {
        const response = await apiHandler(
            unsplashedEndpoint,
            'get',
            '/topics',
            null,
            'json',
            {
                params: {
                    per_page: 20,
                }
            }
        );
        let topics = response.data;
        let randomTopics = getRandomElements(topics, itemsPerPage);
        return randomTopics;
}



