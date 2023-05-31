import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from '../api/AuthContentApi';
import { auth } from '../database/DB';

const Route = () => {
  const {
    checkIsAppFirstLaunched,
    isLoggedIn, 
    setIsLoggedIn,
    getCurrentUser
  } = useContext(AuthContext)

  useEffect(() => {
    checkIsAppFirstLaunched();
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        getCurrentUser();
      }
      else{
        setIsLoggedIn(false);
      }
    });
    return unsubscribe; // unsubscribe on unmount
  }, []);



  return (
    <NavigationContainer>
      {
        !isLoggedIn ? <AuthStack /> : <AppStack />
      }
    </NavigationContainer>
  )
}

export default Route
