import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, firestore as db, GoogleSignin } from '../database/DB';
import { trim } from '../utils/Functions';
import { users } from '../database/Collections';
const AuthContext = createContext(null);

const AuthContentApi = ({ children }) => {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [error, setError] = useState(null);
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

    const getCurrentUser =  () => {
        users
        .doc(auth().currentUser.uid)
        .get()
        .then((documentSnapshot)=>{
            if(documentSnapshot.exists){
                setUser(documentSnapshot.data());
            }
        })
        .catch(err => {
            console.log(err);
        });

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
                const isExist  = await isUserExist(response.user.uid);
                if (!isExist) {
                    users.doc(response.user.uid)
                        .set({
                            name: response.user.displayName,
                            email: response.user.email,
                            phone: '',
                            address: '',
                            dob: '',
                            bloodgroup: '',
                            lastbleed: '',
                            gender:'',
                            image:response.user.photoURL
                        })
                        .then(() => {
                            getCurrentUser();
                        });
                }
                else{
                    getCurrentUser();
                }

            }
        } catch (error) {
            console.log(error)
        }

    }

    const logout = async () => {
        try {
            const response = await auth().signOut();
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
        getCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContentApi, AuthContext }
