function getUserRole( userInfo ) {

    const isAdmin = userInfo.authorities.some(auth => auth.authority === 'ADMIN');
    return isAdmin ? 'ADMIN' : 'USER';
}


export default getUserRole;
