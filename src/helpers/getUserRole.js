function getUserRole( userInfo ) {

    const isAdmin = userInfo.authorities.some(auth => auth.authority === 'ADMIN');
    console.log('isAdmin:', isAdmin);
    return isAdmin ? 'ADMIN' : 'USER';
}


export default getUserRole;
