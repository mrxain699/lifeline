import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../../constants/Style';
import ImagePicker from 'react-native-image-crop-picker';
import { colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import { AuthContext } from '../../api/AuthContentApi';
import { AppContext } from '../../api/AppContentApi';
import { requestForStorage } from '../../api/Permissions';
const Header = () => {
  const {
    user,
    uploadProfile,
    error,
    setError,
    message,
    setMessage
  } = useContext(AuthContext);
  const { storage, setStorage } = useContext(AppContext);

  const onPressHandler = async () => {
    if (storage === 'granted') {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        mediaType: 'photo'
      }).then(async (image) => {
        await uploadProfile(image.path);
      })
        .catch((error) => {
          console.log("Image Picker error", error);
        });
    }
    else {
      setStorage(await requestForStorage());
    }
  }

  useEffect(() => {
    let interval = null;
    if (message) {
      interval = setTimeout(() => {
        setMessage(null);
      }, 2000)
    }
    return () => {
      clearTimeout(interval);
    }
  }, [message]);

  useEffect(() => {
    let interval = null;
    if (error) {
      interval = setTimeout(() => {
        setError(null);
      }, 3000)
    }
    return () => {
      clearTimeout(interval);
    }
  }, [error]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <TouchableOpacity style={styles.imageContainer} onPress={() => onPressHandler()}>
            {
              user.image ? <Image source={{ uri: user.image }} style={styles.image} resizeMode='contain' />
                : <Image source={images.user_default_icon} style={styles.image} resizeMode='contain' />
            }
          </TouchableOpacity>
          <Text style={styles.userName}>{user.name && user.name}</Text>
          <Text style={styles.userAddress}>Gujranwala, Pakistan</Text>
        </View>
      </View>
      {
        message && <View style={[globalStyles.errorContainer, { backgroundColor: '#b2f6a2' }]}>
          <Text style={[globalStyles.error, { color: '#31ba12' }]}>{message}</Text>
        </View>
      }
      {
        error && <View style={globalStyles.errorContainer}>
          <Text style={globalStyles.error}>{error}</Text>
        </View>
      }
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
  }
})

export default Header;
