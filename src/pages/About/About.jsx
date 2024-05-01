import React, {useEffect, useState} from 'react';
import styles from './About.module.css';



function About() {


    return (

        <div className={styles['about-outer-container']}>

            <div className={styles['about-inner-container']}>
                <div className={styles['about-header']}>
                    <h1> Ever wondered... </h1>
                    <ul>
                        <li> Who makes those amazing photos you on social media?</li>
                        <li> Ever thought how you or your family would look if you had a photograph taken like that?
                        </li>
                    </ul>
                </div>

                <p>
                    My Photo Match aims to bring you in touch with top notch photographers from your surroundings.
                    By picking your favorite photo's we'll determine the best photographer you can hire closeby.

                    To do this we make use of Photographers data on Unsplashed.
                    Pin your favourite photos from the homepage or the topic pages.
                    On the bottom of the My Pins page you can see which styles relate to your photo.
                    Once you have a nice selection, go to the contact page to get in touch with the photographers that
                    match your chosen style. Enjoy your photoshoot!
                </p>


                <caption><a
                    href="https://www.freepik.com/free-photo/woman-with-camera-taking-picture-reflection_28006248.htm#query=photography&position=0&from_view=keyword&track=sph&uuid=f218c2dd-d773-4a4c-ac5e-433558ac0fea">Image
                    by HelloDavidPradoPerucha on Freepik</a></caption>
            </div>
        </div>
    );
}

export default About;