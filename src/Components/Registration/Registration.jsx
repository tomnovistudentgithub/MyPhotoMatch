import React, {useContext, useState} from 'react';
// import './Registration.modules.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import backendEndpoint from "../../api/noviBackendApi/backendEndpoint.js";



function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(AuthContext);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();
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
                console.log('No proper response received from the server.');
            }

        } catch (error) {
            if (error.response) {
                console.log('Response Status:', error.response.status);
                console.log('response data', error.response.data);
            }

            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('An error occurred while creating the user.');
            }
            console.error('Error creating user:', error.response.status, error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <h4>{errorMessage}</h4>}
            {showSuccessMessage && <h4>Registration successful! Logging in and redirecting...</h4>}
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Register" />
        </form>
    );
}

export default Registration;