import photographersData from "../assets/photographers.json";


export function matchPhotographersToUserTags({ tagCounts }) {
    const userTags = Object.keys(tagCounts);

    const matchingPhotographers = photographersData.photographers.filter(photographer =>
        photographer.style.some(style => userTags.includes(style))
    );

    return matchingPhotographers;
}


export default matchPhotographersToUserTags;