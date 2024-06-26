import React, {useContext, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './NavBar.module.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faThumbtack, faUserShield, faSignInAlt, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import myPhotoMatch from '../../assets/MyPhotoMatch.png';
import NavItem from "./NavItem.jsx";
import Button from "../Button/Button.jsx";
import HamburgerMenu from "./HamburgerMenu.jsx";

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
            const offset = window.scrollY;
            if (offset > 15) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [navHeight]);



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

                    <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} scrolled={scrolled} />

                    <div className={styles['login-button']}>
                        {isLoggedIn ? (

                            <Button onClick={handleLogoutClick} className={styles['login-logout-button']}>

                                <FontAwesomeIcon
                                    className={styles['login-icon']}
                                    icon={faSignOutAlt}/><span
                                className={styles['login-text']}> Logout</span>
                            </Button>
                        ) : (

                            <Button onClick={handleLoginClick} className={styles['login-logout-button']}>

                                <FontAwesomeIcon
                                    className={styles['login-icon']}
                                    icon={faSignInAlt}/><span
                                className={styles['login-text']}> Login</span>
                            </Button>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;