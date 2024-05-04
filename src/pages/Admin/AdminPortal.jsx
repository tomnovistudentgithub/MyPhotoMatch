import React, {useContext, useState} from 'react';
import downloadPhotoFromApi from "../../api/noviBackendApi/downloadPhotoFromApi.js";
import styles from './AdminPortal.module.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
import UserInfoButton from "../../Components/InfoButton/UserInfoButton.jsx";


function AdminPortal() {
    const [username, setUsername] = useState('');
    const [photoUrl, setPhotoUrl] = useState(null);
    const [error, setError] = useState(null);
    const { userRole, isAdmin, loading } = useContext(AuthContext);

    const handleUsernameChange = (event) => {
        try {
            setUsername(event.target.value);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleDownloadPhoto = async () => {
        try {
            if (!username) {
                throw new Error('Username is required');
            }
            const url = await downloadPhotoFromApi(username);
            setPhotoUrl(url);
            setError(null);
        } catch (error) {
            setError(error.message);
            if (error.response && error.response.status === 400) {
                setError('No photo available for this user');
            }

        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <h1>You do not have permission to view this page</h1>;
    }


    return (
        <div className={styles['outer-container-admin']}>
            <div className={styles['inner-container-admin']}>
                <h1>Admin Portal</h1>
                <p>On the admin page you can request user info and download a users' uploaded photo.</p>
                <form className={styles['form']}>
                    <label>
                        Username:<br></br>
                        <input type="text" value={username} onChange={handleUsernameChange} required/>
                    </label>
                </form>
                <UserInfoButton username={username}/>
                <button className={styles['download-button']} onClick={handleDownloadPhoto}>Download user photo</button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}

export default AdminPortal;