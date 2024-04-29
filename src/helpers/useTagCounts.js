// import { useEffect, useState } from 'react';
// import getPhotosFromDbByID from "../api/getPhotoFromDBWithId.js";
// import countTagsInPhotos from "./countTagsInPhotos.js";
//
//
//
// function useTagCounts() {
//     const [tagCounts, setTagCounts] = useState(null);
//     const photosFromDb = getPhotosFromDbByID();
//
//
//     useEffect(() => {
//         if (photosFromDb) {
//             const counts = countTagsInPhotos(photosFromDb);
//             setTagCounts(counts);
//         }
//     }, [photosFromDb]);
//
//     return tagCounts;
// }
//
// export default useTagCounts;