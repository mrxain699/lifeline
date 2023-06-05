import React, { useEffect, useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import { globalStyles } from '../../constants/Style';
import Home from '../../components/Home/Home';
import { AuthContext } from '../../api/AuthContentApi';
import { AppContext } from '../../api/AppContentApi';
import {
  requestForLocationPermission,
  requestForNotificationPermission,
  requestForStoragePermission,
  requestForeEableGPS,
  checkLocationPermission
} from '../../api/PermissionsApi';



const HomeScreen = () => {

  const { isAppFirstLaunched } = useContext(AuthContext);
  const {getUserCurrentLocation} = useContext(AppContext);

  useEffect(() => {
    const requestForPermissions = async () => {
      if (isAppFirstLaunched) {
        await requestForLocationPermission();
        await requestForStoragePermission();
        await requestForNotificationPermission();
        const result = await requestForeEableGPS();
        if(result){
          await getUserCurrentLocation();
        }
      }
      else{
        const permission = await checkLocationPermission();
        if(permission === "granted"){
          const result = await requestForeEableGPS();
          if(result){
            await getUserCurrentLocation();
          }
        }
      }
    }
    requestForPermissions();
  }, []);


  return (
    <SafeAreaView style={globalStyles.wrapper}>
      <View style={[globalStyles.wrapper, { paddingBottom: 10 }]}>
        <Home />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen