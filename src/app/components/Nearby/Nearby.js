import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { AuthContext } from '../../api/AuthContentApi';
import { AppContext } from '../../api/AppContentApi';
import { colors } from '../../constants/Colors';
import Iconic from '../ui/Icons/Icons';
const { width, height } = Dimensions.get('window');


const Nearby = () => {

    const { user } = useContext(AuthContext)
    const {
        userCurrentLocation,
        getAvailableDonor,
        availableDonors
    } = useContext(AppContext);
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;

    useEffect(() => {
        const getDonors = async () => {
            await getAvailableDonor();
        }
        setInterval(() => { getDonors() }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation
                region={{
                    latitude: userCurrentLocation.latitude,
                    longitude: userCurrentLocation.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
                }}
            >

                <Marker
                    coordinate={{
                        latitude: userCurrentLocation.latitude,
                        longitude: userCurrentLocation.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                    }}
                    pinColor='#0000cc'
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



                {
                    availableDonors && availableDonors.map((donor, i) => {

                        if ((donor.location.latitude && donor.location.longitude) && (donor.email != user.email)) {
                            return (
                                <Marker
                                    coordinate={{
                                        latitude: donor.location.latitude,
                                        longitude: donor.location.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                                    }}
                                    pinColor='#ff0004'
                                    key={i * i}
                                >
                                    <Callout tooltip>
                                        <View>
                                            <View style={styles.callOutView}>
                                                <View style={styles.calloutItemContainer}>
                                                    <Iconic name="person" size={18} color={colors.red} />
                                                    <Text style={styles.text}>{donor.name}</Text>
                                                </View>
                                                <View style={styles.calloutItemContainer}>
                                                    <Iconic name="call" size={18} color={colors.red} />
                                                    <Text style={styles.text}>{donor.phone}</Text>
                                                </View>
                                                <View style={styles.calloutItemContainer}>
                                                    <Iconic name="water" size={18} color={colors.red} />
                                                    <Text style={styles.text}>{donor.bloodgroup}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Callout>
                                </Marker>
                            );
                        }


                    })
                }
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
});

export default Nearby

