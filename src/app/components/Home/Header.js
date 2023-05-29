import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../constants/Colors';
import { images } from '../../constants/Images';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={images.user_default_icon} style={styles.image} resizeMode='contain' />
        </TouchableOpacity>
          <Text style={styles.userName}>Sohaib Ahmed</Text>
          <Text style={styles.userAddress}>Gujranwala, Pakistan</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
    borderWidth: 1,
    borderColor: colors.grey,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontFamily: 'Roboto-Regular',
    color: colors.grey_200,
    fontSize: 20,
    marginTop:5,
    marginBottom:2,
  },
  userAddress:{
    color:colors.grey_100,
  }
})

export default Header;
