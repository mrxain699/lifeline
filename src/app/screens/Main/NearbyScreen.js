import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../constants/Style'
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Nearby from '../../components/Nearby/Nearby'
import { AppContext } from '../../api/AppContentApi'
import { requestForLocation } from '../../api/Permissions';
const NearbyScreen = () => {
  const {
    location, 
    isGPSEnabled, 
    setIsGPSEnabled, 
    setLocation,
    getUserCurrentLocation} = useContext(AppContext);
    const [config, setConfig] = useState({
      authorizationLevel:'auto',
      locationProvider: 'android'
    })

  Geolocation.setRNConfiguration(config);

  const enableGPS = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        setIsGPSEnabled(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(()=>{
    const locationPermissionAccess = async () => {
      if(location === "granted"){
        enableGPS();
        if(isGPSEnabled){
          await getUserCurrentLocation();
        }
      }
      else{
        setLocation(await requestForLocation());
      }
    }
    locationPermissionAccess();
  },[location, isGPSEnabled]);

  return (
    <View style={globalStyles.wrapper}>
      <Nearby />
    </View>
  )
}

export default NearbyScreen
