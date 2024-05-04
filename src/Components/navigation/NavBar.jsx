import React, {useContext, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './NavBar.module.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faThumbtack, faUserShield, faSignInAlt, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import myPhotoMatch from '../../assets/MyPhotoMatch.png';
import NavItem from "./NavItem.jsx";

function NavBar() {
    let location = useLocation();
    let navigate = useNavigate();
    const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [navHeight, setNavHeight] = useState(0);
    const handleLoginClick = () => {
        navigate("/login", { state: { from: location.pathname } });
    };

    const handleLogoutClick = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        setNavHeight(navRef.current.offsetHeight);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > navHeight / 2;
            setScrolled(isScrolled);
        };
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [navHeight]);

    const hamburgerRef = useRef(null);

    const handleDocumentClick = (event) => {
        if (isOpen && event.target.tagName !== 'A' && hamburgerRef.current !== event.target)  {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick);
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, [isOpen]);

    return (
        <div className={`${styles['flex-container']} ${isOpen ? styles['overlay'] : ''}`} ref={navRef}>
            <div className={styles['nav-wrapper']}>
                <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                    <img className={styles['photo-match-logo']} src={myPhotoMatch} alt="My Photo Match"/>
                    <div className={styles['nav-links']}>
                        <ul>
                            <NavItem to="/" icon={faHome} text="Home" setIsOpen={setIsOpen}/>
                            <NavItem to="/about" icon={faInfoCircle} text="About" setIsOpen={setIsOpen}/>
                            <NavItem to="/contact" icon={faEnvelope} text="Contact" setIsOpen={setIsOpen}/>
                            {isLoggedIn && <NavItem to="/mypins" icon={faThumbtack} text="My Pins" setIsOpen={setIsOpen}/>}
                            {isLoggedIn && isAdmin && <NavItem to="/admin" icon={faUserShield} text="Admin" setIsOpen={setIsOpen}/>}
                        </ul>
                    </div>
                    {scrolled && (
                        <FontAwesomeIcon
                            ref={hamburgerRef}
                            icon={faBars}
                            className={`${styles['hamburger-icon']} ${isOpen ? styles['active'] : ''}`}
                            onClick={() => setIsOpen(!isOpen)}  />
                    )}
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