import React, {useContext, useEffect, useState} from 'react';
import backendEndpoint from "../../api/noviBackendApi/backendEndpoint.js";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import styles from './Registration.module.css';

function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login, isLoggedIn } = useContext(AuthContext);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();
    const isUserLoggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;


    const handleSubmit = async (event) => {

        event.preventDefault();

        const user = {
            username: username,
            email: email,
            password: password,
            userInfo: [],
            authorities: [
                {
                    authority: 'USER'
                }
            ]
        };

        try {
            const response = await backendEndpoint.post('/users', user);


            if (response && response.status >= 200 && response.status < 300) {
                await login(username, password);
                setShowSuccessMessage(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                throw new Error('Server responded with a non-2xx status code');
            }

        } catch (error) {
            let errorMessage = 'An unknown error occurred while creating the user.';

            if (error.response) {
                errorMessage = error.response.data || 'An error occurred while creating the user.';
            } else if (error.request) {
                errorMessage = 'No response received from the server. Please check your network connection.';
            } else {
                errorMessage = 'an error occured while making the request to the server.';
            }
            setErrorMessage(errorMessage);
        }

    };

    return (
        <>
            <div className={styles['form-wrapper']}>
            <h1>Registration</h1>
            <p>Register your account here</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                {errorMessage && <h4>{errorMessage}</h4>}
                {showSuccessMessage && <h4>Registration successful! Logging in and redirecting...</h4>}
                {isUserLoggedIn && <h4>You are already logged in and registered.</h4>}
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                           disabled={isUserLoggedIn}/>
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                           disabled={isUserLoggedIn}/>
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                           disabled={isUserLoggedIn}/>
                </label>
                <input type="submit" value="Register" disabled={isUserLoggedIn}/>
            </form>
        </div>
        </>
    );
}


export default Registration;