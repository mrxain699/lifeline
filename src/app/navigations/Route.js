import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from '../api/AuthContentApi';
import { auth } from '../database/DB';

const Route = () => {
  const {
    isLoggedIn, 
    setIsLoggedIn,
    getCurrentUser,
  } = useContext(AuthContext)


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
    return unsubscribe;
  }, []);



  return (
    <NavigationContainer>
      {
        !isLoggedIn ? <AuthStack /> :  <AppStack />
      }
    </NavigationContainer>
  )
}

export default Route
