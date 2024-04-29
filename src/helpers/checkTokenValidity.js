import {jwtDecode} from 'jwt-decode';

function checkTokenValidity() {
    const token = localStorage.getItem('token');

    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Get current time in seconds


        console.log(decodedToken.exp);
        console.log(currentTime);
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else {
            return true;

        }
    }
}

export default checkTokenValidity;