import React, {useEffect, useState} from 'react';
import styles from './About.module.css';


function About() {
    const [animate, setAnimateTextBox] = useState(false);
    const [animateHeader, setAnimateHeader] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateTextBox(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateHeader(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>

        <main className={styles['about-outer-container']}>
            <section className={`${styles['about-header']} ${animateHeader ? styles.animate : ''}`}>
                <article className={styles['about-header-inner']}>
                    <h1> Ever wondered... </h1>
                    <ul>
                        <li> Who makes those amazing photos on social media?</li>
                        <li> Ever thought how you or your family would look if you had a photograph taken like that?
                        </li>
                    </ul>
                </article>
            </section>

            <section className={styles['about-inner-container']}>
                <div className={styles['about-text-flex']}>

                    <article className={`${styles['text-block']} ${animate ? styles.animate : ''}`}>
                        <b>My Photo Match</b> aims to bring you in touch with top notch photographers from your
                        surroundings.
                        By picking your favorite photo's we'll determine the best photographer you can hire closeby.
                        To do this we make use of Photographers data on Unsplashed.
                    </article>

                    <div className={styles['empty-block']}></div>
                    <div className={styles['empty-block']}></div>

                    <article className={`${styles['text-block']} ${animate ? styles.animate : ''}`}>
                        Now it's your time to start using this website!
                        Make an account on the <a href="/registration">registration page</a> and start pinning your
                        favourite
                        photos from the homepage or the topic pages.
                        On the bottom of the My Pins page you can see which styles relate to your photo.
                        Once you have a nice selection, go to the contact page to get in touch with the
                        photographers that match your chosen style. Enjoy your photoshoot!
                    </article>

                </div>
                <figure>
                    <figcaption> Image by HelloDavidPradoPerucha on <a href="https://www.freepik.com/free-photo/woman-with-camera-taking-picture-reflection_28006248.htm">Freepik</a></figcaption>
                </figure>
            </section>

        </main>

        </>
    )
        ;
}

export default About;