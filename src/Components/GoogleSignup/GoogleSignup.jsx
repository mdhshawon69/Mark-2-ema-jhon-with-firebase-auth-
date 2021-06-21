/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import firebaseConfig from '../../firebase.config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const GoogleSignup = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    // Firebase Singing In setup

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleLogin = () => {
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((res) => {
                const { displayName, email, photoURL } = res.user;
                const signedIngoogleUser = {
                    name: displayName,
                    email,
                    photoURL,
                    success: true,
                };
                setLoggedUser(signedIngoogleUser);
                history.push(from);
            })
            .catch((error) => {
                const { message } = error;
                loggedUser.error = message;
            });
    };

    return (
        <div>
            <button type="button" onClick={handleGoogleLogin}>
                Sign In with Google
            </button>
        </div>
    );
};

export default GoogleSignup;
