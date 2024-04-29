import React, {useContext, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [loginError, setLoginError]  = useState('');
    let navigate = useNavigate();
    let location = useLocation();


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const loginSuccess = await login(username, password);
            if (loginSuccess) {
                setLoginError('');
                let { from } = location.state || { from: { pathname: "/" } };
                navigate(from);
            } else {
                setLoginError('Username or password is incorrect');
            }
            } catch (error) {
            setLoginError('An error occurred while logging in');
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles['username-input']} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles['password-input']} />
                {loginError && <p className={styles['error-feedback']}>{loginError}</p>}
            </label>
            <input type="submit" value="Login" className={styles['login-button']} />
            <p>No account yet? Register your account now <a href="/registration">here</a></p>
        </form>
    );
}

export default Login;