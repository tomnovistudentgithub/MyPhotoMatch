import getToken from "../../helpers/getToken.js";
import {useState} from "react";
import backendEndpoint from "../../api/noviBackendApi/backendEndpoint.js";
import getUserRole from "../../helpers/getUserRole.js";
import PropTypes from 'prop-types';
import styles from './UserInfoButton.module.css';
import Button from "../Button/Button.jsx";


function UserInfoButton({ username }) {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);


    const handleClick = async () => {
        try {
            if (!username) {
                setError('Username is required');
                return;
            }
            const token = getToken();
                     const response = await backendEndpoint.get(`/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status >= 200 && response.status < 300) {
                const userInfo = response.data;
                const userRole = getUserRole(userInfo);
                setUserInfo(userInfo);
                setUserRole(userRole);
                setError(null);

            } else {
                throw new Error('User cannot be retrieved');
            }
        } catch (error) {
            setUserInfo(null);
            setError('User cannot be retrieved');

        }
    };

    return (
        <div className={styles['get-user-info']}>
            <Button onClick={handleClick}>Get User Info</Button>
            {userInfo && <div className={styles['get-user-info-content']}>User Info: {JSON.stringify(userInfo)}</div>}
            {error && <div>{error}</div>}
        </div>
    );
}

UserInfoButton.propTypes = {
    username: PropTypes.string.isRequired,
};
export default UserInfoButton;