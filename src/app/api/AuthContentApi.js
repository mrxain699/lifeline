import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../database/DB';
import { trim } from '../utils/Functions';
const AuthContext = createContext(null);

const AuthContentApi = ({ children }) => {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);


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

    const login = async (email, password) => {
        if(email === null || password === null) {
            setError('Both fields are required');
        }
        else{
            try {
                setIsLoading(true);
                const response = await auth()
                .signInWithEmailAndPassword(trim(email), trim(password));
                if(response){
                    setError(null);
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                if (error.code === 'auth/invalid-email') {
                    setError('Invalid Email Address');
                }
                else{
                    setError('Wrong email or password');
                }
                
            }
        }
       
    }

    const logout = async () => {
        try {
            const response = await auth().signOut();
        } catch (error) {
            if(error){
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
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContentApi, AuthContext }
