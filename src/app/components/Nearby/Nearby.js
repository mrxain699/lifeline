import React, { useContext  } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { AppContext } from '../../api/AppContentApi';
const { width, height } = Dimensions.get('window');


const Nearby = () => {
    const {userCurrentLocation} = useContext(AppContext)
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                showsUserLocation
                region={{
                    latitude: userCurrentLocation.latitude,
                    longitude: userCurrentLocation.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#000'
    },
    map: {
        width:width,
        height:'100%'
    },
});

export default Nearby

