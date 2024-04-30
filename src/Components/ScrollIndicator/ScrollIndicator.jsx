import React, { useEffect, useState, useRef } from 'react';
import styles from './ScrollIndicator.module.css';

const ScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        let timerId = null;
        const checkScroll = () => {
            var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            var scrollPosition = window.scrollY;
            if (scrollPosition <= 0) {
                setIsVisible(true);
            } else if (scrollPosition + 1 >= scrollHeight) {
                setIsVisible(false);
            }

            if (timerId !== null) {
                clearTimeout(timerId);
            }
            setIsScrolling(true);

            timerId = setTimeout(function() {
                setIsScrolling(false);
            }, 500);
        };

        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        isVisible && (
            <div ref={scrollIndicatorRef} className={`${styles.scrollIndicator} ${isScrolling ? styles.visible : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
            </div>
        )
    );
};

export default ScrollIndicator;