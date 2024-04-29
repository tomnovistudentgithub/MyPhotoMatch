import getUserFromTokenAndPassToken from "./getUserFromTokenAndPassToken.js";

function saveTagsToUserLocalStorage(tags) {


  if (!tags) {
    return;
  }

  if(!localStorage) {
    return;
  }

  if(getUserFromTokenAndPassToken()) {
const {username} = getUserFromTokenAndPassToken();
    localStorage.setItem(`tags-${username}`, JSON.stringify(tags));
  }

}

export default saveTagsToUserLocalStorage;