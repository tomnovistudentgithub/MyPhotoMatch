import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './HamburgerMenu.module.css';

function HamburgerMenu({ isOpen, setIsOpen, scrolled }) {
    const hamburgerRef = useRef(null);

    const handleDocumentClick = (event) => {

        if (isOpen && (event.target.tagName !== 'path' && event.target.tagName !== 'svg' && event.target.tagName !== 'A' && event.target.tagName !== 'SPAN')) {
            console.log(event.target.tagName);
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
        scrolled && (
            <FontAwesomeIcon
                ref={hamburgerRef}
                icon={faBars}
                className={`${styles['hamburger-icon']} ${isOpen ? styles['active'] : ''}`}
                onClick={() => setIsOpen(!isOpen)} />
        )
    );
}

export default HamburgerMenu;