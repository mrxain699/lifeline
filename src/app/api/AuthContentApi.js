import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, firestore as db, GoogleSignin } from '../database/DB';
import { trim, validateName, validatePassword } from '../utils/Functions';
import { users } from '../database/Collections';
const AuthContext = createContext(null);

const AuthContentApi = ({ children }) => {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [user, setUser] = useState({});

    const checkIsAppFirstLaunched = async () => {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData == null) {
            setIsAppFirstLaunched(true);
            AsyncStorage.setItem('isAppFirstLaunched', 'false');
        }
        else {
            setIsAppFirstLaunched(false);
        }
    }

    const getCurrentUser = () => {
        users
            .doc(auth().currentUser.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setUser(documentSnapshot.data());
                }
            })
            .catch(err => {
                console.log(err);
            });

    }

    const setCurrentUser = (user, name) => {
        users.doc(user.uid)
            .set({
                name: user.displayName ? user.displayName : name,
                email: user.email,
                phone: '',
                address: '',
                dob: '',
                bloodgroup: '',
                lastbleed: '',
                gender: '',
                image: user.photoURL,
            })
            .then(() => {
                getCurrentUser();
            });
    }

    const sendVerificationMail = (user) => {
        user.sendEmailVerification()
            .then(() => {
                console.log('Email verification email sent');
            })
            .catch((error) => {
                console.log('Email verification error:', error);
            });
    }

    const register = async (name, email, password) => {
        if (name === null || email === null || password === null) {
            setError('All the fields are required.');
        }
        else if (!validateName(name)) {
            setError("Name should contain only letters and white space.");
        }
        else if (!validatePassword(password)) {
            setError("Password Should be minimum 8 characters long.");
        }
        else {
            setIsLoading(true);
            try {
                const response = await auth().createUserWithEmailAndPassword(trim(email), trim(password));
                if (response) {
                    setCurrentUser(response.user, trim(name));
                    getCurrentUser();
                    sendVerificationMail(response.user);
                    setIsLoading(false);
                    setError(null);
                }
            } catch (error) {
                setIsLoading(false);
                if (error.code === 'auth/invalid-email') {
                    setError('Invalid Email Address');
                }
                else if (error.code === 'auth/email-already-in-use') {
                    setError('Email already exists');
                }
                else {
                    setError('Sorry, something went wrong');
                }
            }
        }
    }

    const login = async (email, password) => {
        if (email === null || password === null) {
            setError('Both fields are required');
        }
        else {
            try {
                setIsLoading(true);
                const response = await auth()
                    .signInWithEmailAndPassword(trim(email), trim(password));
                if (response) {
                    setError(null);
                    setIsLoading(false);
                    getCurrentUser();
                }
            } catch (error) {
                setIsLoading(false);
                if (error.code === 'auth/invalid-email') {
                    setError('Invalid Email Address');
                }
                else {
                    setError('Wrong email or password');
                }

            }
        }

    }

    const isUserExist = async (uid) => {
        const documentSnapshot = await users.doc(uid).get();
        return documentSnapshot.exists;
    };

    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const response = await auth().signInWithCredential(googleCredential);
            if (response) {
                const isExist = await isUserExist(response.user.uid);
                if (!isExist) {
                    setCurrentUser(response.user, null);
                    getCurrentUser();
                }
                else {
                    getCurrentUser();
                }

            }
        } catch (error) {
            console.log(error)
        }

    }

    const forgotPassword = async (email) => {
        if (email === null) {
            setError('Email is required');
        }
        else {
            setIsLoading(true);
            auth().sendPasswordResetEmail(email)
                .then(() => {
                    setMessage("Email sent successfully");
                    setError(null);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    if (error.code === 'auth/invalid-email') {
                        setError('Invalid Email Address');
                    }
                    else {
                        setError('Sorry, something went wrong');
                    }
                })
        }


    }

    const logout = async () => {
        try {
            const response = await auth().signOut();
            if (response) {
                setError(null);
            }
        } catch (error) {
            if (error) {
                setError("Sorry, something went wrong");
            }
        }
    }


    const value = {
        isAppFirstLaunched,
        checkIsAppFirstLaunched,
        isLoggedIn,
        setIsLoggedIn,
        error,
        isLoading,
        login,
        logout,
        googleLogin,
        user,
        getCurrentUser,
        register,
        forgotPassword,
        message, 
        setMessage
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContentApi, AuthContext }
