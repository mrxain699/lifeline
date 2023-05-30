import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack'; 
const Route = () => {
   return (
     <NavigationContainer>
        {
          //<AuthStack/>
          <AppStack/>
        }
     </NavigationContainer>
   )
 }
 
 export default Route
 