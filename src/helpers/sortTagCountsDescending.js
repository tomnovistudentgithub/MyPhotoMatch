function sortTagCountsDescending(tagCounts) {

    const entries = Object.entries(tagCounts);


    const sortedEntries = entries.sort((a, b) => b[1] - a[1]);


    const sortedTagCounts = Object.fromEntries(sortedEntries);

    return sortedTagCounts;
}

export default sortTagCountsDescending;

