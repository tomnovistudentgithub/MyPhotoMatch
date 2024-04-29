import {jwtDecode} from 'jwt-decode';
import getToken from "./getToken.js";


function getUserFromTokenAndPassToken() {
    const token = getToken();
  if (token) {
   const decodedToken = jwtDecode(token);
      const username = decodedToken.sub;
    return { username, token };
  }
  return null;
}

export default getUserFromTokenAndPassToken;