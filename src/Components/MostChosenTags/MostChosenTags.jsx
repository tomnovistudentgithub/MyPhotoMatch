import styles from './MostChosenTags.module.css';

function MostChosenTags({tagCounts}) {

    console.log(tagCounts);

    const chosenTags = tagCounts && Object.entries(tagCounts)
        .filter(([tag, count]) => count > 3);

    return (
        <div className={styles['most-chosen-tags-container']}>
            {chosenTags.length > 0 ? (
                <ul>
                    {chosenTags.map(([tag, count]) => (
                        <li key={tag} className={styles.tag}>{tag}: {count}</li>
                    ))}
                </ul>
            ) : (
                <p>Please pin more photos to determine your style.</p>
            )}
        </div>
    );
}

export default MostChosenTags;