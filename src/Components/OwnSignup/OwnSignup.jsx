/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const OwnSignup = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const { email, password } = loggedUser;
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    // Own sign up setup

    // Updating username

    const user = firebase.auth().currentUser;

    const updatingUsername = (name) => {
        user.updateProfile({
            displayName: name,
        })
            .then(() => {
                console.log('username updated');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Matching the email and the password requirements
    const handleBlur = (e) => {
        let isValid = true;
        const emailRe =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passRe = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
        if (e.target.name === 'email') {
            isValid = emailRe.test(e.target.value);
        }

        if (e.target.name === 'password') {
            isValid = passRe.test(e.target.value);
        }

        if (isValid) {
            const ownUser = { ...loggedUser };
            ownUser[e.target.name] = e.target.value;
            setLoggedUser(ownUser);
        }
    };

    // After successful login or sign up function
    const successFull = () => {
        const ownUser = { ...loggedUser };
        ownUser.success = true;
        ownUser.error = '';
        setLoggedUser(ownUser);
        history.push(from);
    };

    // After an error function
    const unSuccessful = (error) => {
        const ownUser = { ...loggedUser };
        ownUser.error = error.message;
        setLoggedUser(ownUser);
    };

    // Submitting the user credentials to the firebase
    const handleSubmit = (e) => {
        // Creating new user
        if (newUser && email && password) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    successFull();
                    updatingUsername(loggedUser.name);
                    console.log(userCredential.displayName);
                })
                .catch((error) => {
                    unSuccessful(error);
                });
        }

        // Signing in new user
        if (!newUser && email && password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    successFull();
                    console.log(userCredential);
                })
                .catch((error) => {
                    unSuccessful(error);
                    console.log(error);
                });
        }

        e.preventDefault();
    };

    return (
        <div>
            <h2>Our own login/signup process</h2>
            <form onSubmit={handleSubmit}>
                {newUser && (
                    <input
                        style={{ display: 'block', margin: 'auto' }}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        onBlur={handleBlur}
                    />
                )}
                <br />
                <input
                    style={{ display: 'block', margin: 'auto' }}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onBlur={handleBlur}
                />{' '}
                <br />
                <input
                    style={{ display: 'block', margin: 'auto' }}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onBlur={handleBlur}
                />{' '}
                <br />
                <input
                    style={{ margin: 'auto' }}
                    type="submit"
                    value={newUser ? 'Sign In' : 'Login'}
                />
                <br />
                <input
                    style={{ margin: 'auto' }}
                    type="checkbox"
                    name="newUser"
                    id="newUser"
                    onChange={() => setNewUser(!newUser)}
                />
                <label htmlFor="newUser">Not an user? Sign up now!</label>
            </form>
            {loggedUser.success && (
                <p style={{ color: 'green' }}>
                    User {newUser ? 'created' : 'logged in'} successfully
                </p>
            )}
            <p style={{ color: 'red' }}>{loggedUser.error}</p>
        </div>
    );
};

export default OwnSignup;
