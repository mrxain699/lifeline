import { StyleSheet, TextInput, View, Text } from 'react-native'
import React from 'react';
import { globalStyles } from '../../constants/Style';
import Title from './components/Title';
import Button from './components/Button';
import { colors } from '../../constants/Colors';


const PhoneNumber = () => {
  return (
    <View style={[globalStyles.wrapper, {paddingHorizontal:20}]}>
      <Title title="Your Phone Number"/>
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.defaultText}>+92</Text>
        </View>
        <View style={styles.verticalDivider}></View>
        <TextInput
            inputMode='numeric'
            placeholder='03123456789'
            placeholderTextColor={colors.grey}
            maxLength={11}
            cursorColor={colors.black} 
            style={styles.input}
        />
      </View>
      <Button/>
    </View>
  )
}

export default PhoneNumber

const styles = StyleSheet.create({
    inputContainer:{
        marginTop:10,
        backgroundColor:colors.white,
        height:50,
        elevation:3,
        borderRadius:15,
        flexDirection:'row',

    },
    textContainer:{
        height:'100%',
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal:10,
    },
    defaultText:{
        color:colors.grey_100,
        fontSize:18,
        fontFamily:'Kalam-Regular'

    },
    verticalDivider:{
        height:'50%',
        width:.5,
        marginTop:12,
        backgroundColor:colors.grey
    },
    input:{
        width:'100%',
        height:'100%',
        color:colors.black,
        paddingHorizontal:10,
        alignItems:'center',
        fontSize:18,
    }
})