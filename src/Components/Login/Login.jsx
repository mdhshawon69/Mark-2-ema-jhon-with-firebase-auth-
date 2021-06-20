/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/auth';
import { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [newUserExist, setNewUserExist] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
    });

    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const updateUserName = (name) => {
        const fireUser = firebase.auth().currentUser;

        fireUser
            .updateProfile({
                displayName: name,
            })
            .then(() => {
                console.log('username updated successfully');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    const handleSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email,
                    photo: photoURL,
                };
                setUser(signedInUser);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    };

    const handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                };
                setUser(signedOutUser);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleBlur = (e) => {
        let isValid = true;
        const re = /\S+@\S+\.\S+/;
        if (e.target.name === 'email') {
            isValid = re.test(e.target.value);
        }

        if (e.target.name === 'password') {
            const isPasswordLengthTure = e.target.value.length >= 8;
            const isPasswordContainsNumber = /\d{1}/.test(e.target.value);
            isValid = isPasswordContainsNumber && isPasswordLengthTure;
        }

        if (isValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    };

    const handleSubmit = (e) => {
        if (newUserExist && user.email && user.password) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    console.log(res);
                    const newUser = { ...user };
                    newUser.success = true;
                    newUser.error = '';
                    setUser(newUser);
                    updateUserName(user.name);
                    console.log(res.user);
                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    setUser(newUser);
                });
        }

        if (!newUserExist && user.email && user.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    console.log(res);
                    const newUser = { ...user };
                    newUser.success = true;
                    newUser.error = '';
                    setUser(newUser);
                    setLoggedUser(newUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    setUser(newUser);
                    console.log(error);
                });
        }

        e.preventDefault();
    };

    const handleFacebookLogin = () => {
        firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="App">
            {user.isSignedIn ? (
                <button type="button" onClick={handleSignOut}>
                    Sign Out
                </button>
            ) : (
                <button type="button" onClick={handleSignIn}>
                    Sign In
                </button>
            )}
            <button type="button" onClick={handleFacebookLogin}>
                Sign up with facebook
            </button>
            {user.isSignedIn ? (
                <div className="user">
                    <h1>Name: {user.name}</h1>
                    <h3>Email ID: {user.email}</h3>
                    <img src={user.photo} alt="" />
                </div>
            ) : (
                <h1>Not logged in</h1>
            )}
            <h2>Name: {user.name}</h2>
            <h2>Email: {user.email}</h2>
            <h2>Password: {user.password}</h2>
            <input
                type="checkbox"
                name="newUser"
                id="newUser"
                onChange={() => setNewUserExist(!newUserExist)}
            />
            <label htmlFor="new-user">Not an user? Register now!</label>
            <form onSubmit={handleSubmit}>
                {newUserExist && (
                    <input type="text" name="name" placeholder="Your name" onBlur={handleBlur} />
                )}
                <br />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onBlur={handleBlur}
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onBlur={handleBlur}
                />
                <br />
                <input type="submit" value={newUserExist ? 'Sign In' : 'Log In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && (
                <p style={{ color: 'green' }}>
                    User {newUserExist ? 'created' : 'logged in'} Successfully
                </p>
            )}
        </div>
    );
};

export default Login;
