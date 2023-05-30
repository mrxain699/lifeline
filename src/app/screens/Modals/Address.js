import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react';
import { globalStyles } from '../../constants/Style';
import Title from './components/Title';
import Button from './components/Button';
import Iconic from '../../components/ui/Icons/Icons';
import { colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
const Address = () => {
  return (
    <View style={[globalStyles.wrapper, {paddingHorizontal:20}]}>
      <Title title="Your Current Address"/>
      <View style={styles.inputContainer}>
        <TextInput
            placeholder='Address'
            placeholderTextColor={colors.grey}
            inlineImagePadding={10}
            cursorColor={colors.black} 
            style={styles.input}
        />
        <TouchableOpacity style={styles.textContainer}>
            <Iconic name="location" size={24} color={colors.red_200}/>
        </TouchableOpacity>
      </View>
      <Button/>
    </View>
  )
}

export default Address

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
        width:'15%',
        // backgroundColor:'#000',
        
    },

    input:{
        width:'100%',
        height:'100%',
        color:colors.black,
        paddingLeft:15,
        alignItems:'center',
        fontSize:16,
        width:'85%',
        // backgroundColor:'#ff0004',
    }
})