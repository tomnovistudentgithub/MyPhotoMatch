function getRandomElements(array, count) {
    let copyArray = [...array];
    let randomElements = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * copyArray.length);
        const [element] = copyArray.splice(randomIndex, 1);
        randomElements.push(element);
    }

    return randomElements;
}

export default getRandomElements;