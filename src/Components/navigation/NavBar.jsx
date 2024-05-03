import React, {useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './NavBar.module.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faThumbtack, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import myPhotoMatch from '../../assets/MyPhotoMatch.png';
import NavItem from "./NavItem.jsx";

function NavBar() {
    let location = useLocation();
    let navigate = useNavigate();
    const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);

    const handleLoginClick = () => {
        navigate("/login", { state: { from: location.pathname } });
    };

    const handleLogoutClick = () => {
        logout();
        navigate("/");
    };

    return (
        <div className={styles['flex-container']}>
            <div className={styles['nav-wrapper']}>
                <nav>
                    <img className={styles['photo-match-logo']} src={myPhotoMatch} alt="My Photo Match"/>
                    <div className={styles['nav-links']}>
                        <ul>
                            <NavItem to="/" icon={faHome} text="Home"/>
                            <NavItem to="/about" icon={faInfoCircle} text="About"/>
                            <NavItem to="/contact" icon={faEnvelope} text="Contact"/>
                            {isLoggedIn && <NavItem to="/mypins" icon={faThumbtack} text="My Pins"/>}
                            {isLoggedIn && isAdmin && <NavItem to="/admin" icon={faUserShield} text="Admin"/>}

                        </ul>
                    </div>
                    <div className={styles['login-button']}>
                        {isLoggedIn ? (
                            <button className={styles['login-logout-button']} onClick={handleLogoutClick}>
                                <FontAwesomeIcon
                                    className={styles['login-icon']}
                                    icon={faSignOutAlt}/><span
                                className={styles['login-text']}> Logout</span></button>
                        ) : (
                            <button className={styles['login-logout-button']} onClick={handleLoginClick}>
                                <FontAwesomeIcon
                                    className={styles['login-icon']}
                                    icon={faSignInAlt}/><span
                                className={styles['login-text']}> Login</span></button>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;