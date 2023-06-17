import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { globalStyles } from '../../constants/Style';
import { colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import Item from './components/Item';

const DonorDetail = ({ route }) => {
  const [donor, setDonor] = useState(route.params.donor);
  return (
    <View style={globalStyles.wrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.imageContainer}>
            {
              donor.image ? <Image source={{ uri: donor.image }} style={styles.image} resizeMode='contain' />
                : <Image source={images.user_default_icon} style={styles.image} resizeMode='contain' />
            }
          </View>
          <Text style={styles.userName}>{donor.name && donor.name}</Text>
          <Text style={styles.userAddress}>{donor.city && donor.country ? `${donor.city}, ${donor.country}` : `${city}, ${country}`}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Item icon="water" title={donor.bloodgroup}/>
        <Item icon="call" title={donor.phone} />
        <Item icon="location" title={donor.address.substr(0, 50).concat('...')} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 200,
    padding: 15,
    elevation: 3,
    marginTop: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: colors.white,
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
  userName: {
    fontFamily: 'Roboto-Regular',
    color: colors.grey_200,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 2,
  },
  userAddress: {
    color: colors.grey_100,
  },

  bodyContainer: {
    paddingVertical: 10,
    marginHorizontal: 20,
  },




})



export default DonorDetail

