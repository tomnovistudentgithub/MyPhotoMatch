const HandleError = (error) => {

    let errorMessage = 'An unknown error occurred while creating the user.';

    if (error.response) {
        if (error.response.status === 403) {
            errorMessage = 'Rate limit exceeded, please try again later.';
        } else {
            errorMessage = error.response.data || 'An error occurred while creating the user.';
        }
    } else if (error.request) {
        errorMessage = 'No response received from the server. Please check your network connection.';
    } else {
        errorMessage = 'an error occured while making the request to the server.';
    }
    return errorMessage;
}
export default HandleError;