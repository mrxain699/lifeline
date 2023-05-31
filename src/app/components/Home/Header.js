import React, {useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import { AuthContext } from '../../api/AuthContentApi';
const Header = () => {
  const {user} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <TouchableOpacity style={styles.imageContainer}>
        {
          user.image ? <Image source={{uri:user.image}} style={styles.image} resizeMode='contain' />
          :<Image source={images.user_default_icon} style={styles.image} resizeMode='contain' />
        }
        
          
        </TouchableOpacity>
          <Text style={styles.userName}>{user.name && user.name}</Text>
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
    overflow:'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:100
  },
  userName: {
    fontFamily: 'Roboto-Regular',
    color: colors.grey_200,
    fontSize: 20,
    marginTop:10,
    marginBottom:2,
  },
  userAddress:{
    color:colors.grey_100,
  }
})

export default Header;
