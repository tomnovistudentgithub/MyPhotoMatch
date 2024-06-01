import {jwtDecode} from 'jwt-decode';

function checkTokenValidity(token) {

    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            return false;
        } else {
            return true;

        }
    }
}

export default checkTokenValidity;