import React, {useContext, useEffect, useState} from 'react';
import backendEndpoint from "../../api/noviBackendApi/backendEndpoint.js";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import styles from './Registration.module.css';
import {registrationFields} from "../../Components/Auth/formFieldsAuth.js";

function Registration() {
    const { login, isLoggedIn } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();
    const isUserLoggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;

    const [state, setState] = useState({
        username: '',
        password: '',
        email: '',
    });

    const handleSubmit = async (event) => {

        event.preventDefault();

        const user = {
            username: state.username,
            email: state.email,
            password: state.password,
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
                await login(state.username, state.password);
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
        <div className={styles['page-wrapper']}>
            <div className={styles['div-wrapper-form']}>
                <div className={styles['form-wrapper']}>

                    <h1>Registration</h1>
                    <p>Register your account here</p>


                    <form onSubmit={handleSubmit} className={styles.form}>
                        {errorMessage && <h4 className={styles['error-feedback']}>{errorMessage}</h4>}
                        {showSuccessMessage && <h4>Registration successful! Logging in and redirecting...</h4>}
                        {isUserLoggedIn && !showSuccessMessage && <h4>You are already logged in and registered.</h4>}
                        {registrationFields.map((field, index) => (
                            <div key={field.stateName} className={styles['form-grid']}>
                                <label>{field.label}:</label>
                                <input
                                    type={field.type}
                                    value={state[field.stateName]}
                                    onChange={e => setState({...state, [field.stateName]: e.target.value})}
                                    disabled={isUserLoggedIn}
                                    className={styles[`${field.stateName}-input`]}
                                />
                                {field.error && <p className={styles['error-feedback']}>{field.error}</p>}
                            </div>
                        ))}
                        <input type="submit" value="Register" disabled={isUserLoggedIn}
                               className={styles['login-button']}/>
                    </form>
                </div>
            </div>
            <div className={styles['peek-through-rectangle']}></div>
            <div className={styles['camera-button']}></div>
        </div>

    );
}

export default Registration;