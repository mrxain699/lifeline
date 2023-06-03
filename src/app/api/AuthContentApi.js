import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, firestore as db, GoogleSignin, storage } from '../database/DB';
import { trim, validateName, validatePassword, validatePhoneNumber } from '../utils/Functions';
import { users } from '../database/Collections';
const AuthContext = createContext(null);

const AuthContentApi = ({ children }) => {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [user, setUser] = useState({});
    const [currentUserId, setCurrentUserId] = useState('');

    const checkIsAppFirstLaunched = async () => {
        const value = await AsyncStorage.getItem('isAppFirstLaunched');
        if (value === null) {
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
                    setCurrentUserId(auth().currentUser.uid);
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
                image: user.photoURL ? user.photoURL : '',
            })
            .then(() => {
                getCurrentUser();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const sendVerificationMail = (user) => {
        user.sendEmailVerification()
            .then(() => {
                auth().signOut();
                console.log('Email sent successfully');
            })
            .catch((error) => {
                console.log('Email verification error:', error)
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
                    sendVerificationMail(response.user);
                    setError(null);
                    setIsLoading(false);

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
                const response = await auth().signInWithEmailAndPassword(trim(email), trim(password));
                if (response) {
                    if (!response.user.emailVerified) {
                        setError('Email not verified. Verify your email and login again');
                        auth().signOut();
                    }
                    else {
                        setError(null);
                        getCurrentUser();
                    }
                    setIsLoading(false);

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

    const updateProfile = (message, field, value) => {
        if (field === null && value === null) {
            setError('The field is required')
        }
        else if (field === "phone" && !validatePhoneNumber(value)) {
            setError('Invalid Phone Number');
        }
        else {
            setIsLoading(true);
            const updateObject = {};
            updateObject[field] = value;
            users.doc(currentUserId)
                .update(updateObject)
                .then(() => {
                    setIsLoading(false);
                    setError(null);
                    setMessage(`${message} updated successfully`);
                    getCurrentUser();
                })
                .catch(() => {
                    setIsLoading(false);
                    setError('Sorry, something is went wrong');
                });
        }



    }

    const checkImageExists = async (imageName) => {
        try {
            const reference = storage().ref('images/profiles/' + imageName);
            const metadata = await reference.getMetadata();
            return true;
        } catch (error) {
            if (error.code === 'storage/object-not-found') {
                return false;
            } else {
                console.log('Error checking image existence:', error);
            }
        }
    };

    const uploadProfile = async (imagePath) => {
        const isExist = await checkImageExists(currentUserId);
        if (isExist) {
            const reference = storage().ref('images/profiles/' + currentUserId);
            await reference.delete();
        }
        const reference = storage().ref('images/profiles/' + currentUserId);
        reference.putFile(imagePath)
            .then(async () => {
                const url = await storage().ref('images/profiles/' + currentUserId).getDownloadURL();
                if(url){
                    users.doc(currentUserId).update({
                        image:url,
                    })
                    .then(()=>{
                        getCurrentUser();
                        setMessage('Image uploaded successfully');
                    })
                    .catch((error)=>{
                        setError("Sorry, something went wrong");
                    })
                }
            })
            .catch((error) => {
                setError("Sorry, something went wrong");
            });

    }




    const value = {
        isAppFirstLaunched,
        checkIsAppFirstLaunched,
        isLoggedIn,
        setIsLoggedIn,
        error,
        setError,
        isLoading,
        login,
        logout,
        googleLogin,
        user,
        getCurrentUser,
        register,
        forgotPassword,
        message,
        setMessage,
        updateProfile,
        uploadProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContentApi, AuthContext }
