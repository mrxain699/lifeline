import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../constants/Style'
import Nearby from '../../components/Nearby/Nearby'
import { AppContext } from '../../api/AppContentApi'
import {
  requestForLocationPermission,
  checkLocationPermission,
  requestForeEableGPS
} from '../../api/PermissionsApi';

const NearbyScreen = () => {

  const { getUserCurrentLocation } = useContext(AppContext);

  useEffect(() => {
    const checkPermission = async () => {
      const permission = await checkLocationPermission();
      if (permission === "granted") {
        const result = await requestForeEableGPS();
        if (result) {
          getUserCurrentLocation();
        }
      }
      else {
        const result = await requestForLocationPermission();
        if(result === "granted"){
          const result = await requestForeEableGPS();
          if (result) {
            getUserCurrentLocation();
          }
        }
      }
    }
    checkPermission();
  }, []);

  return (
    <View style={globalStyles.wrapper}>
      <Nearby />
    </View>
  )
}

export default NearbyScreen
