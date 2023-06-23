import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { AuthContext } from '../../api/AuthContentApi';
import { AppContext } from '../../api/AppContentApi';
import { colors } from '../../constants/Colors';
import Iconic from '../ui/Icons/Icons';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../constants/Images';
const { width, height } = Dimensions.get('window');


const Nearby = ({location}) => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext)
    const {
        getAvailableDonor,
        availableDonors,
        getRequesters,
        getUrgentRequesters,
        urgentRequesters,
        requesters,
    } = useContext(AppContext);
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;

    useEffect(() => {
        const getDonors = async () => {
            await getAvailableDonor();
        }
        const interval = setInterval(() => { getDonors() }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        const getPatients = async () => {
            await getRequesters();
            await getUrgentRequesters();
        }
        const interval = setInterval(() => { getPatients() }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);


    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
                }}
            >
                {
    
                location != null && 
                (
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
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



                {
                    urgentRequesters && urgentRequesters.map((requester, i) => {

                        if (requester.sender_location.latitude != "") {
                            return (
                                <Marker
                                    coordinate={{
                                        latitude: requester.sender_location.latitude,
                                        longitude: requester.sender_location.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                                    }}
                                    icon={images.wave_icon}
                                    key={i * i}
                                    onPress={()=>{
                                        navigation.navigate('RequesterDetail', {requester});
                                    }}
                                />
                                 
                            );
                        }


                    })
                }

                {
                    requesters && requesters.map((requester, i) => {

                        if (requester.sender_location.latitude != "") {
                            return (
                                <Marker
                                    coordinate={{
                                        latitude: requester.sender_location.latitude,
                                        longitude: requester.sender_location.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                                    }}
                                    pinColor={colors.red}
                                    key={i * i}
                                    onPress={()=>{
                                        navigation.navigate('RequesterDetail', {requester});
                                    }}
                                />
                                 
                            );
                        }


                    })
                }

                {
                    availableDonors && availableDonors.map((donor, i) => {

                        if (donor.email != user.email && donor.location.latitude != "") {
                            return (
                                <Marker
                                    coordinate={{
                                        latitude: donor.location.latitude,
                                        longitude: donor.location.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                                    }}
                                    pinColor={colors.green}
                                    key={i * i}
                                    onPress={()=>{
                                        navigation.navigate('DonorDetail', {donor});
                                    }}
                                />
                                 
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

