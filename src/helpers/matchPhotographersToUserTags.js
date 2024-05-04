import photographersData from "../assets/photographers.json";


function matchPhotographersToUserTags(tagCounts) {

    const actualTagCounts = tagCounts.tagCounts;
    const entries = Object.entries(actualTagCounts);
    const filteredEntries = entries.filter(([tag, count]) => count >= 4);
    const userTags = filteredEntries.map(([tag, count]) => tag);


    const matchingPhotographers = photographersData.photographers.filter(photographer => {
        const lowerCaseStyles = photographer.style.map(style => style.toLowerCase());
        return lowerCaseStyles.some(style => userTags.includes(style));
    });

    return matchingPhotographers;
}


export default matchPhotographersToUserTags;