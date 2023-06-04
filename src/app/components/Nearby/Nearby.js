import React, { useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { AuthContext } from '../../api/AuthContentApi';
const { width, height } = Dimensions.get('window');


const Nearby = () => {

    const { user } = useContext(AuthContext)
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation
                region={{
                    latitude: user.location.latitude ? user.location.latitude : 30.3753,
                    longitude:  user.location.longitude ? user.location.longitude :69.3451,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: user.location.latitude ? user.location.latitude : 30.3753,
                        longitude: user.location.longitude ? user.location.longitude :69.3451,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                    }}
                    title="My Location"
                    description="i am here now"
                    pinColor='#0000cc'
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    map: {
        width: width,
        height: '100%'
    },
});

export default Nearby

