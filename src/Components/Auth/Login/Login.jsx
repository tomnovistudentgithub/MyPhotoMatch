import React, {useContext, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import {AuthContext} from "../../../contexts/AuthContext.jsx";
import {loginFields} from "../formFieldsAuth.js";
function Login() {
    const { login } = useContext(AuthContext);
    const [loginError, setLoginError]  = useState('');
    let navigate = useNavigate();
    let location = useLocation();

    const [state, setState] = useState({
        username: '',
        password: '',
    });


    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const loginSuccess = await login(state.username, state.password);
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
        <div className={styles['page-wrapper']}>
            <div className={styles['div-wrapper-form']}>
                <div className={styles['form-wrapper']}>
                    <h1>Login</h1>
                    <p>Login to your account:</p>
                    <form onSubmit={handleSubmit} className={styles['login-form']}>
                        {loginFields.map(field => (
                            <label key={field.stateName}>
                                {field.label}:
                                <input
                                    type={field.type}
                                    value={state[field.stateName]}
                                    onChange={(e) => setState({...state, [field.stateName]: e.target.value})}
                                    className={styles[`${field.stateName}-input`]}
                                />
                            </label>
                        ))}
                        {loginError && <p className={styles['error-feedback']}>{loginError}</p>}
                        <input type="submit" value="Login" className={styles['button']}/>
                        <p>No account yet? Register your account now <a href="/registration">here</a></p>
                    </form>
                </div>
                <div className={styles['peek-through-rectangle']}></div>
                <div className={styles['camera-button']}></div>
            </div>
        </div>
                );
                }


                export default Login;