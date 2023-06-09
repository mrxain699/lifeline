import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { globalStyles } from '../../constants/Style';
import Title from './components/Title';
import Button from './components/Button';
import { colors } from '../../constants/Colors';
import { AuthContext } from '../../api/AuthContentApi'
import { AppContext } from '../../api/AppContentApi';


const Address = ({ navigation }) => {

  const {
    error,
    message,
    setMessage,
    setError,
    user
  } = useContext(AuthContext);
  const {getGeometryAddress, formattedAddress} = useContext(AppContext);
  const [address, setAddress] = useState(user.address  ? user.address : formattedAddress ? formattedAddress : null);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
        navigation.goBack();
      }, 3000)
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000)
    }
  }, [error]);


  const onPressHandler  = async () => {
    await getGeometryAddress(address);
  }

  return (
    <View style={[globalStyles.wrapper, { paddingHorizontal: 20 }]}>
      <Title title="Your Current Address" />
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
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Address'
          placeholderTextColor={colors.grey}
          value={address}
          onChangeText={(text) => setAddress(text)}
          cursorColor={colors.black}
          style={styles.input}
        />

      </View>
      <Button onPress={() => onPressHandler()} />
    </View>
  )
}

export default Address

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    backgroundColor: colors.white,
    height: 50,
    elevation: 3,
    borderRadius: 15,
    flexDirection: 'row',

  },


  input: {
    width: '100%',
    height: '100%',
    color: colors.black,
    paddingLeft: 15,
    alignItems: 'center',
    fontSize: 16,
  }
})