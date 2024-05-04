import React, {createContext, useContext, useEffect, useState} from 'react';
import getUserFromTokenAndPassToken from "../helpers/getUserFromTokenAndPassToken.js";
import getUserRoleEmail from "../api/noviBackendApi/getUserRoleEmail.js";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({user: null, status: `pending`});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [resetForm, setResetForm] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {

            const fetchUser = async () => {

                try {
                    const user = await getUserRoleEmail();
                    if (user) {
                        setAuthState({
                            user: user,
                            status: 'done',
                            userRole: user.userRole,
                        });
                        setIsLoggedIn(true);
                        setIsAdmin(user.userRole === 'ADMIN');

                    }
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                }
            };
            fetchUser();
        } else {
            setAuthState({
                user: null,
                status: 'done',
            });
            setIsLoggedIn(false);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const data = {
        ...authState,
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        login: login,
        logout: logout,
        resetForm: resetForm,
        setResetForm: setResetForm,
    };



    async function login(enteredUsername, enteredPassword) {
        try {
            const response = await axios.post('https://api.datavortex.nl/photomatch/users/authenticate', {
                username: enteredUsername,
                password: enteredPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('token', data.jwt);
                const decodedToken = jwtDecode(data.jwt);
                setIsLoggedIn(true);
                setAuthState({ user: enteredUsername, status: 'done' });
                setIsAdmin(decodedToken.role === 'ADMIN');
                return true;

            } else {
                throw response;
            }
        } catch (error) {
            return false;
        }
    }


    function logout() {
        setAuthState({user: null, setAuthState: 'done', userRole: null});
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsAdmin(false);

        if (resetForm) {
            resetForm();
        }
    }


    return (
        <AuthContext.Provider value={ data }>
            {authState.status === 'pending'
                ? <p>Loading...</p> :
                children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;