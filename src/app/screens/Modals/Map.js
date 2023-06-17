import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../api/AppContentApi';
import { AuthContext } from '../../api/AuthContentApi';
import Iconic from '../../components/ui/Icons/Icons';
const { width, height } = Dimensions.get('window');

const Map = () => {
    const navigation = useNavigation();
    const {
        userCurrentLocation,
        getFormattedAddress,
    } = useContext(AppContext);
    const { user } = useContext(AuthContext);
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: user.location.latitude != "" ? user.location.latitude : userCurrentLocation.latitude,
                    longitude: user.location.longitude != "" ? user.location.longitude : userCurrentLocation.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
                }}
                onPress={
                    (event) => {
                        getFormattedAddress(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude);
                        navigation.goBack();
                    }
                }
            >
                {

                    (
                        <Marker
                            coordinate={{
                                latitude: user.location.latitude != "" ? user.location.latitude : userCurrentLocation.latitude,
                                longitude: user.location.longitude != "" ? user.location.longitude : userCurrentLocation.longitude,
                            }}
                            pinColor={colors.blue}
                        >
                            <Callout tooltip>
                                <View>
                                    <View style={styles.callOutView}>
                                        <View style={styles.calloutItemContainer}>
                                            <Iconic name="person" size={18} color={colors.red} />
                                            <Text style={styles.text}>{user.name}</Text>
                                        </View>
                                        <View style={styles.calloutItemContainer}>
                                            <Iconic name="call" size={18} color={colors.red} />
                                            <Text style={styles.text}>{user.phone}</Text>
                                        </View>
                                        <View style={styles.calloutItemContainer}>
                                            <Iconic name="water" size={18} color={colors.red} />
                                            <Text style={styles.text}>{user.bloodgroup}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    )
                }
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: width,
        height: '100%'
    },
    callOutView: {
        elevation: 2,
        borderRadius: 15,
        color: colors.black,
        position: 'relative',
        marginBottom: 10,
        backgroundColor: colors.white,
        padding: 10,
    },

    calloutItemContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    text: {
        color: colors.black,
        marginLeft: 10,
    }
})
export default Map

