function preparePhotoForUpload(username, photoFile) {


    if (!photoFile) {
        throw new Error('No file provided');
    }

    if (!['image/jpeg', 'image/png'].includes(photoFile.type)) {
        console.error('Invalid file type. Please upload a JPEG or PNG file.');
        return "Invalid file type. Please upload a JPEG or PNG file.";
    } else {
        const formData = new FormData();
        formData.append("file", photoFile);
        return formData;
    }

}

export default preparePhotoForUpload;