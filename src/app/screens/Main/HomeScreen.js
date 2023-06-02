import React, {useEffect, useContext, useState} from 'react'
import { SafeAreaView, View } from 'react-native'
import { globalStyles } from '../../constants/Style'
import Home from '../../components/Home/Home'
import { 
  requestForLocation,
  requestForNotification,
  requestForStorage,
 } from '../../api/Permissions';
import { AuthContext } from '../../api/AuthContentApi';
import { AppContext } from '../../api/AppContentApi';
const HomeScreen = () => {
  const {isAppFirstLaunched} = useContext(AuthContext);
  const {setNotification, setStorage, setLocation} = useContext(AppContext)
  useEffect(() => {
    const requestForPermissions = async () => {
      if(isAppFirstLaunched){
        setNotification(await requestForNotification());
        setLocation(await requestForLocation());
        setStorage(await requestForStorage());
      }
    }
    requestForPermissions();

  },[]);




  return (
    <SafeAreaView style={globalStyles.wrapper}>
        <View style={[globalStyles.wrapper, {paddingBottom:10}]}>
          <Home />
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen