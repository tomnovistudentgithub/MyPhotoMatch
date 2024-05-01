import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useMatch, useLocation, useNavigate} from 'react-router-dom';
import styles from './NavBar.module.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faThumbtack, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import myPhotoMatch from '../../assets/MyPhotoMatch.png';

function NavBar() {
    let location = useLocation();
    let navigate = useNavigate();
    const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
    const matchMyPins = useMatch("/mypins");
    const matchAdmin = useMatch("/admin");


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
                            <li><NavLink to="/" className={useMatch("/") ? "active-link" : ""}><FontAwesomeIcon
                                className={styles['nav-icon']} icon={faHome}/><span
                                className="nav-text">Home</span></NavLink>
                            </li>
                            <li><NavLink to="/about"
                                         className={useMatch("/about") ? "active-link" : ""}><FontAwesomeIcon
                                className={styles['nav-icon']} icon={faInfoCircle}/><span
                                className={styles['nav-text']}>About</span></NavLink></li>
                            <li><NavLink to="/contact"
                                         className={useMatch("/contact") ? "active-link" : ""}><FontAwesomeIcon
                                className={styles['nav-icon']} icon={faEnvelope}/><span
                                className={styles['nav-text']}>Contact</span></NavLink></li>
                            {isLoggedIn &&
                                <li><NavLink to="/mypins"
                                             className={matchMyPins ? styles['active-link'] : ""}><FontAwesomeIcon
                                    className={styles['nav-icon']} icon={faThumbtack}/><span
                                    className={`${styles['nav-text']} ${styles['nav-text-mypins']}`}>My Pins</span></NavLink>
                                </li>}
                            {isAdmin &&
                                <li>
                                    <NavLink to="/admin" className={matchAdmin ? styles['active-link'] : ""}>
                                        <FontAwesomeIcon className={styles['nav-icon']} icon={faUserShield}/>
                                        <span className={styles['nav-text']}>Admin</span>
                                    </NavLink>
                                </li>
                            }
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